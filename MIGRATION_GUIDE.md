# Migration Guide: V1 to V2

This guide explains how to migrate from the Express.js V1 implementation to the Next.js V2 implementation.

## Overview

V2 is a complete rewrite using modern technologies:
- **Next.js 14+** (App Router) instead of Express.js
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **PostgreSQL (Supabase)** instead of SQLite
- **Prisma ORM** instead of raw SQL
- **React** components instead of vanilla JavaScript

## Key Changes

### API Endpoints

All V2 APIs are prefixed with `/api/v2/`:

| V1 Endpoint | V2 Endpoint |
|------------|-------------|
| `POST /redeem-code` | `POST /api/v2/tokens/redeem` |
| `GET /user-tokens` | `GET /api/v2/tokens/balance` |
| `POST /purchase-tokens` | `POST /api/v2/payments/purchase` |
| `POST /api/check-payment-status` | `POST /api/v2/payments/status` |
| `POST /intasend/webhook` | `POST /api/v2/payments/webhook` |
| `POST /api/ai-render` | `POST /api/v2/render/generate` |
| `GET /job-status` | `GET /api/v2/render/status` |

### Database Migration

1. **Setup Supabase PostgreSQL database**
2. **Run Prisma migrations:**
   ```bash
   cd V2
   npx prisma generate
   npx prisma db push
   ```

3. **Migrate existing data:**
   ```bash
   node scripts/migrate-data.js
   ```

### Environment Variables

Copy your existing `.env` values to `V2/.env.local`:

```env
DATABASE_URL="postgresql://user:pass@host:5432/dbname"
INTASEND_PUBLIC_KEY="your-key"
INTASEND_SECRET_KEY="your-secret"
INTASEND_TEST_MODE=true
KIE_API_KEY="your-key"
SEEDREAM_API_KEY="your-key"
VEO_API_KEY="your-key"
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

### Frontend Changes

- All frontend code is now React components
- Use hooks: `useTokens()`, `usePayment()`, `useRender()`, `useVideo()`
- Components are in `src/components/`
- Pages are in `src/app/`

### Deployment

1. **Install dependencies:**
   ```bash
   cd V2
   npm install
   ```

2. **Build:**
   ```bash
   npm run build
   ```

3. **Start:**
   ```bash
   npm start
   ```

## Testing

Test all flows:
1. Token redemption
2. Payment processing
3. Render generation
4. Video generation
5. Admin dashboard

## Rollback Plan

V1 continues to run independently. If issues arise:
1. Keep V1 running
2. Fix issues in V2
3. Test thoroughly
4. Switch traffic gradually



