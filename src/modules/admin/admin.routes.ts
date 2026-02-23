import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { Role, AccountStatus } from '@prisma/client';
import { prisma } from '../../config/database';
import { authenticate, authorize } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import { sendSuccess, buildPaginationMeta, parsePagination } from '../../utils/response.utils';
import { AppError } from '../../utils/AppError';
import { AppErrorCode, AuthenticatedRequest } from '../../types';
import { logger } from '../../config/logger';

// ─── Schemas ──────────────────────────────────────────────────
const updateUserStatusSchema = z.object({
  status: z.nativeEnum(AccountStatus),
  reason: z.string().min(1).max(500).optional(),
});

const updateUserRoleSchema = z.object({
  role: z.enum([Role.ADMIN, Role.CUSTOMER]),
  reason: z.string().min(1).max(500).optional(),
});

const listUsersSchema = z.object({
  page: z.string().optional().transform(Number).pipe(z.number().min(1).default(1)),
  limit: z.string().optional().transform(Number).pipe(z.number().min(1).max(100).default(20)),
  role: z.nativeEnum(Role).optional(),
  status: z.nativeEnum(AccountStatus).optional(),
  search: z.string().optional(),
  sortBy: z.enum(['createdAt', 'email', 'firstName', 'lastLoginAt']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// ─────────────────────────────────────────────────────────────
// Admin Router
// ─────────────────────────────────────────────────────────────
const router = Router();

// All admin routes require auth + ADMIN or SUPER_ADMIN role
router.use(authenticate, authorize(Role.ADMIN, Role.SUPER_ADMIN));

// ─────────────────────────────────────────────────────────────
// PLATFORM STATISTICS
// ─────────────────────────────────────────────────────────────

/**
 * @openapi
 * /admin/stats:
 *   get:
 *     summary: Get platform statistics
 *     description: Real-time platform metrics and growth data
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Platform statistics
 */
router.get('/stats', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOf30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const startOf7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Run all queries in parallel
    const [
      totalUsers,
      totalCustomers,
      totalAdmins,
      activeUsers,
      suspendedUsers,
      pendingVerification,
      newUsersToday,
      newUsersLast7Days,
      newUsersLast30Days,
      usersWithTwoFactor,
      recentLogins,
      totalSalons,
      activeSalons,
      recentAuditEvents,
    ] = await Promise.all([
      prisma.user.count({ where: { deletedAt: null } }),
      prisma.user.count({ where: { role: Role.CUSTOMER, deletedAt: null } }),
      prisma.user.count({ where: { role: Role.ADMIN, deletedAt: null } }),
      prisma.user.count({ where: { status: AccountStatus.ACTIVE, deletedAt: null } }),
      prisma.user.count({ where: { status: AccountStatus.SUSPENDED, deletedAt: null } }),
      prisma.user.count({ where: { status: AccountStatus.PENDING_VERIFICATION, deletedAt: null } }),
      prisma.user.count({ where: { createdAt: { gte: startOfToday }, deletedAt: null } }),
      prisma.user.count({ where: { createdAt: { gte: startOf7Days }, deletedAt: null } }),
      prisma.user.count({ where: { createdAt: { gte: startOf30Days }, deletedAt: null } }),
      prisma.user.count({ where: { twoFactorEnabled: true, deletedAt: null } }),
      prisma.user.count({
        where: { lastLoginAt: { gte: startOf7Days }, deletedAt: null },
      }),
      prisma.salon.count({ where: { deletedAt: null } }),
      prisma.salon.count({ where: { status: AccountStatus.ACTIVE, deletedAt: null } }),
      prisma.auditLog.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          action: true,
          success: true,
          ipAddress: true,
          createdAt: true,
          user: { select: { email: true, firstName: true, lastName: true } },
        },
      }),
    ]);

    sendSuccess(res, {
      users: {
        total: totalUsers,
        byRole: { customers: totalCustomers, admins: totalAdmins },
        byStatus: {
          active: activeUsers,
          suspended: suspendedUsers,
          pendingVerification,
        },
        growth: {
          today: newUsersToday,
          last7Days: newUsersLast7Days,
          last30Days: newUsersLast30Days,
        },
        security: {
          twoFactorEnabled: usersWithTwoFactor,
          twoFactorAdoptionRate:
            totalUsers > 0
              ? `${((usersWithTwoFactor / totalUsers) * 100).toFixed(1)}%`
              : '0%',
          activeLastWeek: recentLogins,
        },
      },
      salons: {
        total: totalSalons,
        active: activeSalons,
      },
      recentActivity: recentAuditEvents,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
});

// ─────────────────────────────────────────────────────────────
// USER MANAGEMENT
// ─────────────────────────────────────────────────────────────

/**
 * @openapi
 * /admin/users:
 *   get:
 *     summary: List all users with filters and search
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20, maximum: 100 }
 *       - in: query
 *         name: role
 *         schema: { type: string, enum: [SUPER_ADMIN, ADMIN, STAFF, CUSTOMER] }
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [ACTIVE, INACTIVE, SUSPENDED, PENDING_VERIFICATION] }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *         description: Search by name or email
 *       - in: query
 *         name: sortBy
 *         schema: { type: string, enum: [createdAt, email, firstName, lastLoginAt] }
 *       - in: query
 *         name: sortOrder
 *         schema: { type: string, enum: [asc, desc] }
 */
router.get(
  '/users',
  validate(listUsersSchema, 'query'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit, role, status, search, sortBy, sortOrder } = req.query as unknown as z.infer<typeof listUsersSchema>;
      const { skip } = parsePagination(req.query as Record<string, unknown>);

      const where = {
        deletedAt: null,
        ...(role && { role }),
        ...(status && { status }),
        ...(search && {
          OR: [
            { email: { contains: search as string, mode: 'insensitive' as const } },
            { firstName: { contains: search as string, mode: 'insensitive' as const } },
            { lastName: { contains: search as string, mode: 'insensitive' as const } },
            { phone: { contains: search as string } },
          ],
        }),
      };

      const [users, total] = await Promise.all([
        prisma.user.findMany({
          where,
          skip,
          take: Number(limit),
          orderBy: { [sortBy as string]: sortOrder },
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            role: true,
            status: true,
            emailVerified: true,
            twoFactorEnabled: true,
            lastLoginAt: true,
            failedLoginAttempts: true,
            lockedUntil: true,
            createdAt: true,
            _count: { select: { auditLogs: true } },
          },
        }),
        prisma.user.count({ where }),
      ]);

      sendSuccess(
        res,
        { users },
        'Users retrieved',
        200,
        buildPaginationMeta(total, Number(page), Number(limit)),
      );
    } catch (error) {
      next(error);
    }
  },
);

