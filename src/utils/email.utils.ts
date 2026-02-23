import nodemailer, { Transporter } from 'nodemailer';
import { env } from '../config/env';
import { logger } from '../config/logger';

// ─────────────────────────────────────────────────────────────
// Email Service — Professional HTML email templates
// ─────────────────────────────────────────────────────────────

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

class EmailService {
  private transporter: Transporter | null = null;
  private smtpConfigured: boolean;

  constructor() {
    this.smtpConfigured = !!(env.SMTP_USER && env.SMTP_PASS);

    if (this.smtpConfigured) {
      this.transporter = nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        secure: env.SMTP_SECURE,
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASS,
        },
        pool: true,
        maxConnections: 5,
        maxMessages: 100,
      });
    } else {
      logger.warn('⚠️  SMTP not configured — emails will be logged to console only');
    }
  }

  async verifyConnection(): Promise<boolean> {
    if (!this.smtpConfigured || !this.transporter) {
      logger.warn('Email service: running in console-log mode (no SMTP configured)');
      return false;
    }
    try {
      await this.transporter.verify();
      logger.info('✅ Email service connected');
      return true;
    } catch (error) {
      logger.warn('⚠️  Email service unavailable', { error: (error as Error).message });
      return false;
    }
  }

  private async send(options: EmailOptions): Promise<void> {
    if (!this.smtpConfigured || !this.transporter) {
      // Dev fallback — log to console so developers can still see email content
      logger.info('📧 [DEV EMAIL — not sent]', {
        to: options.to,
        subject: options.subject,
        text: this.htmlToText(options.html),
      });
      return;
    }
    try {
      await this.transporter.sendMail({
        from: `"${env.EMAIL_FROM_NAME}" <${env.EMAIL_FROM_ADDRESS}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text ?? this.htmlToText(options.html),
      });
      logger.info('Email sent', { to: options.to, subject: options.subject });
    } catch (error) {
      logger.error('Failed to send email', {
        to: options.to,
        subject: options.subject,
        error: (error as Error).message,
      });
      // Don't throw — email failure shouldn't break the request
    }
  }

  // ─── Email templates ───────────────────────────────────────

  async sendVerificationEmail(opts: {
    to: string;
    firstName: string;
    verificationUrl: string;
  }): Promise<void> {
    await this.send({
      to: opts.to,
      subject: `Verify your email — ${env.APP_NAME}`,
      html: this.baseTemplate({
        title: 'Verify Your Email',
        previewText: 'One click to get started!',
        body: `
          <h1 style="color:#1a1a1a;font-size:28px;font-weight:700;margin-bottom:8px;">
            Welcome, ${opts.firstName}! 👋
          </h1>
          <p style="color:#555;font-size:16px;line-height:1.6;margin-bottom:24px;">
            Thanks for signing up. Please verify your email address to activate your account.
          </p>
          <a href="${opts.verificationUrl}" 
             style="display:inline-block;padding:14px 32px;background:#2563eb;color:#fff;
                    text-decoration:none;border-radius:8px;font-size:16px;font-weight:600;
                    margin-bottom:24px;">
            Verify Email Address
          </a>
          <p style="color:#888;font-size:14px;">
            This link expires in 24 hours. If you didn't create an account, you can safely ignore this email.
          </p>
        `,
      }),
    });
  }

  async sendPasswordResetEmail(opts: {
    to: string;
    firstName: string;
    resetUrl: string;
  }): Promise<void> {
    await this.send({
      to: opts.to,
      subject: `Reset your password — ${env.APP_NAME}`,
      html: this.baseTemplate({
        title: 'Reset Your Password',
        previewText: 'Password reset requested',
        body: `
          <h1 style="color:#1a1a1a;font-size:28px;font-weight:700;margin-bottom:8px;">
            Reset Your Password
          </h1>
          <p style="color:#555;font-size:16px;line-height:1.6;margin-bottom:24px;">
            Hi ${opts.firstName}, we received a request to reset your password. 
            Click below to choose a new one.
          </p>
          <a href="${opts.resetUrl}"
             style="display:inline-block;padding:14px 32px;background:#2563eb;color:#fff;
                    text-decoration:none;border-radius:8px;font-size:16px;font-weight:600;
                    margin-bottom:24px;">
            Reset Password
          </a>
          <p style="color:#888;font-size:14px;">
            This link expires in 1 hour. If you didn't request a password reset, 
            please secure your account immediately.
          </p>
        `,
      }),
    });
  }

  async sendPasswordChangedEmail(opts: {
    to: string;
    firstName: string;
  }): Promise<void> {
    await this.send({
      to: opts.to,
      subject: `Your password has been changed — ${env.APP_NAME}`,
      html: this.baseTemplate({
        title: 'Password Changed',
        previewText: 'Your password was successfully updated',
        body: `
          <h1 style="color:#1a1a1a;font-size:28px;font-weight:700;margin-bottom:8px;">
            Password Changed Successfully
          </h1>
          <p style="color:#555;font-size:16px;line-height:1.6;margin-bottom:24px;">
            Hi ${opts.firstName}, your password has been updated.
            If you didn't make this change, please contact support immediately.
          </p>
          <p style="color:#888;font-size:14px;">
            Changed at: ${new Date().toUTCString()}
          </p>
        `,
      }),
    });
  }

  async sendWelcomeEmail(opts: {
    to: string;
    firstName: string;
  }): Promise<void> {
    await this.send({
      to: opts.to,
      subject: `Welcome to ${env.APP_NAME}!`,
      html: this.baseTemplate({
        title: 'Welcome!',
        previewText: `Your account is ready`,
        body: `
          <h1 style="color:#1a1a1a;font-size:28px;font-weight:700;margin-bottom:8px;">
            You're all set, ${opts.firstName}! 🎉
          </h1>
          <p style="color:#555;font-size:16px;line-height:1.6;margin-bottom:24px;">
            Your account has been verified. You can now browse salons, 
            book appointments, and manage your beauty routine.
          </p>
          <a href="${env.CLIENT_URL}/dashboard"
             style="display:inline-block;padding:14px 32px;background:#2563eb;color:#fff;
                    text-decoration:none;border-radius:8px;font-size:16px;font-weight:600;">
            Go to Dashboard
          </a>
        `,
      }),
    });
  }

  // ─── Base HTML template ─────────────────────────────────────
  private baseTemplate(opts: {
    title: string;
    previewText: string;
    body: string;
  }): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${opts.title}</title>
  <span style="display:none;font-size:1px;color:#fff;max-height:0;overflow:hidden;">
    ${opts.previewText}
  </span>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f4f4f5">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" border="0" cellspacing="0" cellpadding="0" 
               style="max-width:600px;width:100%;background:#fff;border-radius:12px;
                      box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="padding:32px 40px;border-bottom:1px solid #f0f0f0;text-align:center;">
              <h2 style="margin:0;color:#2563eb;font-size:22px;font-weight:700;">
                ${env.APP_NAME}
              </h2>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              ${opts.body}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #f0f0f0;text-align:center;">
              <p style="color:#aaa;font-size:13px;margin:0;">
                © ${new Date().getFullYear()} ${env.APP_NAME}. All rights reserved.
              </p>
              <p style="color:#aaa;font-size:12px;margin:8px 0 0;">
                You're receiving this email because you have an account with us.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  }

  private htmlToText(html: string): string {
    return html
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
}

export const emailService = new EmailService();
