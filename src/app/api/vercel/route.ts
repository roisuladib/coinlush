import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import { geolocation } from '@vercel/functions';

export async function GET(request: NextRequest) {
  return NextResponse.json(geolocation(request));
}
