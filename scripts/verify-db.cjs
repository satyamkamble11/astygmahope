/**
 * Verify the Supabase database state for Astygma Hope Clinic.
 * Usage:
 *   $env:SUPABASE_DB_URL="postgresql://postgres:PASSWORD@db.gcqawwsopkbsednwzgph.supabase.co:5432/postgres"
 *   node scripts/verify-db.cjs
 */

const { Client } = require('pg');

const DB_URL = process.env.SUPABASE_DB_URL;
if (!DB_URL) {
  console.error('❌ Please set SUPABASE_DB_URL environment variable.');
  process.exit(1);
}

const TABLES = [
  'profiles', 'appointments', 'contact_messages', 'feedback',
  'doctors', 'services', 'testimonials', 'gallery_items',
  'blog_posts', 'sound_tracks', 'courses', 'faqs', 'settings',
];

async function main() {
  const client = new Client({ connectionString: DB_URL, ssl: { rejectUnauthorized: false } });
  try {
    await client.connect();
    console.log('✅ Connected. Table row counts:\n');
    for (const table of TABLES) {
      try {
        const res = await client.query(`SELECT COUNT(*)::int AS c FROM public.${table}`);
        console.log(`   ${table.padEnd(18)} → ${res.rows[0].c} rows`);
      } catch (e) {
        console.log(`   ${table.padEnd(18)} → ⚠️ ${e.message}`);
      }
    }
    console.log('\nDone.');
  } catch (err) {
    console.error('❌ Failed:', err.message);
    process.exitCode = 1;
  } finally {
    await client.end().catch(() => {});
  }
}

main();
