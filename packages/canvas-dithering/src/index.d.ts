/**
 * Canvas Dithering Algorithms - TypeScript Definitions
 */

/** RGB color tuple [red, green, blue] where each value is 0-255 */
export type RGBColor = [number, number, number];

/** Color palette as array of RGB tuples */
export type Palette = RGBColor[];

/** Dithering options */
export interface DitheringOptions {
  /** Optional color palette to constrain colors */
  palette?: Palette;
  /** Bit depth per channel if no palette specified (1-8) */
  bitDepth?: number;
  /** Dithering strength for Bayer method (0-255) */
  strength?: number;
}

/** Supported dithering methods */
export type DitheringMethod = 'floyd-steinberg' | 'atkinson' | 'bayer' | 'none';

/**
 * Floyd-Steinberg error diffusion dithering
 * Classic algorithm with 7/16, 3/16, 5/16, 1/16 error distribution
 *
 * @param imageData - Canvas ImageData to dither
 * @param options - Dithering options
 * @returns Modified ImageData
 */
export function floydSteinberg(
  imageData: ImageData,
  options?: DitheringOptions
): ImageData;

/**
 * Atkinson dithering algorithm
 * Bill Atkinson's 6-tap error diffusion (1/8 each)
 * Creates lighter output than Floyd-Steinberg
 *
 * @param imageData - Canvas ImageData to dither
 * @param options - Dithering options
 * @returns Modified ImageData
 */
export function atkinson(
  imageData: ImageData,
  options?: DitheringOptions
): ImageData;

/**
 * Bayer ordered dithering
 * Uses 4×4 threshold matrix for consistent crosshatch patterns
 *
 * @param imageData - Canvas ImageData to dither
 * @param options - Dithering options
 * @returns Modified ImageData
 */
export function bayer(
  imageData: ImageData,
  options?: DitheringOptions
): ImageData;

/**
 * Apply dithering using specified method
 * Convenience function that routes to the appropriate algorithm
 *
 * @param imageData - Canvas ImageData to dither
 * @param method - Dithering method to use
 * @param options - Dithering options
 * @returns Modified ImageData
 */
export function dither(
  imageData: ImageData,
  method: DitheringMethod,
  options?: DitheringOptions
): ImageData;

/**
 * Find nearest color in palette using Euclidean distance
 *
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @param palette - Array of RGB colors
 * @returns Nearest color from palette
 */
export function findNearestColor(
  r: number,
  g: number,
  b: number,
  palette: Palette
): RGBColor;

/**
 * Quantize color to specified bit depth
 *
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @param bitDepth - Bits per channel (1-8)
 * @returns Quantized color
 */
export function quantizeColor(
  r: number,
  g: number,
  b: number,
  bitDepth: number
): RGBColor;

/** Default export is the dither function */
export default dither;
