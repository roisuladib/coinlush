import type { NextRequest } from 'next/server';

import { geolocation } from '@vercel/functions';
import { getCurrency } from 'locale-currency';

export async function GET(request: NextRequest) {
  const headers = request.headers;
  const details = geolocation(request);
  return Response.json({ ...details, headers, id: getCurrency(details.country || 'US') });
}
