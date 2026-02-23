# 💇 Salon Booking Platform — Backend API
### Milestone 1 · Production-Grade · Node.js + TypeScript + PostgreSQL

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 20 + TypeScript 5 |
| Framework | Express.js 4 |
| ORM + DB | Prisma 5 + PostgreSQL 16 |
| Cache | Redis 7 |
| Auth | JWT (Access + Refresh) + Bcrypt 12 rounds |
| 2FA | TOTP (Google Authenticator / Authy) |
| Validation | Zod |
| Email | Nodemailer + HTML templates |
| Logging | Winston + Daily Rotate (structured JSON) |
| Docs | Swagger / OpenAPI 3.0 (interactive) |
| Metrics | Prometheus + prom-client |
| Container | Docker multi-stage + Docker Compose |

---

## 📁 Project Structure

```
salon-backend/
├── prisma/
│   ├── schema.prisma          # Full schema: Users, Tokens, Sessions, Audit, Salon
│   └── seed.ts                # Development seed data with demo accounts
├── src/
│   ├── config/
│   │   ├── env.ts             # Zod-validated environment — crashes on bad config
│   │   ├── database.ts        # Prisma singleton + slow-query detection
│   │   ├── redis.ts           # Redis client + helpers (blacklisting, caching)
│   │   ├── logger.ts          # Winston with daily rotating files
│   │   └── swagger.ts         # OpenAPI 3.0 spec + component schemas
│   ├── middleware/
│   │   ├── auth.middleware.ts        # JWT verify + RBAC + account status checks
│   │   ├── error.middleware.ts       # Global error handler (Prisma/Zod/App/Unknown)
│   │   ├── validate.middleware.ts    # Zod request schema validation
│   │   ├── rateLimiter.ts            # Tiered rate limiters
│   │   ├── requestId.middleware.ts   # Unique request IDs + response time headers
│   │   └── metrics.middleware.ts     # Prometheus metrics (requests, latency, errors)
│   ├── modules/
│   │   ├── auth/                     # Full auth flow
│   │   │   ├── auth.schemas.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.controller.ts
│   │   │   └── auth.routes.ts        # OpenAPI annotated
│   │   ├── user/
│   │   │   └── user.routes.ts        # Profile + session management
│   │   ├── twoFactor/
│   │   │   └── twoFactor.routes.ts   # TOTP setup, verify, disable
│   │   └── admin/
│   │       └── admin.routes.ts       # User MGMT, stats, audit logs
│   ├── utils/
│   │   ├── AppError.ts               # Custom error with factory methods
│   │   ├── jwt.utils.ts              # Token signing/verification
│   │   ├── password.utils.ts         # Bcrypt + CSPRNG + strength validation
│   │   ├── email.utils.ts            # Nodemailer + HTML email templates
│   │   └── response.utils.ts         # Standardized JSON response helpers
│   ├── types/index.ts                # TypeScript interfaces + AppErrorCode enum
│   ├── app.ts                        # Express factory with all middleware
│   └── server.ts                     # Entry + graceful shutdown
├── .env.example
├── Dockerfile                        # Multi-stage, non-root, healthcheck
├── docker-compose.yml                # API + PostgreSQL + Redis + Adminer
└── tsconfig.json
```

---

## 🚀 Quick Start

### Docker (Recommended — zero setup)

```bash
git clone <repo>
cd salon-backend
cp .env.example .env       # Edit secrets

docker compose up -d       # Start everything

docker compose exec api npx prisma migrate deploy
docker compose exec api npm run prisma:seed

# API:     http://localhost:5000
# Docs:    http://localhost:5000/api/v1/docs
# Metrics: http://localhost:5000/metrics
# DB UI:   docker compose --profile tools up → http://localhost:8080
```

### Local

```bash
npm install
cp .env.example .env       # Set DATABASE_URL, JWT secrets, SMTP

npm run prisma:generate
npm run prisma:migrate:dev
npm run prisma:seed
npm run dev
```

---

## 📡 API Reference

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register (customer or admin) |
| POST | `/auth/login` | Login → access + refresh tokens |
| POST | `/auth/refresh` | Rotate refresh token |
| POST | `/auth/logout` | Revoke current session |
| POST | `/auth/logout-all` | Revoke ALL sessions |
| GET  | `/auth/me` | Current user profile |
| POST | `/auth/verify-email` | Verify email with token |
| POST | `/auth/resend-verification` | Resend verification email |
| POST | `/auth/forgot-password` | Send reset email |
| POST | `/auth/reset-password` | Reset with token |
| POST | `/auth/change-password` | Change password (authenticated) |

### User Profile
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET  | `/users/profile` | Get own profile |
| PATCH | `/users/profile` | Update profile |
| DELETE | `/users/account` | Soft-delete account |
| GET | `/users/sessions` | List active sessions |
| DELETE | `/users/sessions/:id` | Revoke specific session |

