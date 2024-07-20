import ky from 'ky';

import { MarketDetail } from '@/types';

export async function fetchMarketDetail(
   id: string,
   timePeriode: '3h' | '24h' | '7d' | '30d' | '3m' | '1y' | '3y' | '5y' = '24h',
   referenceCurrencyUuid = 'ETQIOVR_rqox',
) {
   const res = await ky(
      `/api/coins/${id}?referenceCurrencyUuid=${referenceCurrencyUuid}&timePeriod=${timePeriode}`,
   );
   const data = await res.json();

   return data as MarketDetail;
}
