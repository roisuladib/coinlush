'use client';

import { Spinner } from '@nextui-org/spinner';

export default function Loading() {
   return (
      <div className="absolute inset-0 grid size-full place-items-center">
         <Spinner
            size="lg"
            label="Loading..."
            labelColor="primary"
         />
      </div>
   );
}
