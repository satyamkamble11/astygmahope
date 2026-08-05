import { Router } from 'express';
import { query } from '../db.js';
import { authenticate, requireRole, requireAdmin } from '../middleware/auth.js';

const router = Router();

// Staff roles that may view appointments
const STAFF_ROLES = ['RECEPTIONIST', 'DOCTOR', 'CLINIC_ADMIN', 'SUPER_ADMIN', 'LAB_STAFF'];

/**
 * POST /api/appointments
 * Public — create a new appointment request.
 * Body: { patientName, patientPhone, patientCity, patientEmail?, doctorName?,
 *         serviceName?, branch, preferredDate, preferredTime, paymentMode?,
 *         consultationFee?, notes?, senderMobile?, utrId? }
 */
router.post('/', async (req, res) => {
  const {
    patientName,
    patientPhone,
    patientCity,
    patientEmail,
    doctorName,
    serviceName,
    branch,
    preferredDate,
    preferredTime,
    paymentMode = 'OFFLINE',
    consultationFee = 500,
    notes,
    senderMobile,
    utrId,
  } = req.body || {};

  // Basic validation
  if (!patientName || !patientPhone || !patientCity || !branch || !preferredDate || !preferredTime) {
    return res.status(400).json({ error: 'Missing required appointment fields.' });
  }

  try {
    const { rows } = await query(
      `INSERT INTO public.appointments
        (patient_name, patient_phone, patient_city, patient_email, doctor_name, service_name,
         branch, preferred_date, preferred_time, payment_mode, consultation_fee, notes, sender_mobile, utr_id, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, 'PENDING')
       RETURNING *`,
      [
        patientName, patientPhone, patientCity,
        patientEmail || null, doctorName || null, serviceName || null,
        branch, preferredDate, preferredTime,
        paymentMode, consultationFee, notes || null, senderMobile || null, utrId || null,
      ]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('create appointment error:', err);
    res.status(500).json({ error: 'Failed to create appointment.' });
  }
});

/**
 * GET /api/appointments
 * Auth required: RECEPTIONIST, DOCTOR, CLINIC_ADMIN, SUPER_ADMIN
 */
router.get('/', authenticate, (req, res, next) => {
  if (!STAFF_ROLES.includes(req.user.role)) {
    return res.status(403).json({ error: 'You do not have permission to view appointments.' });
  }
  next();
}, async (req, res) => {
  try {
    const { status } = req.query;
    if (status) {
      const { rows } = await query(
        `SELECT * FROM public.appointments WHERE status = $1 ORDER BY created_at DESC`,
        [status]
      );
      return res.json(rows);
    }
    const { rows } = await query(
      `SELECT * FROM public.appointments ORDER BY created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error('fetch appointments error:', err);
    res.status(500).json({ error: 'Failed to load appointments.' });
  }
});

/**
 * PATCH /api/appointments/:id/status
 * Body: { status }
 * Auth: RECEPTIONIST, DOCTOR, CLINIC_ADMIN, SUPER_ADMIN
 */
router.patch(
  '/:id/status',
  authenticate,
  (req, res, next) => {
    if (!STAFF_ROLES.includes(req.user.role)) {
      return res.status(403).json({ error: 'You do not have permission to update appointments.' });
    }
    next();
  },
  async (req, res) => {
    const { status } = req.body || {};
    const { id } = req.params;

    const VALID = ['PENDING', 'APPROVED', 'COMPLETED', 'CANCELLED', 'RESCHEDULED'];
    if (!status || !VALID.includes(status)) {
      return res.status(400).json({ error: `Status must be one of: ${VALID.join(', ')}` });
    }

    try {
      const { rows } = await query(
        `UPDATE public.appointments SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
        [status, id]
      );
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Appointment not found.' });
      }
      res.json(rows[0]);
    } catch (err) {
      console.error('update appointment error:', err);
      res.status(500).json({ error: 'Failed to update appointment.' });
    }
  }
);

/**
 * DELETE /api/appointments/:id
 * Auth: admin only
 */
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const { rows } = await query(
      `DELETE FROM public.appointments WHERE id = $1 RETURNING id`,
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Appointment not found.' });
    }
    res.json({ success: true, id: rows[0].id });
  } catch (err) {
    console.error('delete appointment error:', err);
    res.status(500).json({ error: 'Failed to delete appointment.' });
  }
});

export default router;
