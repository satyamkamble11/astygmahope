/**
 * Apply ONLY the seed data (seed.sql) to Supabase.
 * Assumes the migration has already been applied.
 *
 * Usage:
 *   $env:SUPABASE_DB_URL="postgresql://postgres:PASSWORD@db.gcqawwsopkbsednwzgph.supabase.co:5432/postgres"
 *   node scripts/run-seed.cjs
 */

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const DB_URL = process.env.SUPABASE_DB_URL;
if (!DB_URL) {
  console.error('❌ Please set SUPABASE_DB_URL environment variable.');
  process.exit(1);
}

const SEED_FILE = path.resolve(__dirname, '..', 'supabase', 'seed.sql');

async function main() {
  const client = new Client({ connectionString: DB_URL, ssl: { rejectUnauthorized: false } });
  try {
    console.log('Connecting to Supabase database...');
    await client.connect();
    console.log('✅ Connected.\n');

    const sql = fs.readFileSync(SEED_FILE, 'utf8');
    console.log('=== Applying seed.sql ===');
    await client.query(sql);
    console.log('✅ Seed data applied successfully.');

    // Quick summary
    const tables = ['doctors', 'services', 'testimonials', 'gallery_items', 'blog_posts', 'sound_tracks', 'courses', 'faqs', 'settings'];
    for (const t of tables) {
      const res = await client.query(`SELECT COUNT(*)::int AS c FROM public.${t}`);
      console.log(`   ${t.padEnd(18)} → ${res.rows[0].c} rows`);
    }
  } catch (err) {
    console.error('\n🚨 Seed failed:', err.message);
    process.exitCode = 1;
  } finally {
    await client.end().catch(() => {});
  }
}

main();

