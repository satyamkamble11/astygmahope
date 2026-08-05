# Astygma Hope Clinic — Render Backend Deployment

## Architecture
```
Frontend (React)      → Cloudflare Pages
        ↓ HTTPS calls to REST API
Backend (Node/Express) → Render Web Service
        ↓ PostgreSQL connection (pg)
Database (PostgreSQL)  → Supabase (unchanged)
```

## Steps

### 1. Backend Server (Express API for Render)
- [x] Create `server/` directory structure
- [x] `server/package.json` — express, pg, cors, jsonwebtoken, bcryptjs, dotenv
- [x] `server/config.js` — env config (PORT, DATABASE_URL, JWT_SECRET, CLIENT_URL)
- [x] `server/db.js` — pg connection pool
- [x] `server/middleware/auth.js` — JWT verify + role guards
- [x] `server/routes/auth.js` — POST /api/auth/login, GET /api/auth/profile
- [x] `server/routes/appointments.js` — GET/POST /api/appointments, PATCH status
- [x] `server/routes/content.js` — doctors, services, testimonials, gallery, blog, sound-tracks, courses, faqs
- [x] `server/routes/content.js` — POST /api/cms/posts, POST /api/cms/sound-tracks (admin)
- [x] `server/routes/contact.js` — POST contact messages, feedback
- [x] `server/index.js` — Express app entry
- [x] `server/migrations/staff_users.sql` — auth credentials table for backend login

### 2. Render Deployment Config
- [x] `render.yaml` — Render blueprint (web service + env vars)

### 3. Frontend Integration
- [x] `src/lib/api.ts` — API client (base URL + fetch helpers, `/api` prefix)
- [x] Update `src/lib/queries.ts` — use REST API instead of Supabase client
- [x] Update `src/components/dashboards/PortalLoginModal.tsx` — JWT login via API
- [x] `src/vite-env.d.ts` — typed `VITE_API_URL` env var

### 4. Documentation
- [x] `docs/RENDER_DEPLOYMENT.md` — step-by-step guide

### 5. Testing
- [x] TypeScript check passes (`npx tsc --noEmit`)
- [ ] Run backend locally + verify endpoints
- [ ] Run frontend + verify integration

