import { shadows } from '@lifeproof/design-tokens';
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
        // Control borders only; `line` is decorative and fails 1.4.11 (design §9.9).
        'line-strong': 'var(--line-strong)',
        danger: 'var(--danger)',
        'danger-soft': 'var(--danger-soft)',
        // `colors.white` is the surface token; `cream` is the deprecated alias.
        white: 'var(--white)',
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
        // Sourced from the design token so elevation has a single source of truth.
        soft: shadows.soft,
      },
    },
  },
  plugins: [],
};

export default config;
