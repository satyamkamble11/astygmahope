import { Router } from 'express';
import { query } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// ---------------------------------------------------------------------------
// Public content endpoints (read-only)
// ---------------------------------------------------------------------------

// GET /api/doctors
router.get('/doctors', async (req, res) => {
  try {
    const { rows } = await query(
      `SELECT id, name, role, title, experience, qualifications, bio, highlights, image_path, is_founder, display_order
         FROM public.doctors
        WHERE is_active = TRUE
        ORDER BY display_order ASC`
    );
    res.json(rows);
  } catch (err) {
    console.error('doctors error:', err);
    res.status(500).json({ error: 'Failed to load doctors.' });
  }
});

// GET /api/services
router.get('/services', async (req, res) => {
  try {
    const { rows } = await query(
      `SELECT id, slug, title, category, short_desc, full_desc, benefits, icon_name, image_path, display_order
         FROM public.services
        WHERE is_active = TRUE
        ORDER BY display_order ASC`
    );
    res.json(rows);
  } catch (err) {
    console.error('services error:', err);
    res.status(500).json({ error: 'Failed to load services.' });
  }
});

// GET /api/testimonials
router.get('/testimonials', async (req, res) => {
  try {
    const { rows } = await query(
      `SELECT id, name, location, rating, review, service, image_path, display_order
         FROM public.testimonials
        WHERE is_active = TRUE AND is_approved = TRUE
        ORDER BY display_order ASC`
    );
    res.json(rows);
  } catch (err) {
    console.error('testimonials error:', err);
    res.status(500).json({ error: 'Failed to load testimonials.' });
  }
});

// GET /api/gallery
router.get('/gallery', async (req, res) => {
  try {
    const { category } = req.query;
    let sql = `SELECT id, title, category, path, description, is_video, display_order
                 FROM public.gallery_items
                WHERE is_active = TRUE`;
    const params = [];
    if (category) {
      sql += ` AND category = $1`;
      params.push(category);
    }
    sql += ` ORDER BY display_order ASC`;
    const { rows } = await query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error('gallery error:', err);
    res.status(500).json({ error: 'Failed to load gallery.' });
  }
});

// GET /api/blog-posts  (published)
router.get('/blog-posts', async (req, res) => {
  try {
    const { rows } = await query(
      `SELECT id, title, category, content, media_url, media_type, media_list, author, likes, published_at, created_at
         FROM public.blog_posts
        WHERE is_published = TRUE
        ORDER BY published_at DESC NULLS LAST, created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error('blog-posts error:', err);
    res.status(500).json({ error: 'Failed to load posts.' });
  }
});

// GET /api/sound-tracks  (active)
router.get('/sound-tracks', async (req, res) => {
  try {
    const { rows } = await query(
      `SELECT id, title, category, duration, file_path, frequency_hz, description, is_custom_uploaded, is_protected, display_order
         FROM public.sound_tracks
        WHERE is_active = TRUE
        ORDER BY display_order ASC`
    );
    res.json(rows);
  } catch (err) {
    console.error('sound-tracks error:', err);
    res.status(500).json({ error: 'Failed to load sound tracks.' });
  }
});

// GET /api/courses
router.get('/courses', async (req, res) => {
  try {
    const { rows } = await query(
      `SELECT id, title, category, instructor, duration, description, includes, is_paid, price, display_order
         FROM public.courses
        WHERE is_active = TRUE
        ORDER BY display_order ASC`
    );
    res.json(rows);
  } catch (err) {
    console.error('courses error:', err);
    res.status(500).json({ error: 'Failed to load courses.' });
  }
});

// GET /api/faqs
router.get('/faqs', async (req, res) => {
  try {
    const { rows } = await query(
      `SELECT id, question, answer, category, display_order
         FROM public.faqs
        WHERE is_active = TRUE
        ORDER BY display_order ASC`
    );
    res.json(rows);
  } catch (err) {
    console.error('faqs error:', err);
    res.status(500).json({ error: 'Failed to load FAQs.' });
  }
});

// GET /api/settings
router.get('/settings', async (req, res) => {
  try {
    const { rows } = await query(
      `SELECT key, value, updated_at FROM public.settings`
    );
    const settings = {};
    for (const row of rows) {
      settings[row.key] = row.value;
    }
    res.json(settings);
  } catch (err) {
    console.error('settings error:', err);
    res.status(500).json({ error: 'Failed to load settings.' });
  }
});

// ---------------------------------------------------------------------------
// Admin CRUD for CMS content
// ---------------------------------------------------------------------------

// POST /api/cms/posts  (admin)
router.post('/cms/posts', requireAdmin, async (req, res) => {
  const { title, category = 'Blog', content, mediaUrl, mediaType = 'image', mediaList, author } = req.body || {};

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required.' });
  }

  try {
    const { rows } = await query(
      `INSERT INTO public.blog_posts
        (title, category, content, media_url, media_type, media_list, author, is_published, published_at, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, TRUE, NOW(), $8)
       RETURNING *`,
      [title, category, content, mediaUrl || null, mediaType, mediaList || [], author || 'Clinic Admin', req.user.userId]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('create post error:', err);
    res.status(500).json({ error: 'Failed to create post.' });
  }
});

// POST /api/cms/sound-tracks  (admin)
router.post('/cms/sound-tracks', requireAdmin, async (req, res) => {
  const { title, category = 'Meditation', duration = '15:00', filePath, frequencyHz, description, isProtected = true } = req.body || {};

  if (!title || !filePath) {
    return res.status(400).json({ error: 'Title and filePath are required.' });
  }

  try {
    const { rows } = await query(
      `INSERT INTO public.sound_tracks
        (title, category, duration, file_path, frequency_hz, description, is_custom_uploaded, is_protected, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, TRUE, $7, $8)
       RETURNING *`,
      [title, category, duration, filePath, frequencyHz || null, description || null, isProtected, req.user.userId]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('create sound track error:', err);
    res.status(500).json({ error: 'Failed to create sound track.' });
  }
});

export default router;
