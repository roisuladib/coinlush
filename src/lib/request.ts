import { NextResponse } from 'next/server';

import { COIN_RANKING_API_URL } from '@/env';

export async function request(pathname: string) {
   const res = await fetch(`${COIN_RANKING_API_URL}${pathname}`);
   const data = await res.json();

   if (!res.ok) {
      return NextResponse.json(data, res);
   }

   return NextResponse.json(data);
}
