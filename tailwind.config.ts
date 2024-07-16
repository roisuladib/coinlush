import { nextui } from '@nextui-org/theme';

import type { Config } from 'tailwindcss';

const config: Config = {
   content: [
      './src/**/*.{js,ts,jsx,tsx,mdx}',
      './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
   ],
   theme: {
      extend: {
         colors: {
            background: 'var(--background)',
            foreground: 'var(--foreground)',
         },
         fontFamily: {
            sans: ['var(--font-geist-sans)'],
            mono: ['var(--font-geist-mono)'],
         },
      },
   },
   darkMode: 'class',
   plugins: [
      nextui({
         prefix: 'roisuladib',
      }),
   ],
};
export default config;
