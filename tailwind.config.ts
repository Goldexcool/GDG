import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        text: {
          primary: '#2A2A2A',
          secondary: '#2B2B2B',
        },
        brand: {
          green: '#285E67',
        }
      },
      maxWidth: {
        '1200': '1200px',
        '1300': '1300px',
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          '2xl': '1300px',
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
