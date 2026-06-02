/**
 * Tests for canvas-dithering
 * Verifies algorithm correctness, not just "doesn't crash".
 */

const {
  floydSteinberg,
  atkinson,
  bayer,
  dither,
  findNearestColor,
  quantizeColor
} = require('../src/index.js');

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    console.log('  FAIL: ' + message);
    failures++;
  }
}

function createImageData(width, height, fillColor = [128, 128, 128, 255]) {
  const data = new Uint8ClampedArray(width * height * 4);
  for (let i = 0; i < data.length; i += 4) {
    data[i] = fillColor[0];
    data[i + 1] = fillColor[1];
    data[i + 2] = fillColor[2];
    data[i + 3] = fillColor[3];
  }
  return { data, width, height, colorSpace: 'srgb' };
}

function createGradient(width, height) {
  const data = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const v = Math.floor((x / width) * 255);
      data[idx] = v;
      data[idx + 1] = v;
      data[idx + 2] = v;
      data[idx + 3] = 255;
    }
  }
  return { data, width, height, colorSpace: 'srgb' };
}

function pixelsInPalette(imageData, palette) {
  for (let i = 0; i < imageData.data.length; i += 4) {
    if (imageData.data[i + 3] === 0) continue; // skip transparent
    const r = imageData.data[i];
    const g = imageData.data[i + 1];
    const b = imageData.data[i + 2];
    const found = palette.some(([pr, pg, pb]) => pr === r && pg === g && pb === b);
    if (!found) return false;
  }
  return true;
}

console.log('canvas-dithering tests\n');

// quantizeColor
console.log('quantizeColor:');
{
  const white = quantizeColor(255, 255, 255, 3);
  assert(white[0] === 255 && white[1] === 255 && white[2] === 255,
    'white must remain white (255,255,255), got ' + JSON.stringify(white));

  const black = quantizeColor(0, 0, 0, 3);
  assert(black[0] === 0 && black[1] === 0 && black[2] === 0,
    'black must remain black, got ' + JSON.stringify(black));

  // 1-bit quantization: anything > 127 should round to 255, else 0
  const high = quantizeColor(200, 200, 200, 1);
  assert(high[0] === 255, '1-bit quantization of 200 should give 255, got ' + high[0]);
  const low = quantizeColor(50, 50, 50, 1);
  assert(low[0] === 0, '1-bit quantization of 50 should give 0, got ' + low[0]);

  // Quantized values must always be in [0, 255]
  for (let v = 0; v <= 255; v += 7) {
    const q = quantizeColor(v, v, v, 4);
    assert(q[0] >= 0 && q[0] <= 255, `quantized value out of range: ${q[0]}`);
  }
}

// findNearestColor
console.log('findNearestColor:');
{
  const palette = [[0, 0, 0], [255, 255, 255]];
  const dark = findNearestColor(10, 10, 10, palette);
  assert(dark[0] === 0, 'dark gray nearest should be black');
  const light = findNearestColor(200, 200, 200, palette);
  assert(light[0] === 255, 'light gray nearest should be white');

  // Exact match returns same color
  const exact = findNearestColor(255, 0, 0, [[0, 0, 0], [255, 0, 0], [0, 0, 255]]);
  assert(exact[0] === 255 && exact[1] === 0 && exact[2] === 0,
    'exact color match should be returned');

  // Empty palette returns input unchanged
  const empty = findNearestColor(100, 150, 200, []);
  assert(empty[0] === 100 && empty[1] === 150 && empty[2] === 200,
    'empty palette returns input unchanged');
}

// Floyd-Steinberg actually does something
console.log('floydSteinberg:');
{
  // Gradient + 1-bit should produce a mix of black and white pixels (dithering)
  // A constant function wouldn't produce both.
  const img = createGradient(20, 20);
  floydSteinberg(img, { bitDepth: 1 });
  let hasBlack = false, hasWhite = false;
  for (let i = 0; i < img.data.length; i += 4) {
    if (img.data[i] === 0) hasBlack = true;
    if (img.data[i] === 255) hasWhite = true;
  }
  assert(hasBlack && hasWhite, 'Floyd-Steinberg on gradient should produce both black and white pixels');

  // Output with palette should only contain palette colors
  const palette = [[0, 0, 0], [128, 128, 128], [255, 255, 255]];
  const img2 = createGradient(20, 20);
  floydSteinberg(img2, { palette });
  assert(pixelsInPalette(img2, palette),
    'Floyd-Steinberg output should only contain palette colors');

  // Modifies in place AND returns same object
  const img3 = createImageData(5, 5);
  const result = floydSteinberg(img3, { bitDepth: 3 });
  assert(result === img3, 'floydSteinberg should return the same ImageData object');
}

