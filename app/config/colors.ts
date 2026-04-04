// ─── BRAND COLOR CONSTANTS ───────────────────────────────────────────────────
// For use in JS/canvas contexts where CSS custom properties cannot be used.
// These values MUST match the CSS variables in globals.css :root.
// If you change the brand colors, update both places.

export const brandColors = {
  accent: "#EF6B4D",
  accentLight: "#f08060",
  accentLighter: "#f4a080",

  bgBase: "#050d1a",
  bgSurface: "#070f1e",
  bgCard: "#0a1628",
  bgDeep: "#030912",

  // RGB triplets for canvas rgba() usage
  glowCyan: { r: 0, g: 200, b: 255 },
  glowCyanAlt: { r: 0, g: 180, b: 255 },
  glowAccent: { r: 239, g: 107, b: 77 },
} as const;

/** Produce an rgba() string from an RGB object + alpha */
export function rgba(
  color: { r: number; g: number; b: number },
  alpha: number,
): string {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
}
