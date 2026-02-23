import { Router, Request, Response, NextFunction } from 'express';
import { authenticator } from 'otplib';
import QRCode from 'qrcode';
import { z } from 'zod';
import { prisma } from '../../config/database';
import { env } from '../../config/env';
import { authenticate } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import { sendSuccess } from '../../utils/response.utils';
import { AppError } from '../../utils/AppError';
import { AppErrorCode, AuthenticatedRequest } from '../../types';
import { comparePassword } from '../../utils/password.utils';
import { authEvents } from '../../middleware/metrics.middleware';

// ─── Schemas ──────────────────────────────────────────────────
const verifyTotpSchema = z.object({
  token: z.string().length(6, 'TOTP token must be 6 digits').regex(/^\d+$/),
});

const disableTwoFactorSchema = z.object({
  password: z.string().min(1),
  token: z.string().length(6).regex(/^\d+$/),
});

// ─────────────────────────────────────────────────────────────
// Two-Factor Authentication Routes
// ─────────────────────────────────────────────────────────────
const router = Router();

router.use(authenticate);

/**
 * @openapi
 * /2fa/setup:
 *   post:
 *     summary: Generate 2FA secret and QR code
 *     description: Returns a TOTP secret and QR code URI. User must scan with an authenticator app then confirm with /2fa/verify to activate.
 *     tags: [2FA]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: 2FA setup data returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 secret: { type: string, description: "TOTP secret (store securely)" }
 *                 qrCodeDataUrl: { type: string, description: "Base64 PNG QR code for authenticator app" }
 *                 manualEntryKey: { type: string, description: "Manual entry key for authenticator apps" }
 *                 backupInfo: { type: string, description: "Instructions for the user" }
 */
router.post('/setup', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, email } = (req as AuthenticatedRequest).user;

    const user = await prisma.user.findUnique({
      where: { id },
      select: { twoFactorEnabled: true },
    });

    if (user?.twoFactorEnabled) {
      throw AppError.conflict('Two-factor authentication is already enabled');
    }

    // Generate secret
    const secret = authenticator.generateSecret(32);
    const appName = encodeURIComponent(env.APP_NAME);
    const otpAuthUrl = authenticator.keyuri(email, appName, secret);

    // Generate QR code as base64 PNG
    const qrCodeDataUrl = await QRCode.toDataURL(otpAuthUrl, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      width: 256,
      margin: 2,
      color: { dark: '#000000', light: '#FFFFFF' },
    });

    // Temporarily store secret (unverified) on user
    await prisma.user.update({
      where: { id },
      data: { twoFactorSecret: secret },
    });

    sendSuccess(res, {
      secret,
      qrCodeDataUrl,
      manualEntryKey: secret.match(/.{1,4}/g)?.join(' ') ?? secret,
      instructions: [
        '1. Open your authenticator app (Google Authenticator, Authy, 1Password)',
        '2. Scan the QR code or manually enter the key above',
        '3. Call POST /api/v1/2fa/verify with the 6-digit code to activate 2FA',
      ],
    }, 'Scan the QR code with your authenticator app');
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /2fa/verify:
 *   post:
 *     summary: Activate 2FA after scanning QR code
 *     tags: [2FA]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [token]
 *             properties:
 *               token:
 *                 type: string
 *                 example: "123456"
 *                 description: 6-digit TOTP code from authenticator app
 *     responses:
 *       200:
 *         description: 2FA activated successfully
 */
router.post(
  '/verify',
  validate(verifyTotpSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = (req as AuthenticatedRequest).user;
      const { token } = req.body;

      const user = await prisma.user.findUnique({
        where: { id },
        select: { twoFactorSecret: true, twoFactorEnabled: true },
      });

      if (!user?.twoFactorSecret) {
        throw AppError.badRequest('2FA setup not initiated. Call /2fa/setup first.');
      }

      if (user.twoFactorEnabled) {
        throw AppError.conflict('2FA is already active');
      }

      const isValid = authenticator.verify({
        token,
        secret: user.twoFactorSecret,
      });

      if (!isValid) {
        throw AppError.badRequest(
          'Invalid TOTP code. Ensure your device clock is synced.',
          AppErrorCode.TOKEN_INVALID,
        );
      }

      await prisma.user.update({
        where: { id },
        data: { twoFactorEnabled: true },
      });

      authEvents.inc({ event: '2fa_enabled' });

      sendSuccess(res, { twoFactorEnabled: true },
        '✅ Two-factor authentication is now active on your account');
    } catch (error) {
      next(error);
    }
  },
);

/**
 * @openapi
 * /2fa/disable:
 *   post:
 *     summary: Disable 2FA (requires password + current TOTP code)
 *     tags: [2FA]
 *     security:
 *       - BearerAuth: []
 */
router.post(
  '/disable',
  validate(disableTwoFactorSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = (req as AuthenticatedRequest).user;
      const { password, token } = req.body;

      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          passwordHash: true,
          twoFactorEnabled: true,
          twoFactorSecret: true,
        },
      });

      if (!user?.twoFactorEnabled || !user.twoFactorSecret) {
        throw AppError.badRequest('2FA is not currently enabled');
      }

      // Verify password
      const passwordValid = await comparePassword(password, user.passwordHash);
      if (!passwordValid) {
        throw AppError.unauthorized('Incorrect password', AppErrorCode.INVALID_CREDENTIALS);
      }

      // Verify TOTP
      const totpValid = authenticator.verify({
        token,
        secret: user.twoFactorSecret,
      });
      if (!totpValid) {
        throw AppError.badRequest('Invalid TOTP code', AppErrorCode.TOKEN_INVALID);
      }

      await prisma.user.update({
        where: { id },
        data: { twoFactorEnabled: false, twoFactorSecret: null },
      });

      authEvents.inc({ event: '2fa_disabled' });

      sendSuccess(res, { twoFactorEnabled: false }, '2FA has been disabled');
    } catch (error) {
      next(error);
    }
  },
);

/**
 * @openapi
 * /2fa/status:
 *   get:
 *     summary: Get current 2FA status
 *     tags: [2FA]
 *     security:
 *       - BearerAuth: []
 */
router.get('/status', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = (req as AuthenticatedRequest).user;
    const user = await prisma.user.findUnique({
      where: { id },
      select: { twoFactorEnabled: true },
    });
    sendSuccess(res, { twoFactorEnabled: user?.twoFactorEnabled ?? false });
  } catch (error) {
    next(error);
  }
});

export { router as twoFactorRouter };
