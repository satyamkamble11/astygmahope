import pg from 'pg';
import { config } from './config.js';

const { Pool } = pg;

if (!config.databaseUrl) {
  console.error('❌ DATABASE_URL is not set. Please configure it in the environment.');
  process.exit(1);
}

export const pool = new Pool({
  connectionString: config.databaseUrl,
  ssl: { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle database client', err);
  process.exit(-1);
});

export const query = (text, params) => pool.query(text, params);
