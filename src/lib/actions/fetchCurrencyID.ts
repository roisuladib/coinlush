import type { ReferenceCurrency } from '^/types';

import { queryOptions } from '@tanstack/react-query';

import { qs } from '^/utils';

export type QueryReferenceCurrency = {
  /**
   * @example '...reference-currencies?search=USD'
   */
  search?: string;
  /**
   * We separate reference-currencies into three types.
   * With this parameter you can filter coins on the tiers you need.
   * Tier values:
   * - fiat
   * - coin
   * @example '...reference-currencies?types[]=coin&types[]=fiat'
   */
  types?: Array<'fiat' | 'coin'>;
};

export function fetchCurrencyID(query?: QueryReferenceCurrency) {
  const normalizedQuery: QueryReferenceCurrency = {
    types: ['fiat'],
    ...query,
  };

  return queryOptions<ReferenceCurrency>({
    queryKey: ['currency', qs.stringify(normalizedQuery)],
    queryFn: () =>
      fetch(`/api/reference-currencies?${qs.stringify(normalizedQuery)}`).then(res => res.json()),
  });
}
