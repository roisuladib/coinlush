import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

const PROD_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null;

const allowedOrigins: string[] = [];

if (process.env.NODE_ENV === 'production' && PROD_URL) {
  allowedOrigins.push(PROD_URL);
}

export default function proxy(request: NextRequest) {
  const origin = request.headers.get('origin') ?? '';
  const isAllowed = allowedOrigins.includes(origin);

  const locale = request.headers.get('x-vercel-ip-country') || 'US';

  // Preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': isAllowed ? origin : '',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Access-Token',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  // Normal response
  const response = NextResponse.next();

  response.headers.set('x-locale', locale);

  if (isAllowed) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }

  return response;
}
