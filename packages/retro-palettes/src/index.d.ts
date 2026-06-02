/**
 * Retro Gaming Console Color Palettes
 * TypeScript definitions
 */

/** RGB color tuple [red, green, blue] where each value is 0-255 */
export type RGBColor = [number, number, number];

/** Array of RGB colors representing a palette */
export type Palette = RGBColor[];

/** Palette metadata information */
export interface PaletteInfo {
  /** Full name of the console/platform */
  name: string;
  /** Number of colors in the palette */
  colors: number;
  /** Year range when the console was active */
  year: string;
  /** Brief description */
  description: string;
}

/** Nintendo Entertainment System palette (54 colors) */
export const NES: Palette;

/** Game Boy palette (4 shades of green) */
export const GAME_BOY: Palette;

/** Game Boy Color palette (32 colors) */
export const GAME_BOY_COLOR: Palette;

/** PICO-8 fantasy console palette (16 colors) */
export const PICO_8: Palette;

/** Commodore 64 computer palette (16 colors) */
export const COMMODORE_64: Palette;

/** Object containing all available palettes */
export const PALETTES: {
  nes: Palette;
  gameboy: Palette;
  gameboycolor: Palette;
  pico8: Palette;
  commodore64: Palette;
};

/** Metadata for all palettes */
export const PALETTE_INFO: {
  nes: PaletteInfo;
  gameboy: PaletteInfo;
  gameboycolor: PaletteInfo;
  pico8: PaletteInfo;
  commodore64: PaletteInfo;
};

/**
 * Get a list of all available palette names
 * @returns Array of palette identifiers
 */
export function getPaletteNames(): string[];

/**
 * Get a palette by name
 * @param name - Palette identifier (nes, gameboy, pico8, etc.)
 * @returns RGB color array or null if not found
 */
export function getPalette(name: string): Palette | null;

/**
 * Get palette metadata
 * @param name - Palette identifier
 * @returns Palette info object or null if not found
 */
export function getPaletteInfo(name: string): PaletteInfo | null;

/** Default export is PALETTES object */
export default PALETTES;
