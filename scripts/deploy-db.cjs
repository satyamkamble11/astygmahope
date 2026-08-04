/**
 * Deploy the Astygma Hope Clinic schema + seed data to Supabase PostgreSQL.
 *
 * Uses the direct database connection string (NOT the anon/service role key).
 * The script reads the migration + seed SQL files and executes them in order.
 *
 * Usage:
 *   node scripts/deploy-db.cjs
 *
 * Connection string (kept out of frontend bundle — this runs server-side only):
 *   postgresql://postgres:astygma2026@db.gcqawwsopkbsednwzgph.supabase.co:5432/postgres
 */

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const DB_URL =
  process.env.SUPABASE_DB_URL ||
  null;

if (!DB_URL) {
  console.error(
    '❌ No database connection string found.\n' +
    'Please set the SUPABASE_DB_URL environment variable, e.g.:\n' +
    '  $env:SUPABASE_DB_URL="postgresql://postgres:YOUR_PASSWORD@db.gcqawwsopkbsednwzgph.supabase.co:5432/postgres"\n' +
    '  node scripts/deploy-db.cjs'
  );
  process.exit(1);
}

const MIGRATION_FILE = path.resolve(__dirname, '..', 'supabase', 'migrations', '0001_init.sql');
const SEED_FILE = path.resolve(__dirname, '..', 'supabase', 'seed.sql');

async function runFile(client, filePath, label) {
  const sql = fs.readFileSync(filePath, 'utf8');
  console.log(`\n=== Applying ${label}: ${path.basename(filePath)} ===`);
  try {
    await client.query(sql);
    console.log(`✅ ${label} applied successfully.`);
  } catch (err) {
    console.error(`❌ ${label} failed:`);
    console.error(err.message);
    throw err;
  }
}

async function main() {
  const client = new Client({
    connectionString: DB_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    console.log('Connecting to Supabase database...');
    await client.connect();
    console.log('✅ Connected successfully.\n');

    await runFile(client, MIGRATION_FILE, 'Migration (0001_init.sql)');
    await runFile(client, SEED_FILE, 'Seed data (seed.sql)');

    console.log('\n🎉 Deployment complete! Schema + seed data applied.');
  } catch (err) {
    console.error('\n🚨 Deployment failed:', err.message);
    process.exitCode = 1;
  } finally {
    await client.end().catch(() => {});
  }
}

main();
