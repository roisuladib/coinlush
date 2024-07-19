import { Market } from '@/types';
import { buildQueryString } from '@/utils';

export const timePeriods = ['1h', '3h', '12h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'] as const;
export const tags = [
   'defi',
   'stablecoin',
   'nft',
   'dex',
   'exchange',
   'staking',
   'dao',
   'meme',
   'privacy',
   'metaverse',
   'gaming',
   'wrapped',
   'layer-1',
   'layer-2',
   'fan-token',
   'football-club',
   'web3',
   'social',
] as const;
export const rankings = ['price', 'marketCap', '24hVolume', 'change', 'listedAt'] as const;

export type QueryCoin = {
   /**
    * UUID of reference currency, in which all the prices are calculated.
    * This includes the price, the change and the sparkline. Defaults to US Dollar
    * @default 'yhjMzLPhuIDl'
    * @example '...coins?referenceCurrencyUuid=Qwsogvtv82FCd'
    */
   referenceCurrencyUuid?: string;
   /**
    * By setting the timePeriod the change percentage and sparkline in the response will be calculated accordingly.
    * @default '24h'
    * @example '...coins?timePeriod=7d'
    */
   timePeriod?: (typeof timePeriods)[number];
   /**
    * Symbols to filter the list on. Do note that symbols are not unique.
    * Should you need a specific coin, then you should use the uuids filter.
    * @example '...coins?symbols[]=BTC&symbols[]=ETH&symbols[]=XRP'
    */
   symbols?: Array<string>;
   /**
    * Contract Addresses to filter the list on.
    * These are the addresses currencies get on their respective blockchains.
    * Smart Contract Addresses are a common name for addresses on blockchains, but some chains might call them AssetID,
    * Token Address or something else. We use the term Contract Address to cover all these cases.
    * Note that tokens might be issued on several blockchains, so the same token might have several addresses
    * @example '...coins?contractAddresses[]=0xdac...&contractAddresses[]=0xa0...'
    */
   contractAddresses?: Array<string>;
   /**
    * Blockchains to filter the list on.
    * With this filter you can for example fetch only coins that are minted on the Ethereum blockchain.
    * You can filter on multiple blockchains at once.
    * @example '...coins?blockchains[]=ethereum&blockchain[]=eos'
    */
   blockchains?: Array<string>;
   /**
    * UUIDs to filter the list on.
    * If you know the UUIDs of the coins you want to fetch, you can use this filter to get the specific coins.
    * @example '...coins?uuids[]=razxDUgYGNAdQ&uuids[]=Qwsogvtv82FCd'
    */
   uuids?: Array<string>;
   /**
    * We separate coins into three tiers.
    * With this parameter you can filter coins on the tiers you need.
    * Read more about out our tiers in our [methodology](https://support.coinranking.com/article/56-what-is-our-ranking-methodology).
    * Tier values:
    * - 1
    * - 2
    * - 3
    * @example '...coins?tiers[]=1&tiers[]=2'
    */
   tiers?: Array<number>;
   /**
    * Tags to filter the list on.
    * Allowed values:
    * - defi
    * - stablecoin
    * - nft
    * - dex
    * - exchange
    * - staking
    * - dao
    * - meme
    * - privacy
    * - metaverse
    * - gaming
    * - wrapped
    * - layer-1
    * - layer-2
    * - fan-token
    * - football-club
    * - web3
    * - social
    * @example '...coins?tags[]=defi'
    */
   tags?: Array<(typeof tags)[number]>;
   /**
    * Index to order by. All sortings excluding listedAt still take our different tiers of coins into account,
    * read more about it in our [methodology](https://support.coinranking.com/article/56-what-is-our-ranking-methodology).
    * @default 'marketCap'
    * Allowed values:
    * - price
    * - marketCap
    * - 24hVolume
    * - change
    * - listedAt
    * @example '...coins?orderBy=price'
    */
   orderBy?: (typeof rankings)[number];
   /**
    * Filter the results by searching for coin names or symbols.
    * @example '...coins?search=bitcoin'
    */
   search?: string;
   /**
    * A scope can be used to make a subset of the coin list.
    * To be used in combination with scopeLimit.
    * The scopeId defines a subset, while the scopeLimit defines the size of the subset.
    * Subsequently, any orderBy and orderDirection you choose is applied on the subset.
    * This can be used if you want to sort a subset of coins, while the set itself is ordered by market cap or volume.
    * We use it to make our 'Best Performers' list on Coinranking, where we show the coins that increased the most out of the top 200 highest ranked coins.
    * @default 'marketCap'
    * Allowed values:
    * - marketCap
    * - 24hVolume
    * @example '...coins?scopeId=24hVolume&scopeLimit=100'
    */
   scopeId?: 'marketCap' | '24hVolume';
   /**
    * The scopeLimit defines the size of a scoped subset of coins.
    * To be used in combination with scopeId. For more explanation, see scopeId.
    * @default 100
    * @example '...coins?scopeId=24hVolume&scopeLimit=100'
    */
   scopeLimit?: number;
   /**
    * Applies direction to the orderBy query, which can be in ascending or descending order.
    * @default 'desc'
    * Allowed values:
    * - asc
    * - desc
    * @example '...coins?orderDirection=asc'
    */
   orderDirection?: 'asc' | 'desc';
   /**
    * Limit. Used for pagination.
    * The maximum amount of results you can fetch in one request is 5000 for the Startup and Professional plan, and 100 for the Free plan.
    * @default 50
    * Size range: 0-5000
    * @example '...coins?limit=10'
    */
   limit?: number;
   /**
    * Offset. Used for pagination.
    * @default 0
    * @example '...coins?offset=50'
    */
   offset?: number;
   /**
    * Filter the results by a minimum 24h volume.
    * @example '...coins?minVolume=5000'
    */
   minVolume?: number;
};

export async function fetchCoins(query?: QueryCoin) {
   const res = await fetch(`/api/coins?${buildQueryString(query)}`);
   const data = await res.json();

   return data as Market;
}
