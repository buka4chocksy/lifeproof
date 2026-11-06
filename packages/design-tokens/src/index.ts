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
  // Semantic status colors (added T-007). Chosen for WCAG 2.2 AA contrast:
  // `danger` >= 4.5:1 on `paper`, `white`, and `dangerSoft`.
  danger: '#9c3d34',
  dangerSoft: '#f4e3e0',
  // Control border/divider with >= 3:1 non-text contrast on `paper`/`white`
  // (WCAG 1.4.11). `line` is decorative only and must not be the sole boundary
  // of an interactive control.
  lineStrong: '#7d857d',
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

/**
 * Elevation. `soft` mirrors the existing `shadow-soft` Tailwind utility so the
 * token is the single source of truth (added T-007).
 */
export const shadows = {
  soft: '0 24px 60px -32px rgba(24, 36, 32, 0.28)',
} as const;

/**
 * Brand externalization (D-P0-02). `name` is an empty PLACEHOLDER until the
 * rebrand decision is finalized at M5. Public-facing copy MUST interpolate
 * `brand.name` and MUST NOT hardcode a brand string. The internal working name
 * is not a public value.
 */
export const brand = {
  name: '',
} as const;

export const tokens = { colors, space, radii, typography, motion, shadows, brand } as const;

export type Tokens = typeof tokens;
