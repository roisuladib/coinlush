import { NextResponse } from 'next/server';

import ky from 'ky';

import { COIN_RANKING_API_URL } from '@/env';

export async function request(pathname: string) {
   const res = await ky(`${COIN_RANKING_API_URL}${pathname}`).json();
   // const res = await fetch(`${COIN_RANKING_API_URL}${pathname}`);
   // const data = await res.json();

   // if (!res.ok) {
   //    return NextResponse.json(data, res);
   // }

   return NextResponse.json(res);
}
