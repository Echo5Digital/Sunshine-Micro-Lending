import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Simple in-memory rate limiter (use Redis/KV for production multi-instance)
const rateLimitMap = new Map();

function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  const real = request.headers.get('x-real-ip');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (real) {
    return real;
  }
  return 'unknown';
}

function rateLimit(ip, maxRequests = 10, windowMs = 60000) {
  const now = Date.now();
  const windowStart = now - windowMs;

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }

  const requests = rateLimitMap.get(ip).filter((time) => time > windowStart);
  requests.push(now);
  rateLimitMap.set(ip, requests);

  return requests.length <= maxRequests;
}

// Clean up old entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, times] of rateLimitMap.entries()) {
      const valid = times.filter((t) => now - t < 120000);
      if (valid.length === 0) {
        rateLimitMap.delete(ip);
      } else {
        rateLimitMap.set(ip, valid);
      }
    }
  }, 300000);
}

// Edge-runtime-safe JWT verify. Duplicated from lib/auth.js (rather than
// imported) because lib/auth.js is marked 'server-only' and cannot be
// imported into middleware, which runs on the Edge runtime, not Node.
async function verifyAdminSessionEdge(token) {
  try {
    const secret = new TextEncoder().encode(process.env.SESSION_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const ip = getClientIp(request);

  // Rate limit API routes
  if (pathname.startsWith('/api/')) {
    const maxRequests = parseInt(process.env.RATE_LIMIT_MAX || '20');
    const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW || '60000');

    if (!rateLimit(ip, maxRequests, windowMs)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': '60',
            'X-RateLimit-Limit': String(maxRequests),
          },
        }
      );
    }
  }

  // Maintenance mode
  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true') {
    if (!pathname.startsWith('/maintenance') && !pathname.startsWith('/api/health')) {
      return NextResponse.redirect(new URL('/maintenance', request.url));
    }
  }

  // Block common bot patterns on apply page
  if (pathname === '/apply') {
    const userAgent = request.headers.get('user-agent') || '';
    const botPatterns = [
      /curl/i,
      /wget/i,
      /python-requests/i,
      /go-http-client/i,
      /scrapy/i,
      /httpclient/i,
    ];

    if (botPatterns.some((pattern) => pattern.test(userAgent))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }

  // Guard the admin panel — everything under /admin except the login page
  // itself requires a valid session cookie.
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('admin_session')?.value;
    const session = token ? await verifyAdminSessionEdge(token) : null;

    if (!session) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  const response = NextResponse.next();

  // Security headers (supplemental to next.config.mjs)
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
