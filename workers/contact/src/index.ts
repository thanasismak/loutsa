/**
 * Cloudflare Worker — Contact Form Handler
 *
 * Route: POST api.loutsacamping.gr/contact
 *
 * Flow:
 *   1. CORS preflight handled
 *   2. Honeypot field checked (silent 200 for bots)
 *   3. Rate limit per IP via KV (max 5 requests per 10 minutes)
 *   4. Input validated
 *   5. Email sent via Resend API
 */

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

export interface Env {
  RESEND_API_KEY: string;
  RATE_LIMIT_KV: KVNamespace;
}

const ALLOWED_ORIGIN = 'https://www.loutsacamping.gr';
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_SECONDS = 600; // 10 minutes

const corsHeaders = (origin: string) => ({
  'Access-Control-Allow-Origin': isAllowedOrigin(origin) ? origin : ALLOWED_ORIGIN,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
});

function isAllowedOrigin(origin: string): boolean {
  return (
    origin === 'https://www.loutsacamping.gr' ||
    origin === 'https://loutsacamping.gr'
  );
}

function jsonResponse(body: unknown, status: number, origin: string): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(origin),
    },
  });
}

async function checkRateLimit(env: Env, ip: string): Promise<boolean> {
  const key = `rl:${ip}`;
  const current = await env.RATE_LIMIT_KV.get(key);

  if (current === null) {
    await env.RATE_LIMIT_KV.put(key, '1', { expirationTtl: RATE_LIMIT_WINDOW_SECONDS });
    return true; // allowed
  }

  const count = parseInt(current, 10);
  if (count >= RATE_LIMIT_MAX) {
    return false; // blocked
  }

  await env.RATE_LIMIT_KV.put(key, String(count + 1), { expirationTtl: RATE_LIMIT_WINDOW_SECONDS });
  return true; // allowed
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin') ?? '';

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed' }, 405, origin);
    }

    // Parse body
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ error: 'Invalid JSON' }, 400, origin);
    }

    // Honeypot — bots fill the `website` field; silently return 200
    if (body['website']) {
      return jsonResponse({ ok: true }, 200, origin);
    }

    // Validate required fields
    const name    = typeof body['name']    === 'string' ? body['name'].trim()    : '';
    const email   = typeof body['email']   === 'string' ? body['email'].trim()   : '';
    const phone   = typeof body['phone']   === 'string' ? body['phone'].trim()   : '';
    const message = typeof body['message'] === 'string' ? body['message'].trim() : '';

    if (!name || name.length < 2) {
      return jsonResponse({ error: 'Invalid name' }, 400, origin);
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ error: 'Invalid email' }, 400, origin);
    }
    if (!message || message.length < 10) {
      return jsonResponse({ error: 'Message too short' }, 400, origin);
    }

    // Rate limiting by IP
    const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
    const allowed = await checkRateLimit(env, ip);
    if (!allowed) {
      return jsonResponse({ error: 'Too many requests. Please try again later.' }, 429, origin);
    }

    // Send email via Resend
    const emailBody = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      '',
      `Message:`,
      message,
    ]
      .filter((line) => line !== null)
      .join('\n');

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Contact Form <onboarding@resend.dev>',
        to: ['info@loutsacamping.gr'],
        reply_to: email,
        subject: `New contact form message from ${name}`,
        text: emailBody,
      }),
    });

    if (!resendResponse.ok) {
      const errText = await resendResponse.text();
      console.error('[contact-worker] Resend error:', resendResponse.status, errText);
      return jsonResponse({ error: 'Failed to send message. Please try again.' }, 502, origin);
    }

    return jsonResponse({ ok: true }, 200, origin);
  },
};
