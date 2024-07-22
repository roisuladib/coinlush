'use client';

import { useEffect } from 'react';

import { GOOGLE_ADS_PUB } from '@/env';

export type AdBannerProps = {
   dataAdSlot: string;
   dataAdFormat: string;
   dataFullWidthResponsive: boolean;
};

export function AdBanner() {
   useEffect(() => {
      try {
         ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (error: any) {
         console.log('adsbygoogle =>', error.message);
      }
   }, []);

   return (
      <ins
         className="adsbygoogle"
         style={{ display: 'block' }}
         data-ad-client={`ca-pub-${GOOGLE_ADS_PUB}`}
         data-ad-slot="8780783500"
         data-ad-format="auto"
         data-full-width-responsive="true"
      />
   );
}
