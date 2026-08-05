import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import { query } from '../db.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Create a JWT for a user
function signToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
      fullName: user.full_name,
    },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );
}

/**
 * POST /api/auth/login
 * Body: { email, password }
 *
 * Two auth paths are supported:
 *  1. Supabase auth users with a linked profile in `public.profiles`
 *     (email + password are checked against Supabase Auth's `auth.users`,
 *     using the encrypted_password stored there via Postgres `crypt`).
 *  2. Staff credentials stored in `public.staff_users` (bcrypt hashed),
 *     with a matching role.
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const normalizedEmail = String(email).trim().toLowerCase();

  try {
    // --- Path 1: Supabase auth.users + profiles ---
    const supabaseUser = await query(
      `SELECT id, email, encrypted_password, raw_app_meta_data
         FROM auth.users
        WHERE LOWER(email) = $1
        LIMIT 1`,
      [normalizedEmail]
    );

    if (supabaseUser.rows.length > 0) {
      const authUser = supabaseUser.rows[0];

      // Verify password using Supabase's stored crypt format (bcrypt-based)
      const passwordValid = await bcrypt.compare(password, authUser.encrypted_password);
      if (!passwordValid) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      // Fetch role from profiles
      const profile = await query(
        `SELECT id, full_name, email, role, phone
           FROM public.profiles
          WHERE id = $1
          LIMIT 1`,
        [authUser.id]
      );

      if (profile.rows.length === 0) {
        return res.status(403).json({ error: 'No profile found for this account. Contact the administrator.' });
      }

      const user = {
        id: profile.rows[0].id,
        email: profile.rows[0].email,
        full_name: profile.rows[0].full_name,
        role: profile.rows[0].role,
        phone: profile.rows[0].phone,
      };

      return res.json({
        token: signToken(user),
        user: {
          id: user.id,
          email: user.email,
          fullName: user.full_name,
          role: user.role,
          phone: user.phone,
        },
      });
    }

    // --- Path 2: staff_users table (bcrypt-hashed credentials) ---
    const staffResult = await query(
      `SELECT id, email, full_name, password_hash, role, is_active
         FROM public.staff_users
        WHERE LOWER(email) = $1
        LIMIT 1`,
      [normalizedEmail]
    );

    if (staffResult.rows.length > 0) {
      const staff = staffResult.rows[0];

      if (!staff.is_active) {
        return res.status(403).json({ error: 'This staff account is disabled.' });
      }

      const passwordValid = await bcrypt.compare(password, staff.password_hash);
      if (!passwordValid) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      const user = {
        id: staff.id,
        email: staff.email,
        full_name: staff.full_name,
        role: staff.role,
        phone: staff.phone || null,
      };

      return res.json({
        token: signToken(user),
        user: {
          id: user.id,
          email: user.email,
          fullName: user.full_name,
          role: user.role,
          phone: user.phone,
        },
      });
    }

    return res.status(401).json({ error: 'Invalid email or password.' });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Login failed. Please try again later.' });
  }
});

/**
 * GET /api/auth/profile
 * Returns the authenticated user's profile + role.
 */
router.get('/profile', authenticate, async (req, res) => {
  try {
    const profile = await query(
      `SELECT p.id, p.full_name, p.email, p.phone, p.role
         FROM public.profiles p
        WHERE p.id = $1
        LIMIT 1`,
      [req.user.userId]
    );

    if (profile.rows.length === 0) {
      // fall back to staff_users
      const staff = await query(
        `SELECT id, full_name, email, phone, role FROM public.staff_users WHERE id = $1 LIMIT 1`,
        [req.user.userId]
      );
      if (staff.rows.length === 0) {
        return res.status(404).json({ error: 'Profile not found.' });
      }
      const s = staff.rows[0];
      return res.json({
        id: s.id,
        fullName: s.full_name,
        email: s.email,
        phone: s.phone,
        role: s.role,
      });
    }

    const p = profile.rows[0];
    return res.json({
      id: p.id,
      fullName: p.full_name,
      email: p.email,
      phone: p.phone,
      role: p.role,
    });
  } catch (err) {
    console.error('Profile error:', err);
    return res.status(500).json({ error: 'Could not load profile.' });
  }
});

export default router;
