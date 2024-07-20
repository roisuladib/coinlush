'use client';

import { useEffect } from 'react';

import { GOOGLE_ADS_PUB } from '@/env';

type Props = {
   dataAdSlot: string;
   dataAdFormat: string;
   dataFullWidthResponsive: boolean;
};

export function AdBanner({ dataAdSlot, dataAdFormat, dataFullWidthResponsive }: Props) {
   useEffect(() => {
      try {
         ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (error: any) {
         console.log(error.message);
      }
   }, []);

   return (
      <ins
         className="adsbygoogle"
         style={{ display: 'block' }}
         data-ad-client={`ca-pub-${GOOGLE_ADS_PUB}`}
         data-ad-slot={dataAdSlot}
         data-ad-format={dataAdFormat}
         data-full-width-responsive={dataFullWidthResponsive.toString()}
      />
   );
}
