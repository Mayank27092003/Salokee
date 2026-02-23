import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { Gender } from '@prisma/client';
import { prisma } from '../../config/database';
import { authenticate } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import { sendSuccess, sendNoContent } from '../../utils/response.utils';
import { AppError } from '../../utils/AppError';
import { AppErrorCode, AuthenticatedRequest } from '../../types';

// ─── Validation schemas ──────────────────────────────────────
const updateProfileSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-zA-Z\s'-]+$/)
    .optional(),
  lastName: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-zA-Z\s'-]+$/)
    .optional(),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-()]{7,20}$/)
    .optional()
    .nullable(),
  gender: z.nativeEnum(Gender).optional().nullable(),
  dateOfBirth: z
    .string()
    .datetime()
    .optional()
    .nullable()
    .transform((v) => (v ? new Date(v) : null)),
  avatarUrl: z.string().url().optional().nullable(),
});

// ─── Router ──────────────────────────────────────────────────
const router = Router();

// All user routes require authentication
router.use(authenticate);

/**
 * @route   GET /api/v1/users/profile
 * @desc    Get own profile
 */
router.get('/profile', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = (req as AuthenticatedRequest).user;

    const user = await prisma.user.findUnique({
      where: { id, deletedAt: null },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        status: true,
        avatarUrl: true,
        gender: true,
        dateOfBirth: true,
        emailVerified: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
        customerProfile: {
          select: {
            loyaltyPoints: true,
            totalBookings: true,
            totalSpent: true,
            preferences: true,
          },
        },
        adminProfile: {
          select: { department: true, bio: true, salonId: true },
        },
      },
    });

    if (!user) throw AppError.notFound('User not found', AppErrorCode.USER_NOT_FOUND);

    sendSuccess(res, { user });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   PATCH /api/v1/users/profile
 * @desc    Update own profile
 */
router.patch(
  '/profile',
  validate(updateProfileSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = (req as AuthenticatedRequest).user;
      const data = req.body;

      // Check phone uniqueness if changing
      if (data.phone) {
        const existing = await prisma.user.findFirst({
          where: { phone: data.phone, id: { not: id }, deletedAt: null },
          select: { id: true },
        });
        if (existing) {
          throw AppError.conflict(
            'Phone number already in use',
            AppErrorCode.PHONE_ALREADY_TAKEN,
          );
        }
      }

      const updated = await prisma.user.update({
        where: { id },
        data: {
          ...(data.firstName && { firstName: data.firstName }),
          ...(data.lastName && { lastName: data.lastName }),
          ...(data.phone !== undefined && { phone: data.phone }),
          ...(data.gender !== undefined && { gender: data.gender }),
          ...(data.dateOfBirth !== undefined && { dateOfBirth: data.dateOfBirth }),
          ...(data.avatarUrl !== undefined && { avatarUrl: data.avatarUrl }),
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          role: true,
          avatarUrl: true,
          gender: true,
          dateOfBirth: true,
          updatedAt: true,
        },
      });

      sendSuccess(res, { user: updated }, 'Profile updated successfully');
    } catch (error) {
      next(error);
    }
  },
);

/**
 * @route   DELETE /api/v1/users/account
 * @desc    Soft-delete own account
 */
router.delete('/account', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = (req as AuthenticatedRequest).user;

    await prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    sendNoContent(res);
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/v1/users/sessions
 * @desc    Get active sessions
 */
router.get('/sessions', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = (req as AuthenticatedRequest).user;

    const sessions = await prisma.session.findMany({
      where: { userId: id, isActive: true, expiresAt: { gte: new Date() } },
      select: {
        id: true,
        deviceName: true,
        deviceType: true,
        browser: true,
        os: true,
        ipAddress: true,
        lastActiveAt: true,
        createdAt: true,
        expiresAt: true,
      },
      orderBy: { lastActiveAt: 'desc' },
    });

    sendSuccess(res, { sessions, count: sessions.length });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   DELETE /api/v1/users/sessions/:sessionId
 * @desc    Revoke a specific session
 */
router.delete('/sessions/:sessionId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = (req as AuthenticatedRequest).user;
    const { sessionId } = req.params;

    const session = await prisma.session.findFirst({
      where: { id: sessionId, userId: id },
    });

    if (!session) throw AppError.notFound('Session not found');

    await prisma.session.update({
      where: { id: sessionId },
      data: { isActive: false },
    });

    sendNoContent(res);
  } catch (error) {
    next(error);
  }
});

export { router as userRouter };
