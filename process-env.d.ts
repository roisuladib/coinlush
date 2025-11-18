declare namespace NodeJS {
  interface ProcessEnv {
    readonly BASE_URL: string;
    readonly COIN_RANKING_API_URL: string;
    readonly COIN_RANKING_API_KEY: string;
    readonly NEXT_GOOGLE_ADS_PUB: string;
  }
}