/**
 * @openapi
 * /admin/users/{userId}:
 *   get:
 *     summary: Get detailed user profile
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 */
router.get('/users/:userId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: userId, deletedAt: null },
      include: {
        customerProfile: true,
        adminProfile: true,
        sessions: {
          where: { isActive: true, expiresAt: { gte: new Date() } },
          select: {
            id: true,
            deviceName: true,
            ipAddress: true,
            lastActiveAt: true,
            expiresAt: true,
          },
          orderBy: { lastActiveAt: 'desc' },
          take: 10,
        },
        auditLogs: {
          orderBy: { createdAt: 'desc' },
          take: 20,
          select: {
            id: true,
            action: true,
            success: true,
            ipAddress: true,
            createdAt: true,
          },
        },
        _count: {
          select: { sessions: true, auditLogs: true, tokens: true },
        },
      },
    });

    if (!user) throw AppError.notFound('User not found', AppErrorCode.USER_NOT_FOUND);

    // Remove sensitive fields
    const { passwordHash, twoFactorSecret, ...safeUser } = user;
    void passwordHash; void twoFactorSecret; // consumed

    sendSuccess(res, { user: safeUser });
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /admin/users/{userId}/status:
 *   patch:
 *     summary: Update user account status (suspend, activate, etc.)
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 */
router.patch(
  '/users/:userId/status',
  validate(updateUserStatusSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const { status, reason } = req.body;
      const admin = (req as AuthenticatedRequest).user;

      // Prevent admins from modifying super admins
      const targetUser = await prisma.user.findUnique({
        where: { id: userId },
        select: { role: true, status: true },
      });

      if (!targetUser) throw AppError.notFound('User not found', AppErrorCode.USER_NOT_FOUND);

      if (
        targetUser.role === Role.SUPER_ADMIN &&
        admin.role !== Role.SUPER_ADMIN
      ) {
        throw AppError.forbidden('Cannot modify a Super Admin account');
      }

      await prisma.user.update({
        where: { id: userId },
        data: { status },
      });

      // Log admin action
      await prisma.auditLog.create({
        data: {
          userId: admin.id,
          action: 'ADMIN_USER_STATUS_CHANGE',
          resource: 'user',
          resourceId: userId,
          details: { previousStatus: targetUser.status, newStatus: status, reason },
          success: true,
        },
      });

      logger.info('Admin changed user status', {
        adminId: admin.id,
        targetUserId: userId,
        newStatus: status,
      });

      sendSuccess(res, { userId, status }, `User status updated to ${status}`);
    } catch (error) {
      next(error);
    }
  },
);

