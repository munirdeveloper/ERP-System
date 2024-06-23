import { Config } from 'tailwindcss';
import daisyui from 'daisyui';

const config: Config = {
  content: ['./src/**/*.{html,svelte,js,ts}'],
  theme: {
    extend: {}
  },
  plugins: [daisyui]
};

export default config;
