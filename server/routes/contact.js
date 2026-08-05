import { Router } from 'express';
import { query } from '../db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = Router();

/**
 * POST /api/contact-messages
 * Public — submit a contact form.
 * Body: { name, phone, email?, message }
 */
router.post('/contact-messages', async (req, res) => {
  const { name, phone, email, message } = req.body || {};

  if (!name || !phone || !message) {
    return res.status(400).json({ error: 'Name, phone and message are required.' });
  }

  try {
    const { rows } = await query(
      `INSERT INTO public.contact_messages (name, phone, email, message, is_read)
       VALUES ($1, $2, $3, $4, FALSE)
       RETURNING id, name, phone, email, message, is_read, created_at`,
      [name, phone, email || null, message]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('contact message error:', err);
    res.status(500).json({ error: 'Failed to submit message.' });
  }
});

/**
 * POST /api/feedback
 * Public — submit feedback.
 * Body: { name, rating, text }
 */
router.post('/feedback', async (req, res) => {
  const { name, rating, text } = req.body || {};

  if (!name || !rating || !text) {
    return res.status(400).json({ error: 'Name, rating and text are required.' });
  }

  try {
    const { rows } = await query(
      `INSERT INTO public.feedback (name, rating, text, is_approved)
       VALUES ($1, $2, $3, TRUE)
       RETURNING id, name, rating, text, is_approved, created_at`,
      [name, rating, text]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('feedback error:', err);
    res.status(500).json({ error: 'Failed to submit feedback.' });
  }
});

/**
 * GET /api/contact-messages
 * Auth: admin only.
 */
router.get('/contact-messages', authenticate, requireAdmin, async (req, res) => {
  try {
    const { rows } = await query(
      `SELECT id, name, phone, email, message, is_read, created_at
         FROM public.contact_messages
        ORDER BY created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error('fetch contact messages error:', err);
    res.status(500).json({ error: 'Failed to load messages.' });
  }
});

/**
 * PATCH /api/contact-messages/:id/read
 * Auth: admin only.
 */
router.patch('/contact-messages/:id/read', authenticate, requireAdmin, async (req, res) => {
  try {
    const { rows } = await query(
      `UPDATE public.contact_messages SET is_read = TRUE, updated_at = NOW()
        WHERE id = $1 RETURNING id, is_read`,
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Message not found.' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('mark read error:', err);
    res.status(500).json({ error: 'Failed to update message.' });
  }
});

export default router;
