import { ResponseData } from '@/types';

export async function fetchMarketDetailHistories(
   id: string,
   timePeriode: '3h' | '24h' | '7d' | '30d' | '3m' | '1y' | '3y' | '5y' = '24h',
   referenceCurrencyUuid = 'ETQIOVR_rqox',
) {
   const res = await fetch(
      `/api/coins/${id}/history?referenceCurrencyUuid=${referenceCurrencyUuid}&timePeriod=${timePeriode}`,
   );
   const data = await res.json();

   return data as ResponseData<{ history: { price: string; timestamp: number }[] }>;
}
