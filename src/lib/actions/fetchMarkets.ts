import { COIN_RANKING_API_HOST, COIN_RANKING_API_KEY, COIN_RANKING_API_URL } from '@/env';
import { Market } from '@/types';

export async function fetchMarkets(
   page: number,
   rowsPerPage = 20,
   referenceCurrencyUuid = 'ETQIOVR_rqox',
) {
   const res = await fetch(
      `${COIN_RANKING_API_URL}/coins?limit=${rowsPerPage}&offset=${page * rowsPerPage}&referenceCurrencyUuid=${referenceCurrencyUuid}`,
      {
         headers: {
            'x-rapidapi-key': COIN_RANKING_API_KEY,
            'x-rapidapi-host': COIN_RANKING_API_HOST,
         },
      },
   );
   const data = await res.json();

   return data as Market;
}
