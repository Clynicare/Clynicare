/** @type {import('tailwindcss').Config} */

import { transform } from 'next/dist/build/swc/generated-native';

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
             
      fontFamily: {
        
        poppins: ['Poppins'],
        rejoice:['Rejouice-Headline'],
        bebas:['BebasNeue-Regular'],
        sans:['sans']
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
