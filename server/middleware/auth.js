import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import { query } from '../db.js';

// Verify JWT and attach { userId, role, email, fullName } to req.user
export async function authenticate(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Authentication required. Please log in.' });
  }

  try {
    const payload = jwt.verify(token, config.jwtSecret);
    req.user = {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
      fullName: payload.fullName,
    };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired session. Please log in again.' });
  }
}

// Role guard factory. Usage: requireRole('SUPER_ADMIN', 'CLINIC_ADMIN')
export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required.' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'You do not have permission to perform this action.' });
    }
    next();
  };
}

// Admin guard (SUPER_ADMIN or CLINIC_ADMIN)
export const requireAdmin = requireRole('SUPER_ADMIN', 'CLINIC_ADMIN');

// Optional auth: attach user if a valid token is present, but don't block.
export async function optionalAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return next();

  try {
    const payload = jwt.verify(token, config.jwtSecret);
    req.user = {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
      fullName: payload.fullName,
    };
  } catch (err) {
    // ignore invalid token, just treat as unauthenticated
  }
  next();
}

// Helper to fetch a staff user's role from profiles table (used at login).
export async function findStaffProfile(userId) {
  const { rows } = await query(
    `SELECT id, full_name, email, role FROM public.profiles WHERE id = $1`,
    [userId]
  );
  return rows[0] || null;
}
