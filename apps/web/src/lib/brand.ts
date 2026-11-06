import { brand } from '@lifeproof/design-tokens';

/**
 * Brand externalization (D-P0-02). `brand.name` is an empty placeholder until the
 * M5 rebrand decision, so public copy interpolates these derived labels and never
 * hardcodes a brand string.
 */
const resolvedBrandName = brand.name.trim();

export const brandName = resolvedBrandName;

/** Human-readable site label used in `metadata.title` and the footer. */
export const siteName = resolvedBrandName ? `${resolvedBrandName} Portal` : 'Portal';

/** Accessible name for a link back to the home page. */
export const homeLabel = resolvedBrandName ? `${resolvedBrandName} home` : 'Portal home';

/** The wordmark fallback: the product surface, not a brand string. */
export const wordmark = resolvedBrandName || 'Portal';
