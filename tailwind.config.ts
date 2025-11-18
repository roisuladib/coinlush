import type { Config } from 'tailwindcss';

import { heroui } from '@heroui/theme';

const config: Config = {
  content: ['./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'],
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
  plugins: [heroui()],
};

export default config;