/**
 * @openapi
 * /admin/users/{userId}/role:
 *   patch:
 *     summary: Change user role
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 */
router.patch(
  '/users/:userId/role',
  authorize(Role.SUPER_ADMIN), // Only super admin can change roles
  validate(updateUserRoleSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const { role, reason } = req.body;
      const admin = (req as AuthenticatedRequest).user;

      const targetUser = await prisma.user.findUnique({
        where: { id: userId, deletedAt: null },
        select: { role: true },
      });

      if (!targetUser) throw AppError.notFound('User not found', AppErrorCode.USER_NOT_FOUND);

      await prisma.user.update({
        where: { id: userId },
        data: { role },
      });

      await prisma.auditLog.create({
        data: {
          userId: admin.id,
          action: 'ADMIN_USER_ROLE_CHANGE',
          resource: 'user',
          resourceId: userId,
          details: { previousRole: targetUser.role, newRole: role, reason },
          success: true,
        },
      });

      sendSuccess(res, { userId, role }, `User role updated to ${role}`);
    } catch (error) {
      next(error);
    }
  },
);

/**
 * @openapi
 * /admin/users/{userId}/unlock:
 *   post:
 *     summary: Unlock a locked user account
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 */
router.post('/users/:userId/unlock', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const admin = (req as AuthenticatedRequest).user;

    await prisma.user.update({
      where: { id: userId },
      data: { lockedUntil: null, failedLoginAttempts: 0 },
    });

    await prisma.auditLog.create({
      data: {
        userId: admin.id,
        action: 'ADMIN_USER_UNLOCKED',
        resource: 'user',
        resourceId: userId,
        success: true,
      },
    });

    sendSuccess(res, { userId }, 'Account unlocked successfully');
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /admin/users/{userId}/sessions:
 *   delete:
 *     summary: Force-revoke all sessions for a user
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 */
router.delete('/users/:userId/sessions', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const admin = (req as AuthenticatedRequest).user;

    const { count } = await prisma.session.updateMany({
      where: { userId, isActive: true },
      data: { isActive: false },
    });

    await prisma.token.updateMany({
      where: { userId, type: 'REFRESH', revoked: false },
      data: { revoked: true, revokedAt: new Date() },
    });

    await prisma.auditLog.create({
      data: {
        userId: admin.id,
        action: 'ADMIN_FORCE_LOGOUT',
        resource: 'user',
        resourceId: userId,
        details: { sessionsRevoked: count },
        success: true,
      },
    });

    sendSuccess(res, { sessionsRevoked: count }, `Revoked ${count} active sessions`);
  } catch (error) {
    next(error);
  }
});

// ─────────────────────────────────────────────────────────────
// AUDIT LOGS
// ─────────────────────────────────────────────────────────────

/**
 * @openapi
 * /admin/audit-logs:
 *   get:
 *     summary: View platform audit logs
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 */
router.get('/audit-logs', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { skip, page, limit } = parsePagination(req.query as Record<string, unknown>);
    const { userId, action, success, from, to } = req.query;

    const where = {
      ...(userId && { userId: userId as string }),
      ...(action && { action: { contains: action as string, mode: 'insensitive' as const } }),
      ...(success !== undefined && { success: success === 'true' }),
      ...((from || to) && {
        createdAt: {
          ...(from && { gte: new Date(from as string) }),
          ...(to && { lte: new Date(to as string) }),
        },
      }),
    };

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { email: true, firstName: true, lastName: true, role: true } },
        },
      }),
      prisma.auditLog.count({ where }),
    ]);

    sendSuccess(res, { logs }, 'Audit logs retrieved', 200, buildPaginationMeta(total, page, limit));
  } catch (error) {
    next(error);
  }
});

export { router as adminRouter };
