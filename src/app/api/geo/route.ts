import type { NextRequest } from 'next/server';

import { getCurrency } from 'locale-currency';

export async function GET(request: NextRequest) {
  const headers = request.headers;
  const local = headers.get('x-vercel-ip-country') || 'US';
  return Response.json({ countryCode: getCurrency(local) });
}
