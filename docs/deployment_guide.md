# 🚀 Astygma Hope Clinic — Full Deployment Guide

This guide walks you through deploying:
1. **Supabase database** (migrations + seed)
2. **GitHub** repository hosting
3. **Cloudflare Pages** (frontend)

---

## Part 1: Supabase Database Deployment

### Step 1.1 — Install Supabase CLI

**Option A: npm (recommended, cross-platform)**
```bash
npm install -g supabase
```

**Option B: Windows (Scoop)**
```bash
scoop install supabase
```

**Option C: Windows (direct binary)**
Download from https://github.com/supabase/cli/releases and add `supabase.exe` to your PATH.

Verify installation:
```bash
supabase --version
```

### Step 1.2 — Login to Supabase
```bash
supabase login
```
This opens a browser to authenticate. Use your Supabase account.

### Step 1.3 — Link the project
```bash
supabase link --project-ref gcqawwsopkbsednwzgph
```
> You'll be prompted for your database password. The access token is stored securely.

### Step 1.4 — Create & push migrations

The migration file `supabase/migrations/0001_init.sql` already exists. To push it:
```bash
# Push the existing migration to the remote database
supabase db push

# Or create a new migration to apply changes incrementally
supabase migration new new-migration
```

> **⚠️ Important — Database password**: The connection string you provided
> (`postgresql://postgres:astygma2026@...`) was **rejected** by Supabase
> (`password authentication failed for user "postgres"`). This means the
> password `astygma2026` is not the current database password.
>
> **To fix**: In Supabase Dashboard → **Project Settings → Database → Reset database password**
> (or use the password set at project creation). Then update the connection string.

### Step 1.4b — Deploy via the included script (nodependency on Supabase CLI)

A Node.js deployment script is included: `scripts/deploy-db.cjs`. It applies the
migration + seed automatically using the `pg` driver (already installed), so you
don't need the Supabase CLI at all for this step.

```powershell
# Set the correct connection string (with your actual DB password)
$env:SUPABASE_DB_URL="postgresql://postgres:YOUR_CORRECT_PASSWORD@db.gcqawwsopkbsednwzgph.supabase.co:5432/postgres"

# Run the deployment
node scripts/deploy-db.cjs
```

The script:
1. Connects to Supabase PostgreSQL (SSL).
2. Applies `supabase/migrations/0001_init.sql` (schema + RLS).
3. Applies `supabase/seed.sql` (initial data).

> The password is read from the `SUPABASE_DB_URL` environment variable — it is
> **never hardcoded** and never committed to git.

### Step 1.5 — Seed the database
After pushing migrations, run the seed script:
```bash
supabase db execute --file supabase/seed.sql
```
> This inserts initial doctors, services, testimonials, gallery, blog posts, sound tracks, courses, FAQs, and settings.

### Step 1.6 — Configure Authentication (Auth)
1. Go to **Supabase Dashboard → Authentication → Providers**
2. Enable **Email** provider (default is enabled)
3. Create staff users in **Authentication → Users → Add user**
4. Set their role in the `profiles` table (via SQL Editor):
```sql
-- Add a profile for a staff user (replace IDs)
INSERT INTO public.profiles (id, role, name)
VALUES 
  ('<USER_ID_FROM_AUTH>', 'SUPER_ADMIN', 'Admin'),
  ('<USER_ID_FROM_AUTH>', 'RECEPTIONIST', 'Reception Staff');
```

### Step 1.7 — Configure Storage (for images/media)
1. In Supabase Dashboard → **Storage → New bucket**
2. Create bucket `clinic-media` (public) for doctor photos, gallery, blog images
3. Create bucket `private-media` (private) for sound vault audio
4. Set bucket policies matching the RLS policies in the migration

---

## Part 2: GitHub Repository Deployment

### Step 2.1 — Initialize Git
```bash
cd "e:/astygma hope web"
git init
git add .
git commit -m "Initial commit: Astygma Hope Clinic with Supabase integration"
```

### Step 2.2 — Create GitHub repo & push
```bash
# Create a new repo on GitHub (web UI or gh CLI)
gh repo create astygma-hope-clinic --public --source=. --push

# Or manually:
# 1. Create empty repo at github.com/new
# 2. Add remote & push:
git remote add origin https://github.com/YOUR_USERNAME/astygma-hope-clinic.git
git branch -M main
git push -u origin main
```

> **Important**: `.env` is in `.gitignore`, so `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are **NOT** committed. You'll set them as environment variables in Cloudflare.

---

## Part 3: Cloudflare Pages Deployment (Frontend)

### Step 3.1 — Prepare Cloudflare Pages
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. **Workers & Pages → Create → Pages → Connect to Git**
3. Select your GitHub repo `astygma-hope-clinic`

### Step 3.2 — Configure Build Settings
| Setting | Value |
|---|---|
| **Framework preset** | Vite |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` |

### Step 3.3 — Add Environment Variables
In Cloudflare Pages → **Settings → Environment variables**:

| Variable | Value |
|---|---|
| `VITE_SUPABASE_URL` | `https://gcqawwsopkbsednwzgph.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `sb_publishable_WI6pxf_YpCF7GD-DWZDOIw_eyOmeibI` |

> **Security note**: The anon key is safe to expose (it's the publishable key). Never add the `service_role` key here.

### Step 3.4 — Configure CORS for Supabase
In Supabase Dashboard → **Project Settings → API → Auth**:
- Add your Cloudflare Pages URL (e.g., `https://astygma-hope-clinic.pages.dev`) to **Allowed Redirect URLs** and **Site URL**.

### Step 3.5 — Deploy
1. Click **Save and Deploy**
2. Cloudflare automatically builds and deploys on every push to `main`
3. Your site will be live at `https://<your-project>.pages.dev`

### Step 3.6 — Custom Domain (Optional)
1. In Cloudflare Pages → **Custom domains → Set up a custom domain**
2. Add your domain (e.g., `astygmahope.com`)
3. Follow DNS setup instructions

---

## Security Checklist
- ✅ Only `anon` key used in frontend — never `service_role`
- ✅ RLS enabled on all tables
- ✅ `.env` excluded from git
- ✅ Environment variables set in Cloudflare, not in source
- ✅ HTTPS enforced by Cloudflare automatically

---

## Troubleshooting

| Issue | Fix |
|---|---|
| `supabase: command not found` | Install CLI via npm `npm install -g supabase`, or add to PATH |
| `db push` fails | Ensure you ran `supabase login` and `supabase link` first |
| Build fails on Cloudflare | Check `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` are set in Cloudflare env vars |
| RLS blocks inserts | Verify the `anon` role has INSERT policy on the relevant table |
| Auth login fails | Ensure users exist in Auth & have profiles with correct roles |
