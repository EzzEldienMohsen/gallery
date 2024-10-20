import { Config } from 'tailwindcss';
import daisyui from 'daisyui';
import typography from '@tailwindcss/typography';

const config: Config = {
  important: true,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui, typography],
  daisyui: {
    themes: ['dracula', 'winter'],
  },
};

export default config;