// Atkinson
console.log('atkinson:');
{
  const img = createGradient(20, 20);
  atkinson(img, { bitDepth: 1 });
  let hasBlack = false, hasWhite = false;
  for (let i = 0; i < img.data.length; i += 4) {
    if (img.data[i] === 0) hasBlack = true;
    if (img.data[i] === 255) hasWhite = true;
  }
  assert(hasBlack && hasWhite, 'Atkinson on gradient should produce both black and white pixels');

  const palette = [[0, 0, 0], [255, 255, 255]];
  const img2 = createGradient(20, 20);
  atkinson(img2, { palette });
  assert(pixelsInPalette(img2, palette),
    'Atkinson output should only contain palette colors');
}

// Bayer
console.log('bayer:');
{
  const img = createGradient(20, 20);
  bayer(img, { bitDepth: 1 });
  let hasBlack = false, hasWhite = false;
  for (let i = 0; i < img.data.length; i += 4) {
    if (img.data[i] === 0) hasBlack = true;
    if (img.data[i] === 255) hasWhite = true;
  }
  assert(hasBlack && hasWhite, 'Bayer on gradient should produce both black and white pixels');

  const palette = [[0, 0, 0], [255, 255, 255]];
  const img2 = createGradient(20, 20);
  bayer(img2, { palette });
  assert(pixelsInPalette(img2, palette),
    'Bayer output should only contain palette colors');
}

// Transparency
console.log('transparency:');
{
  const img = createImageData(5, 5, [128, 128, 128, 0]); // fully transparent
  floydSteinberg(img, { bitDepth: 3 });
  // Transparent pixels should be skipped, RGB stays as input (or near it)
  // Most importantly, alpha must be preserved
  for (let i = 3; i < img.data.length; i += 4) {
    assert(img.data[i] === 0, 'alpha 0 must remain 0 after dithering');
  }

  // Mixed: some opaque, some transparent
  const mixed = createImageData(4, 1, [200, 200, 200, 255]);
  // Make pixel 2 transparent
  mixed.data[2 * 4 + 3] = 0;
  const originalRgb = [mixed.data[2 * 4], mixed.data[2 * 4 + 1], mixed.data[2 * 4 + 2]];
  floydSteinberg(mixed, { bitDepth: 1 });
  // Transparent pixel's RGB should not be quantized to palette
  // (it might receive diffused error, but it shouldn't be set to 0 or 255 directly)
  assert(mixed.data[2 * 4 + 3] === 0, 'transparent pixel alpha preserved');
}

// dither() convenience
console.log('dither():');
{
  const img = createImageData(5, 5);
  const result = dither(img, 'floyd-steinberg', { bitDepth: 4 });
  assert(result === img, 'dither should return input ImageData');

  // 'none' should not modify the data
  const img2 = createImageData(5, 5, [123, 45, 67, 255]);
  dither(img2, 'none', {});
  assert(img2.data[0] === 123 && img2.data[1] === 45 && img2.data[2] === 67,
    "dither(_, 'none') should not modify pixel data");
}

// Edge cases
console.log('edge cases:');
{
  // 1x1 image shouldn't crash
  const tiny = createImageData(1, 1);
  floydSteinberg(tiny, { bitDepth: 3 });
  atkinson(tiny, { bitDepth: 3 });
  bayer(tiny, { bitDepth: 3 });

  // Empty palette is treated as no palette (falls back to input color)
  const img = createImageData(5, 5);
  const result = floydSteinberg(img, { palette: [] });
  assert(result.data instanceof Uint8ClampedArray, 'empty palette should not crash');
}

console.log('');
if (failures === 0) {
  console.log('All tests passed.');
  process.exit(0);
} else {
  console.log(`${failures} test(s) failed.`);
  process.exit(1);
}