### Two-Factor Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/2fa/setup` | Generate secret + QR code |
| POST | `/2fa/verify` | Activate 2FA with TOTP code |
| POST | `/2fa/disable` | Disable 2FA (requires password + TOTP) |
| GET | `/2fa/status` | Check 2FA status |

### Admin (Admin+ only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/stats` | Platform statistics & growth metrics |
| GET | `/admin/users` | List users (search, filter, paginate) |
| GET | `/admin/users/:id` | Detailed user profile + activity |
| PATCH | `/admin/users/:id/status` | Suspend / activate user |
| PATCH | `/admin/users/:id/role` | Change role (Super Admin only) |
| POST | `/admin/users/:id/unlock` | Unlock locked account |
| DELETE | `/admin/users/:id/sessions` | Force-revoke all user sessions |
| GET | `/admin/audit-logs` | Platform audit log with filters |

### System
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Basic health (for Docker/K8s liveness probe) |
| GET | `/health/deep` | DB latency, Redis, memory, system info |
| GET | `/metrics` | Prometheus metrics |
| GET | `/api/v1/docs` | Interactive Swagger UI |
| GET | `/api/v1/docs.json` | OpenAPI JSON spec |

---

## 🔒 Security Architecture

### JWT Strategy
- **Access token** — 15-minute expiry, stateless
- **Refresh token** — 7-day expiry, single-use with rotation
- **Blacklisting** — revoked tokens stored in Redis for remaining TTL
- **Password invalidation** — all tokens voided if password changes after issuance
- **Token rotation** — each refresh issues a new pair; reuse triggers full account logout

### Account Protection
- Failed login tracking → auto-lock after 5 attempts (15 min)
- Timing-safe password comparison (prevents timing attacks)
- Email enumeration prevention on all sensitive endpoints
- Soft deletes — user data preserved, never hard-deleted

### Two-Factor Authentication
- TOTP (RFC 6238) compatible with Google Authenticator, Authy, 1Password
- QR code returned as base64 PNG — scan directly in browser
- Requires password + TOTP to disable (prevents social engineering)

### API Layer
- **Helmet** — 15 security headers including HSTS, CSP, X-Frame-Options
- **Rate limiting** — 100/15min general, 10/15min auth, 5/hr sensitive ops
- **HPP** — HTTP Parameter Pollution prevention
- **XSS-Clean** — sanitizes body and query strings
- **Zod validation** — every endpoint has a strict schema

---

## 📊 Monitoring

### Prometheus Metrics (`/metrics`)
- `salon_http_requests_total` — by method, route, status code
- `salon_http_request_duration_ms` — histogram with P50/P95/P99
- `salon_http_active_connections` — live gauge
- `salon_auth_events_total` — login, register, 2fa events
- `salon_db_query_duration_ms` — database query latency
- `salon_emails_sent_total` — email send success/failure
- `salon_rate_limit_hits_total` — rate limiting hits
- Default Node.js metrics: GC, heap, event loop lag

### Request Tracing
Every request gets a `X-Request-ID` header (UUID v4).
Pass your own via `X-Request-ID` header to correlate frontend → backend → logs.

### Deep Health Check (`/health/deep`)
```json
{
  "status": "healthy",
  "uptime": { "seconds": 3600, "human": "1h 0m 0s" },
  "system": { "freeMemoryMb": 1024, "loadAverage": [0.5, 0.4, 0.3] },
  "checks": {
    "database": { "status": "healthy", "latencyMs": 2 },
    "redis": { "status": "healthy", "latencyMs": 1 },
    "memory": { "status": "healthy", "message": "45MB / 256MB (17%)" }
  }
}
```

---

## 🌱 Seed Credentials

| Role | Email | Password |
|------|-------|----------|
| Super Admin | superadmin@salonplatform.com | Admin@123456 |
| Salon Admin | owner@demosalon.com | Admin@123456 |
| Customer | customer@example.com | Customer@123456 |

> ⚠️ **Change ALL credentials before any deployment!**

---

## 📦 Scripts

```bash
npm run dev               # Hot-reload development
npm run build             # Compile TypeScript
npm run start             # Start production
npm run prisma:generate   # Regenerate Prisma client
npm run prisma:migrate    # Deploy migrations (prod)
npm run prisma:migrate:dev # Create + apply (dev)
npm run prisma:seed       # Seed database
npm run prisma:studio     # Prisma Studio GUI
```

---

## 🗺️ Phase 2 Ready

Schema pre-scaffolds the `Salon` model. Route stubs in `app.ts` for:
- `GET/POST /salons` — Salon profile management
- `GET/POST /services` — Services CRUD
- `GET/POST /staff` — Staff management
- `GET/POST /appointments` — Booking workflow
