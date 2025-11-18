import type { NextRequest } from 'next/server';

import { geolocation } from '@vercel/functions';

export async function GET(request: NextRequest) {
  const details = geolocation(request);
  return Response.json(details)
}
