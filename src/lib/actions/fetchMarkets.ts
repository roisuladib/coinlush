import { Market } from '@/types';

export async function fetchMarkets(
   page: number,
   rowsPerPage = 20,
   referenceCurrencyUuid = 'ETQIOVR_rqox',
) {
   const res = await fetch(
      `/api/coins?limit=${rowsPerPage}&offset=${page * rowsPerPage}&referenceCurrencyUuid=${referenceCurrencyUuid}`,
   );
   const data = await res.json();

   return data as Market;
}
