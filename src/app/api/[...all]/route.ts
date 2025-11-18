import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import { COIN_RANKING_API_KEY, COIN_RANKING_API_URL } from '^/constants';

export const dynamic = 'auto';

export async function GET(req: NextRequest, ctx: RouteContext<'/api/[...all]'>) {
  try {
    const { all } = await ctx.params;
    const endpoint = all.join('/');
    const searchParams = req.nextUrl.searchParams;
    const queryString = searchParams.toString();

    if (!isValidEndpoint(endpoint)) {
      return NextResponse.json({ error: 'Invalid endpoint' }, { status: 400 });
    }

    const apiUrl = `${COIN_RANKING_API_URL}/${endpoint}${queryString ? `?${queryString}` : ''}`;

    console.log(`[Coinranking API] GET ${endpoint}`);

    const res = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': COIN_RANKING_API_KEY,
      },
      next: {
        revalidate: getCacheTime(endpoint),
        tags: [endpoint.split('/')[0]],
      },
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error(`[Coinranking API Error] ${res.status}: ${errorData}`);

      return NextResponse.json(
        {
          error: 'Failed to fetch from Coinranking API',
          status: res.status,
          statusText: res.statusText,
        },
        { status: res.status },
      );
    }

    const data = await res.json();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': `public, s-maxage=${getCacheTime(endpoint)}, stale-while-revalidate=30`,
      },
    });
  } catch (error) {
    console.error('[Coinranking Route Error]:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

function getCacheTime(endpoint: string): number {
  if (endpoint.includes('stats')) return 300;
  if (endpoint.includes('history')) return 180;
  if (endpoint.includes('reference-currencies')) return 86_400;
  if (endpoint.includes('coins') || endpoint.includes('coin/')) return 60;
  return 60;
}

function isValidEndpoint(endpoint: string): boolean {
  const allowedPrefixes = [
    'coins',
    'coin/',
    'stats',
    'exchanges',
    'exchange/',
    'markets',
    'market/',
    'reference-currencies',
  ];

  return allowedPrefixes.some(prefix => endpoint.startsWith(prefix));
}
