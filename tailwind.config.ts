import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: { soft: '0 16px 45px rgba(15, 23, 42, 0.08)' },
      colors: { brand: { 50: '#eff6ff', 100: '#dbeafe', 600: '#2563eb', 700: '#1d4ed8', 900: '#0b2a66' } }
    }
  },
  plugins: []
};
export default config;
