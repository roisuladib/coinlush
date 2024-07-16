import { COIN_RANKING_API_HOST, COIN_RANKING_API_KEY, COIN_RANKING_API_URL } from '@/env';
import { MarketDetail } from '@/types';

export async function fetchMarketDetail(
   id: string,
   timePeriode: '3h' | '24h' | '7d' | '30d' | '3m' | '1y' | '3y' | '5y' = '24h',
   referenceCurrencyUuid = 'ETQIOVR_rqox',
) {
   const res = await fetch(
      `${COIN_RANKING_API_URL}/coin/${id}?referenceCurrencyUuid=${referenceCurrencyUuid}&timePeriod=${timePeriode}`,
      {
         headers: {
            'x-rapidapi-key': COIN_RANKING_API_KEY,
            'x-rapidapi-host': COIN_RANKING_API_HOST,
         },
      },
   );
   const data = await res.json();

   return data as MarketDetail;
}
