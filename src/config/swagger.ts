import swaggerJsdoc from 'swagger-jsdoc';
import { env } from './env';

// ─────────────────────────────────────────────────────────────
// OpenAPI 3.0 Specification
// Auto-generates interactive docs at /api/v1/docs
// ─────────────────────────────────────────────────────────────

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: `${env.APP_NAME} API`,
      version: '1.0.0',
      description: `
## Salon Booking Platform — REST API

A production-grade booking system API with:
- 🔐 JWT authentication with token rotation
- 👤 Role-based access control (Super Admin, Admin, Customer)
- 📧 Email verification & password reset flows
- 🔒 Two-factor authentication (TOTP)
- 📊 Full audit logging
- 🚦 Tiered rate limiting

### Authentication
This API uses **Bearer token** authentication.

After logging in, include your access token in the \`Authorization\` header:
\`\`\`
Authorization: Bearer <your_access_token>
\`\`\`

Access tokens expire in **15 minutes**. Use the \`/auth/refresh\` endpoint to get a new one.
      `,
      contact: {
        name: 'API Support',
        email: env.EMAIL_FROM_ADDRESS,
      },
      license: {
        name: 'MIT',
      },
    },
    servers: [
      {
        url: `${env.API_URL}/api/${env.API_VERSION}`,
        description: env.NODE_ENV === 'production' ? 'Production' : 'Development',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your access token',
        },
      },
      schemas: {
        // ─── Common ──────────────────────────────────────────
        SuccessResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string' },
            data: { type: 'object' },
            timestamp: { type: 'string', format: 'date-time' },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string' },
            code: { type: 'string' },
            timestamp: { type: 'string', format: 'date-time' },
          },
        },
        ValidationError: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Validation failed' },
            code: { type: 'string', example: 'VALIDATION_ERROR' },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: { type: 'string' },
                  message: { type: 'string' },
                },
              },
            },
            timestamp: { type: 'string', format: 'date-time' },
          },
        },
        PaginationMeta: {
          type: 'object',
          properties: {
            page: { type: 'integer', example: 1 },
            limit: { type: 'integer', example: 20 },
            total: { type: 'integer', example: 150 },
            totalPages: { type: 'integer', example: 8 },
            hasNextPage: { type: 'boolean', example: true },
            hasPrevPage: { type: 'boolean', example: false },
          },
        },
        // ─── User ────────────────────────────────────────────
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            email: { type: 'string', format: 'email' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            phone: { type: 'string', nullable: true },
            role: {
              type: 'string',
              enum: ['SUPER_ADMIN', 'ADMIN', 'STAFF', 'CUSTOMER'],
            },
            status: {
              type: 'string',
              enum: ['ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING_VERIFICATION'],
            },
            avatarUrl: { type: 'string', nullable: true },
            emailVerified: { type: 'boolean' },
            twoFactorEnabled: { type: 'boolean' },
            lastLoginAt: { type: 'string', format: 'date-time', nullable: true },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        TokenPair: {
          type: 'object',
          properties: {
            accessToken: { type: 'string' },
            refreshToken: { type: 'string' },
            expiresIn: { type: 'integer', description: 'Access token TTL in seconds' },
          },
        },
      },
      responses: {
        Unauthorized: {
          description: 'Authentication required or token invalid',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
        Forbidden: {
          description: 'Insufficient permissions',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
        NotFound: {
          description: 'Resource not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
        RateLimited: {
          description: 'Too many requests',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
        ValidationFailed: {
          description: 'Input validation failed',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ValidationError' },
            },
          },
        },
      },
    },
    tags: [
      { name: 'Auth', description: 'Authentication & authorization' },
      { name: 'Users', description: 'User profile management' },
      { name: '2FA', description: 'Two-factor authentication (TOTP)' },
      { name: 'Admin', description: 'Platform administration (Admin+ only)' },
      { name: 'System', description: 'Health checks & monitoring' },
    ],
  },
  apis: ['./src/modules/**/*.routes.ts', './src/modules/**/*.controller.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
