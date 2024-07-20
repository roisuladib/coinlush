'use client';

import { useEffect } from 'react';

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
         data-ad-client="ca-pub-1341034655058100"
         data-ad-slot={dataAdSlot}
         data-ad-format={dataAdFormat}
         data-full-width-responsive={dataFullWidthResponsive.toString()}></ins>
   );
}
