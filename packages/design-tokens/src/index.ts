/**
 * Design tokens are the source of truth for the product palette.
 * `apps/web/src/app/globals.css` mirrors these values as CSS variables.
 */
export const colors = {
  ink: '#182420',
  paper: '#f7f3ec',
  accent: '#1f6f5c',
  accentSoft: '#dcebe4',
  highlight: '#d9a441',
  muted: '#5f6b65',
  line: '#d9d2c3',
  white: '#fffdf8',
} as const;

export const space = {
  xs: '0.5rem',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
} as const;

export const radii = {
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  full: '9999px',
} as const;

export const typography = {
  body: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  display: '"Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif',
} as const;

export const motion = {
  fast: '120ms',
  base: '180ms',
  slow: '280ms',
  easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
} as const;

export const tokens = { colors, space, radii, typography, motion } as const;

export type Tokens = typeof tokens;
