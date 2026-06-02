/**
 * Floyd-Steinberg, Atkinson, and Bayer dithering for Canvas ImageData.
 * All functions modify ImageData in place and also return it.
 * @module canvas-dithering
 */

/**
 * Find the nearest color in a palette using Euclidean distance
 * @param {number} r - Red value (0-255)
 * @param {number} g - Green value (0-255)
 * @param {number} b - Blue value (0-255)
 * @param {Array<[number, number, number]>} palette - Array of RGB color tuples
 * @returns {[number, number, number]} Nearest color from palette
 */
function findNearestColor(r, g, b, palette) {
  if (!palette || palette.length === 0) {
    return [r, g, b];
  }

  let minDistance = Infinity;
  let nearest = palette[0];

  for (const [pr, pg, pb] of palette) {
    const distance = Math.sqrt(
      Math.pow(r - pr, 2) +
      Math.pow(g - pg, 2) +
      Math.pow(b - pb, 2)
    );

    if (distance < minDistance) {
      minDistance = distance;
      nearest = [pr, pg, pb];
    }
  }

  return nearest;
}

/**
 * Quantize a color to a specific bit depth
 * @param {number} r - Red value (0-255)
 * @param {number} g - Green value (0-255)
 * @param {number} b - Blue value (0-255)
 * @param {number} bitDepth - Bits per channel (1-8)
 * @returns {[number, number, number]} Quantized color
 */
function quantizeColor(r, g, b, bitDepth) {
  const levels = Math.pow(2, bitDepth);
  const maxLevel = levels - 1;

  const qr = Math.round(r / 255 * maxLevel) * (255 / maxLevel);
  const qg = Math.round(g / 255 * maxLevel) * (255 / maxLevel);
  const qb = Math.round(b / 255 * maxLevel) * (255 / maxLevel);

  return [qr, qg, qb];
}

/**
 * Floyd-Steinberg error diffusion dithering
 *
 * Classic error diffusion algorithm that distributes quantization errors
 * to neighboring pixels for smooth gradients.
 *
 * Error distribution pattern:
 *        X   7/16
 *   3/16 5/16 1/16
 *
 * @param {ImageData} imageData - Canvas ImageData object
 * @param {Object} options - Dithering options
 * @param {Array<[number, number, number]>} [options.palette] - Optional color palette
 * @param {number} [options.bitDepth=5] - Bit depth if no palette (1-8)
 * @returns {ImageData} Dithered ImageData
 */
function floydSteinberg(imageData, options = {}) {
  const { palette, bitDepth = 5 } = options;
  const width = imageData.width;
  const height = imageData.height;
  const data = new Uint8ClampedArray(imageData.data);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const oldR = data[idx];
      const oldG = data[idx + 1];
      const oldB = data[idx + 2];
      const alpha = data[idx + 3];

      // Skip transparent pixels
      if (alpha === 0) continue;

      // Find new color (from palette or quantized)
      const newColor = palette
        ? findNearestColor(oldR, oldG, oldB, palette)
        : quantizeColor(oldR, oldG, oldB, bitDepth);

      data[idx] = newColor[0];
      data[idx + 1] = newColor[1];
      data[idx + 2] = newColor[2];

      // Calculate quantization error
      const errR = oldR - newColor[0];
      const errG = oldG - newColor[1];
      const errB = oldB - newColor[2];

      // Distribute error to neighboring pixels
      // Right pixel (x+1, y) gets 7/16 of error
      if (x + 1 < width) {
        const i = idx + 4;
        data[i] = Math.max(0, Math.min(255, data[i] + errR * 7/16));
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + errG * 7/16));
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + errB * 7/16));
      }

      if (y + 1 < height) {
        // Bottom-left pixel (x-1, y+1) gets 3/16
        if (x > 0) {
          const i = ((y + 1) * width + (x - 1)) * 4;
          data[i] = Math.max(0, Math.min(255, data[i] + errR * 3/16));
          data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + errG * 3/16));
          data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + errB * 3/16));
        }

        // Bottom pixel (x, y+1) gets 5/16
        const i = ((y + 1) * width + x) * 4;
        data[i] = Math.max(0, Math.min(255, data[i] + errR * 5/16));
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + errG * 5/16));
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + errB * 5/16));

        // Bottom-right pixel (x+1, y+1) gets 1/16
        if (x + 1 < width) {
          const i = ((y + 1) * width + (x + 1)) * 4;
          data[i] = Math.max(0, Math.min(255, data[i] + errR * 1/16));
          data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + errG * 1/16));
          data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + errB * 1/16));
        }
      }
    }
  }

  imageData.data.set(data);
  return imageData;
}

