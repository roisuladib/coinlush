import type { SVGProps } from 'react';

export type Children = {
   children: React.ReactNode;
};

export type IconSvgProps = SVGProps<SVGSVGElement> & {
   size?: number;
};

export type ResponseData<T> = {
   status: string;
   data: T;
};

// MARKETS
interface Stats {
   total: number;
   totalCoins: number;
   totalMarkets: number;
   totalExchanges: number;
   totalMarketCap: string;
   total24hVolume: string;
}
interface Coin {
   'uuid': string;
   'symbol': string;
   'name': string;
   'color': string;
   'iconUrl': string;
   'marketCap': string;
   'price': string;
   'listedAt': number;
   'tier': number;
   'change': number;
   'rank': number;
   'sparkline': number[];
   'lowVolume': boolean;
   'coinrankingUrl': string;
   '24hVolume': string;
   'btcPrice': string;
   'contractAddresses': string[];
}
export type Market = ResponseData<{
   stats: Stats;
   coins: Coin[];
}>;
export type MarketDetail = ResponseData<{
   stats: Stats;
   coin: Coin;
}>;
// END MARKETS
