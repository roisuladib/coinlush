import type { MarketDetail } from '^/types';

export async function fetchMarketDetail(
  id: string,
  timePeriode: '3h' | '24h' | '7d' | '30d' | '3m' | '1y' | '3y' | '5y' = '24h',
  referenceCurrencyUuid = 'yhjMzLPhuIDl',
) {
  const res = await fetch(
    `/api/coin/${id}?referenceCurrencyUuid=${referenceCurrencyUuid}&timePeriod=${timePeriode}`,
  );
  const data = await res.json();

  return data as MarketDetail;
}
