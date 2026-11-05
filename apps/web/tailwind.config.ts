import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', '../../packages/ui/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        ink: 'var(--ink)',
        accent: 'var(--accent)',
        'accent-soft': 'var(--accent-soft)',
        highlight: 'var(--highlight)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        cream: 'var(--white)',
      },
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
        display: [
          '"Iowan Old Style"',
          '"Palatino Linotype"',
          'Palatino',
          '"Book Antiqua"',
          'Georgia',
          'serif',
        ],
      },
      boxShadow: {
        soft: '0 24px 60px -32px rgba(24, 36, 32, 0.28)',
      },
    },
  },
  plugins: [],
};

export default config;
