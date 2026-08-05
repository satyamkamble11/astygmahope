import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import { pool } from './db.js';

import authRoutes from './routes/auth.js';
import appointmentRoutes from './routes/appointments.js';
import contentRoutes from './routes/content.js';
import contactRoutes from './routes/contact.js';

const app = express();

// Trust Render's proxy so req.ip / secure cookies work correctly
app.set('trust proxy', 1);

// CORS — allow the Cloudflare Pages frontend
app.use(
  cors({
    origin: config.clientUrl.split(',').map((u) => u.trim()),
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check (used by Render)
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', db: 'connected', time: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ status: 'error', db: 'disconnected', error: err.message });
  }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api', contentRoutes);
app.use('/api', contactRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found.' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error.' });
});

app.listen(config.port, () => {
  console.log(`🚀 Astygma Hope Clinic API running on port ${config.port}`);
  console.log(`   CORS allowed origins: ${config.clientUrl}`);
});
