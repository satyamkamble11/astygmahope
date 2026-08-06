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

// CORS — permissive for frontend origins (Cloudflare Pages, Vercel, localhost)
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || config.clientUrl === '*' || config.clientUrl.includes('*')) {
        return callback(null, true);
      }
      const allowed = config.clientUrl.split(',').map((u) => u.trim());
      if (allowed.includes(origin) || origin.endsWith('.pages.dev')) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// Root welcome endpoint (Fixes Render "Endpoint not found" on GET /)
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    name: 'Astygma Hope Clinic Backend API',
    version: '1.0.0',
    health: '/health',
    apiBase: '/api',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      appointments: '/api/appointments',
      doctors: '/api/doctors',
      services: '/api/services',
      testimonials: '/api/testimonials',
      gallery: '/api/gallery',
      blogPosts: '/api/blog-posts',
      soundTracks: '/api/sound-tracks',
      courses: '/api/courses',
      faqs: '/api/faqs',
      settings: '/api/settings',
      contact: '/api/contact-messages',
      feedback: '/api/feedback'
    }
  });
});

// Health check (used by Render)
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', db: 'connected', time: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ status: 'error', db: 'disconnected', error: err.message });
  }
});

// Base API status endpoint
app.get('/api', (req, res) => {
  res.json({
    status: 'online',
    message: 'Astygma Hope Clinic Production API Endpoint Base',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api', contentRoutes);
app.use('/api', contactRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `Endpoint '${req.originalUrl}' not found.` });
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
