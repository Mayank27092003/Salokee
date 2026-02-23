import { Router } from 'express';
import { authController } from './auth.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import {
  authLimiter,
  sensitiveOpLimiter,
  refreshLimiter,
} from '../../middleware/rateLimiter';
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  verifyEmailSchema,
  resendVerificationSchema,
} from './auth.schemas';

const router = Router();

// ─────────────────────────────────────────────────────────────
// Public routes
// ─────────────────────────────────────────────────────────────

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new account
 *     description: Creates a customer or admin account. Sends email verification link.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, firstName, lastName]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: jane@example.com
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 example: "SecurePass@123"
 *               firstName:
 *                 type: string
 *                 example: Jane
 *               lastName:
 *                 type: string
 *                 example: Smith
 *               phone:
 *                 type: string
 *                 example: "+1-555-0100"
 *               role:
 *                 type: string
 *                 enum: [CUSTOMER, ADMIN]
 *                 default: CUSTOMER
 *     responses:
 *       201:
 *         description: Registration successful, verification email sent
 *       409:
 *         description: Email or phone already in use
 *       422:
 *         $ref: '#/components/responses/ValidationFailed'
 *       429:
 *         $ref: '#/components/responses/RateLimited'
 */
router.post(
  '/register',
  authLimiter,
  validate(registerSchema),
  authController.register.bind(authController),
);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login and receive JWT tokens
 *     description: |
 *       Returns an access token (15 min) and a refresh token (7 days).
 *       The refresh token is also set as an httpOnly cookie.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: jane@example.com
 *               password:
 *                 type: string
 *                 example: "SecurePass@123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         user:
 *                           $ref: '#/components/schemas/User'
 *                         accessToken:
 *                           type: string
 *                         expiresIn:
 *                           type: integer
 *       401:
 *         description: Invalid credentials
 *       403:
 *         description: Account locked or suspended
 *       429:
 *         $ref: '#/components/responses/RateLimited'
 */
router.post(
  '/login',
  authLimiter,
  validate(loginSchema),
  authController.login.bind(authController),
);

/**
 * @openapi
 * /auth/2fa-login:
 *   post:
 *     summary: Complete login with 2FA TOTP code
 *     description: |
 *       Step 2 of login when 2FA is enabled. Submit the `twoFactorToken` from
 *       the `/auth/login` response along with the 6-digit code from your authenticator app.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [twoFactorToken, code]
 *             properties:
 *               twoFactorToken:
 *                 type: string
 *                 description: Temporary token returned by /auth/login when 2FA is required
 *               code:
 *                 type: string
 *                 example: "123456"
 *                 description: 6-digit TOTP code from authenticator app
 *     responses:
 *       200:
 *         description: Login complete — full tokens issued
 *       401:
 *         description: Invalid or expired 2FA code
 */
router.post(
  '/2fa-login',
  authLimiter,
  authController.twoFactorLogin.bind(authController),
);
router.post(
  '/refresh',
  refreshLimiter,
  authController.refreshTokens.bind(authController),
);

/**
 * @route   POST /api/v1/auth/verify-email
 * @desc    Verify email address using token from email
 * @access  Public
 */
router.post(
  '/verify-email',
  validate(verifyEmailSchema),
  authController.verifyEmail.bind(authController),
);

/**
 * @route   POST /api/v1/auth/resend-verification
 * @desc    Resend email verification link
 * @access  Public
 */
router.post(
  '/resend-verification',
  sensitiveOpLimiter,
  validate(resendVerificationSchema),
  authController.resendVerification.bind(authController),
);

/**
 * @route   POST /api/v1/auth/forgot-password
 * @desc    Send password reset email
 * @access  Public
 */
router.post(
  '/forgot-password',
  sensitiveOpLimiter,
  validate(forgotPasswordSchema),
  authController.forgotPassword.bind(authController),
);

/**
 * @route   POST /api/v1/auth/reset-password
 * @desc    Reset password using token from email
 * @access  Public
 */
router.post(
  '/reset-password',
  sensitiveOpLimiter,
  validate(resetPasswordSchema),
  authController.resetPassword.bind(authController),
);

// ─────────────────────────────────────────────────────────────
// Protected routes (require authentication)
// ─────────────────────────────────────────────────────────────

/**
 * @route   GET /api/v1/auth/me
 * @desc    Get current authenticated user profile
 * @access  Private
 */
router.get(
  '/me',
  authenticate,
  authController.getMe.bind(authController),
);

/**
 * @route   POST /api/v1/auth/change-password
 * @desc    Change password (requires current password)
 * @access  Private
 */
router.post(
  '/change-password',
  authenticate,
  validate(changePasswordSchema),
  authController.changePassword.bind(authController),
);

/**
 * @route   POST /api/v1/auth/logout
 * @desc    Logout (revoke current session)
 * @access  Private
 */
router.post(
  '/logout',
  authenticate,
  authController.logout.bind(authController),
);

/**
 * @route   POST /api/v1/auth/logout-all
 * @desc    Logout from all devices
 * @access  Private
 */
router.post(
  '/logout-all',
  authenticate,
  authController.logoutAll.bind(authController),
);

export { router as authRouter };
