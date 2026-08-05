// =============================================================================
// API Client — talks to the Render-hosted backend (Express API)
// =============================================================================

// Base URL of the backend deployed on Render.
// In dev, point this at your local server (http://localhost:3000).
// In production (Cloudflare Pages), set this as a build-time env var:
//   VITE_API_URL=https://your-backend.onrender.com
export const API_BASE_URL: string =
  (import.meta.env.VITE_API_URL as string | undefined) || 'http://localhost:3000';

// Attach the JWT token from localStorage on every request.
export function getToken(): string | null {
  return localStorage.getItem('ahc_token');
}

export function setToken(token: string | null): void {
  if (token) localStorage.setItem('ahc_token', token);
  else localStorage.removeItem('ahc_token');
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  body?: unknown;
  auth?: boolean;
}

// Core fetch wrapper with JSON handling + auth header.
export async function api<T = unknown>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = 'GET', body, auth = false } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

const res = await fetch(`${API_BASE_URL}/api${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const data = await res.json();
      if (data?.error) message = data.error;
    } catch {
      // ignore non-JSON error bodies
    }
    throw new Error(message);
  }

  return res.json() as Promise<T>;
}
