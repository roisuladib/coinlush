import { nextui } from '@nextui-org/theme';

import type { Config } from 'tailwindcss';

const config: Config = {
   content: [
      './src/**/*.{js,ts,jsx,tsx,mdx}',
      './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
   ],
   theme: {
      extend: {
         fontFamily: {
            sans: ['var(--font-geist-sans)'],
            mono: ['var(--font-geist-mono)'],
         },
         spacing: {
            18: '4.5rem',
            19: '4.75rem',
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