/**
 * Atkinson dithering algorithm
 *
 * Developed by Bill Atkinson for the original Apple Macintosh.
 * Uses 6-tap error diffusion with 1/8 error distribution.
 * Creates a distinctive, lighter look compared to Floyd-Steinberg.
 *
 * Error distribution pattern:
 *        X   1/8 1/8
 *   1/8 1/8 1/8
 *       1/8
 *
 * Note: Only distributes 6/8 of error (intentional for lighter output)
 *
 * @param {ImageData} imageData - Canvas ImageData object
 * @param {Object} options - Dithering options
 * @param {Array<[number, number, number]>} [options.palette] - Optional color palette
 * @param {number} [options.bitDepth=5] - Bit depth if no palette (1-8)
 * @returns {ImageData} Dithered ImageData
 */
function atkinson(imageData, options = {}) {
  const { palette, bitDepth = 5 } = options;
  const width = imageData.width;
  const height = imageData.height;
  const data = new Uint8ClampedArray(imageData.data);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const oldR = data[idx];
      const oldG = data[idx + 1];
      const oldB = data[idx + 2];
      const alpha = data[idx + 3];

      // Skip transparent pixels
      if (alpha === 0) continue;

      // Find new color
      const newColor = palette
        ? findNearestColor(oldR, oldG, oldB, palette)
        : quantizeColor(oldR, oldG, oldB, bitDepth);

      data[idx] = newColor[0];
      data[idx + 1] = newColor[1];
      data[idx + 2] = newColor[2];

      // Calculate error (divided by 8 for Atkinson's distribution)
      const errR = (oldR - newColor[0]) / 8;
      const errG = (oldG - newColor[1]) / 8;
      const errB = (oldB - newColor[2]) / 8;

      // Distribute error using Atkinson's 6-tap pattern
      const offsets = [
        [1, 0],  // Right
        [2, 0],  // Right + 1
        [-1, 1], // Bottom-left
        [0, 1],  // Bottom
        [1, 1],  // Bottom-right
        [0, 2]   // Bottom + 1
      ];

      offsets.forEach(([dx, dy]) => {
        if (x + dx >= 0 && x + dx < width && y + dy < height) {
          const i = ((y + dy) * width + (x + dx)) * 4;
          data[i] = Math.max(0, Math.min(255, data[i] + errR));
          data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + errG));
          data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + errB));
        }
      });
    }
  }

  imageData.data.set(data);
  return imageData;
}

/**
 * Bayer ordered dithering
 *
 * Uses a 4×4 Bayer threshold matrix for ordered dithering.
 * Creates a distinctive crosshatch pattern reminiscent of old CRT displays.
 * Faster than error diffusion and produces consistent patterns.
 *
 * @param {ImageData} imageData - Canvas ImageData object
 * @param {Object} options - Dithering options
 * @param {Array<[number, number, number]>} [options.palette] - Optional color palette
 * @param {number} [options.bitDepth=5] - Bit depth if no palette (1-8)
 * @param {number} [options.strength=32] - Dithering strength (0-255)
 * @returns {ImageData} Dithered ImageData
 */
function bayer(imageData, options = {}) {
  const { palette, bitDepth = 5, strength = 32 } = options;
  const width = imageData.width;
  const height = imageData.height;
  const data = new Uint8ClampedArray(imageData.data);

  // 4×4 Bayer threshold matrix
  const bayerMatrix = [
    [0, 8, 2, 10],
    [12, 4, 14, 6],
    [3, 11, 1, 9],
    [15, 7, 13, 5]
  ];
  const matrixSize = 4;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const alpha = data[idx + 3];

      // Skip transparent pixels
      if (alpha === 0) continue;

      // Get threshold from Bayer matrix (normalized to -0.5 to 0.5, then scaled)
      const threshold = (bayerMatrix[y % matrixSize][x % matrixSize] / 16 - 0.5) * strength;

      // Apply threshold
      const r = Math.max(0, Math.min(255, data[idx] + threshold));
      const g = Math.max(0, Math.min(255, data[idx + 1] + threshold));
      const b = Math.max(0, Math.min(255, data[idx + 2] + threshold));

      // Find new color
      const newColor = palette
        ? findNearestColor(r, g, b, palette)
        : quantizeColor(r, g, b, bitDepth);

      data[idx] = newColor[0];
      data[idx + 1] = newColor[1];
      data[idx + 2] = newColor[2];
    }
  }

  imageData.data.set(data);
  return imageData;
}

/**
 * Apply dithering to ImageData using the specified algorithm
 *
 * Convenience function that routes to the appropriate dithering algorithm.
 *
 * @param {ImageData} imageData - Canvas ImageData object
 * @param {string} method - Dithering method ('floyd-steinberg', 'atkinson', 'bayer', or 'none')
 * @param {Object} options - Dithering options
 * @returns {ImageData} Dithered ImageData
 */
function dither(imageData, method, options = {}) {
  switch (method) {
    case 'floyd-steinberg':
      return floydSteinberg(imageData, options);
    case 'atkinson':
      return atkinson(imageData, options);
    case 'bayer':
      return bayer(imageData, options);
    case 'none':
    default:
      return imageData;
  }
}

// CommonJS exports
module.exports = {
  floydSteinberg,
  atkinson,
  bayer,
  dither,
  // Utility functions
  findNearestColor,
  quantizeColor
};

// ES6 default export
module.exports.default = dither;
