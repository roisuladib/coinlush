import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import { geolocation, getEnv } from '@vercel/functions';

export async function GET(request: NextRequest) {
  const { VERCEL_REGION } = getEnv();
  const details = geolocation(request);

  return NextResponse.json({ region: VERCEL_REGION, geolocation: details });
}
