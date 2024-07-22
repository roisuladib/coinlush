import Script from 'next/script';

import { GOOGLE_ADS_PUB } from '@/env';

export function Adsense() {
   return (
      <Script
         async
         src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${GOOGLE_ADS_PUB}`}
         crossOrigin="anonymous"
         strategy="afterInteractive"
      />
   );
}
