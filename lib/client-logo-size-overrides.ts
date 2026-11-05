// Per-logo scale multiplier applied after automatic area-matching.
// 1.0 = benchmark size (FECH). Values > 1 make the logo larger, < 1 smaller.
// Both dimensions scale by this factor; area scales by the square.
const overrides: Record<string, number> = {
  // "sud-and-sud.png": 1.15,
}

export function getLogoScaleOverride(filename: string): number {
  return overrides[filename] ?? 1.0
}
