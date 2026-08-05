# 🚀 Deploy Backend on Render — Astygma Hope Clinic

This guide walks you through deploying the backend API on **Render** while keeping the
database on **Supabase** and the frontend on **Cloudflare Pages**.

```
Frontend (React)      → Cloudflare Pages
        ↓ HTTPS calls to REST API
Backend (Node/Express) → Render Web Service
        ↓ PostgreSQL connection (pg)
Database (PostgreSQL)  → Supabase (unchanged)
```

---

## Architecture Overview

| Layer | Host | Notes |
|---|---|---|
| Frontend | Cloudflare Pages | Static React build |
| Backend API | Render (Web Service) | Node.js + Express `server/` |
| Database | Supabase PostgreSQL | `db.gcqawwsopkbsednwzgph.supabase.co` |
| Auth | Backend JWT | Replaces Supabase client-side auth |

---

## Part 1 — Prepare the Supabase Database

### 1.1 Get your real database connection string

The backend connects to your Supabase PostgreSQL database directly. **You must use your
real password** — the `[YOUR-PASSWORD]` placeholder in the template will NOT work.

**How to get it:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/gcqawwsopkbsednwzgph)
2. **Project Settings → Database → Connection string**
3. Copy the **URI** connection string (it already contains your real password).

> If you forgot/need to reset the password: **Project Settings → Database →
> Reset database password**. Then update the connection string.
>
> ⚠️ Note: `astygma2026` was previously rejected by Supabase — reset it if needed.

### 1.2 Create the `staff_users` table (for backend login)

The backend uses its own JWT login (not Supabase Auth). Run the migration:

**Option A — Supabase SQL Editor:**
1. Open [Supabase Dashboard](https://supabase.com/dashboard/project/gcqawwsopkbsednwzgph)
2. **SQL Editor → New query**
3. Paste the contents of `server/migrations/staff_users.sql`
4. Run it.

**Option B — via the deploy script:**
```powershell
$env:SUPABASE_DB_URL="postgresql://postgres:YOUR_REAL_PASSWORD@db.gcqawwsopkbsednwzgph.supabase.co:5432/postgres"
node scripts/deploy-db.cjs
```

### 1.3 Create the admin staff account

Generate a bcrypt hash for your admin password:
```powershell
cd server
node -e "console.log(require('bcryptjs').hashSync('YourStrongPassword', 10))"
```

Then insert the admin along with the hash (via SQL Editor):
```sql
INSERT INTO public.staff_users (email, full_name, password_hash, role)
VALUES (
  'admin@astygmahope.com',
  'Clinic Administrator',
  '<THE_BCRYPT_HASH_FROM_ABOVE>',
  'SUPER_ADMIN'
);
```

Repeat for other staff roles (`RECEPTIONIST`, `DOCTOR`, `CLINIC_ADMIN`).

---

## Part 2 — Deploy the Backend on Render

### 2.1 Create a GitHub repo (if not already done)

The `server/` folder must be committed to a Git repo so Render can pull it.

```powershell
git init
git add .
git commit -m "Add Render backend + frontend API integration"
# Create a repo on GitHub and push
```

### 2.2 Deploy via Blueprint (recommended)

The included `render.yaml` is a Render **Blueprint**. In Render:

1. Go to **Render Dashboard → New → Blueprint**
2. Connect your GitHub repo.
3. Render reads `render.yaml` and creates the `astygma-hope-clinic-backend` web service.
4. Set the **secrets** (saved in Render Env Vars):

### 2.3 Configure Environment Variables (secrets)

In Render → your service → **Environment**:

| Variable | Value |
|---|---|
| `DATABASE_URL` | `postgresql://postgres:YOUR_REAL_PASSWORD@db.gcqawwsopkbsednwzgph.supabase.co:5432/postgres` |
| `JWT_SECRET` | A long random string |
| `CLIENT_URL` | `http://localhost:3000,https://your-project.pages.dev` |
| `JWT_EXPIRES_IN` | `7d` (optional) |
| `NODE_ENV` | `production` |

**Generate a JWT_SECRET:**
```powershell
[guid]::NewGuid().ToString('N') + [guid]::NewGuid().ToString('N')
```

### 2.4 Deploy!

Render will auto-build and start on deploy. Verify with the health check:
`https://<your-service>.onrender.com/health`

Expected response:
```json
{ "status": "ok", "db": "connected", "time": "..." }
```

> If `db` shows `disconnected`, your `DATABASE_URL` is wrong (likely the password).

---

## Part 3 — Frontend: Cloudflare Pages

### 3.1 Build settings

| Setting | Value |
|---|---|
| Framework preset | Vite |
| Build command | `npm run build` |
| Build output | `dist` |
| Root directory | `/` |

### 3.2 Add environment variable

| Variable | Value |
|---|---|
| `VITE_API_URL` | `https://<your-service>.onrender.com` |

> ⚠️ This is the critical new variable. It tells the frontend where the backend lives.
> In dev, `src/lib/api.ts` defaults to `http://localhost:3000`.

### 3.3 CORS

The Render backend allows requests from the `CLIENT_URL` origins you set. Ensure your
Cloudflare Pages URL (e.g. `https://your-project.pages.dev`) is included in `CLIENT_URL`.

---

## Part 4 — Local Testing

### 4.1 Start the backend

```powershell
cd server
# create server/.env with DATABASE_URL, JWT_SECRET, CLIENT_URL
npm install
npm run dev
```

### 4.2 Start the frontend

```powershell
# in the project root
npm run dev
```

The frontend at `http://localhost:3000` calls the backend at `http://localhost:3000`
via `src/lib/api.ts` (default `API_BASE_URL`).

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/login` | Public | Staff login → JWT |
| `GET` | `/api/auth/profile` | JWT | Current user profile |
| `GET` | `/api/doctors` | Public | Active doctors |
| `GET` | `/api/services` | Public | Active services |
| `GET` | `/api/testimonials` | Public | Approved testimonials |
| `GET` | `/api/gallery` | Public | Gallery items |
| `GET` | `/api/blog-posts` | Public | Published posts |
| `GET` | `/api/sound-tracks` | Public | Active sound tracks |
| `GET` | `/api/courses` | Public | Active courses |
| `GET` | `/api/faqs` | Public | Active FAQs |
| `GET` | `/api/settings` | Public | Site settings |
| `POST` | `/api/appointments` | Public | Create appointment |
| `GET` | `/api/appointments` | JWT (staff) | List appointments |
| `PATCH` | `/api/appointments/:id/status` | JWT (staff) | Update status |
| `DELETE` | `/api/appointments/:id` | JWT (admin) | Delete appointment |
| `POST` | `/api/cms/posts` | JWT (admin) | Publish blog/post |
| `POST` | `/api/cms/sound-tracks` | JWT (admin) | Add sound track |
| `POST` | `/api/contact-messages` | Public | Submit contact |
| `POST` | `/api/feedback` | Public | Submit feedback |

---

## Troubleshooting

| Issue | Fix |
|---|---|
| Health check `db: disconnected` | `DATABASE_URL` password is wrong. Reset it in Supabase. |
| Login returns 401 | Staff account not created in `staff_users`, or wrong hash. |
| CORS errors on frontend | Add your Pages URL to `CLIENT_URL` in Render. |
| Frontend shows demo data | `VITE_API_URL` not set on Cloudflare Pages, or backend down. |
| `GET /api/appointments` 403 | Ensure staff role is `RECEPTIONIST`, `DOCTOR`, or admin. |
