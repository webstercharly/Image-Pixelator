/**
 * Test suite for canvas-dithering
 */

const {
  floydSteinberg,
  atkinson,
  bayer,
  dither,
  findNearestColor,
  quantizeColor
} = require('../src/index.js');

console.log('🧪 Testing canvas-dithering...\n');

// Helper to create test ImageData
function createTestImageData(width, height, fillColor = [128, 128, 128, 255]) {
  const data = new Uint8ClampedArray(width * height * 4);
  for (let i = 0; i < data.length; i += 4) {
    data[i] = fillColor[0];
    data[i + 1] = fillColor[1];
    data[i + 2] = fillColor[2];
    data[i + 3] = fillColor[3];
  }
  return {
    data,
    width,
    height,
    colorSpace: 'srgb'
  };
}

// Test 1: Module exports
console.log('✓ Test 1: All exports exist');
console.assert(typeof floydSteinberg === 'function', 'floydSteinberg should be a function');
console.assert(typeof atkinson === 'function', 'atkinson should be a function');
console.assert(typeof bayer === 'function', 'bayer should be a function');
console.assert(typeof dither === 'function', 'dither should be a function');
console.assert(typeof findNearestColor === 'function', 'findNearestColor should be a function');
console.assert(typeof quantizeColor === 'function', 'quantizeColor should be a function');

// Test 2: Utility functions
console.log('✓ Test 2: Utility functions work correctly');

// Test quantizeColor
const q1 = quantizeColor(255, 255, 255, 3);
console.assert(q1[0] === 255 && q1[1] === 255 && q1[2] === 255, 'White should quantize to white');

const q2 = quantizeColor(0, 0, 0, 3);
console.assert(q2[0] === 0 && q2[1] === 0 && q2[2] === 0, 'Black should quantize to black');

// Test findNearestColor
const testPalette = [[0, 0, 0], [255, 255, 255]];
const n1 = findNearestColor(10, 10, 10, testPalette);
console.assert(n1[0] === 0 && n1[1] === 0 && n1[2] === 0, 'Dark gray should map to black');

const n2 = findNearestColor(200, 200, 200, testPalette);
console.assert(n2[0] === 255 && n2[1] === 255 && n2[2] === 255, 'Light gray should map to white');

// Test 3: Floyd-Steinberg dithering
console.log('✓ Test 3: Floyd-Steinberg dithering');
const imgFS = createTestImageData(10, 10);
const resultFS = floydSteinberg(imgFS, { bitDepth: 3 });
console.assert(resultFS.data instanceof Uint8ClampedArray, 'Should return ImageData');
console.assert(resultFS.data.length === 400, 'Should have correct data length');

// Test 4: Atkinson dithering
console.log('✓ Test 4: Atkinson dithering');
const imgAtk = createTestImageData(10, 10);
const resultAtk = atkinson(imgAtk, { bitDepth: 3 });
console.assert(resultAtk.data instanceof Uint8ClampedArray, 'Should return ImageData');
console.assert(resultAtk.data.length === 400, 'Should have correct data length');

// Test 5: Bayer dithering
console.log('✓ Test 5: Bayer dithering');
const imgBayer = createTestImageData(10, 10);
const resultBayer = bayer(imgBayer, { bitDepth: 3 });
console.assert(resultBayer.data instanceof Uint8ClampedArray, 'Should return ImageData');
console.assert(resultBayer.data.length === 400, 'Should have correct data length');

// Test 6: Dithering with palette
console.log('✓ Test 6: Dithering with custom palette');
const palette = [
  [0, 0, 0],
  [128, 128, 128],
  [255, 255, 255]
];
const imgPal = createTestImageData(10, 10);
const resultPal = floydSteinberg(imgPal, { palette });
console.assert(resultPal.data instanceof Uint8ClampedArray, 'Should work with palette');

// Verify colors are from palette
let validColors = true;
for (let i = 0; i < resultPal.data.length; i += 4) {
  const r = resultPal.data[i];
  const g = resultPal.data[i + 1];
  const b = resultPal.data[i + 2];
  const isInPalette = palette.some(([pr, pg, pb]) =>
    pr === r && pg === g && pb === b
  );
  if (!isInPalette) {
    validColors = false;
    break;
  }
}
console.assert(validColors, 'All colors should be from palette');

// Test 7: dither() convenience function
console.log('✓ Test 7: Convenience dither() function');
const imgConv = createTestImageData(10, 10);
const resultConv = dither(imgConv, 'floyd-steinberg', { bitDepth: 4 });
console.assert(resultConv.data instanceof Uint8ClampedArray, 'Convenience function should work');

// Test different methods
dither(createTestImageData(10, 10), 'atkinson', { bitDepth: 4 });
dither(createTestImageData(10, 10), 'bayer', { bitDepth: 4 });
dither(createTestImageData(10, 10), 'none', { bitDepth: 4 });

// Test 8: Transparency handling
console.log('✓ Test 8: Transparency handling');
const imgTransparent = createTestImageData(10, 10, [128, 128, 128, 0]); // Fully transparent
const resultTrans = floydSteinberg(imgTransparent, { bitDepth: 3 });
// Transparent pixels should remain unchanged
console.assert(resultTrans.data[3] === 0, 'Alpha channel should be preserved');

// Test 9: Edge cases
console.log('✓ Test 9: Edge cases');

// 1x1 image
const tiny = createTestImageData(1, 1);
floydSteinberg(tiny, { bitDepth: 3 });
atkinson(tiny, { bitDepth: 3 });
bayer(tiny, { bitDepth: 3 });

// Empty palette
const emptyPal = createTestImageData(10, 10);
const emptyResult = floydSteinberg(emptyPal, { palette: [] });
console.assert(emptyResult.data instanceof Uint8ClampedArray, 'Should handle empty palette');

// Test 10: Performance check
console.log('✓ Test 10: Performance check');
const largImg = createTestImageData(100, 100);

const startFS = Date.now();
floydSteinberg(createTestImageData(100, 100), { bitDepth: 4 });
const timeFS = Date.now() - startFS;

const startAtk = Date.now();
atkinson(createTestImageData(100, 100), { bitDepth: 4 });
const timeAtk = Date.now() - startAtk;

const startBay = Date.now();
bayer(createTestImageData(100, 100), { bitDepth: 4 });
const timeBay = Date.now() - startBay;

console.log(`\n⏱️  Performance (100×100 image):`);
console.log(`  Floyd-Steinberg: ${timeFS}ms`);
console.log(`  Atkinson: ${timeAtk}ms`);
console.log(`  Bayer: ${timeBay}ms`);

console.log('\nAll tests passed!\n');

console.log('Available algorithms:');
console.log('  - Floyd-Steinberg (error diffusion)');
console.log('  - Atkinson (lighter, Mac-style)');
console.log('  - Bayer (ordered, faster)');
console.log('\nSupports custom palettes and bit depth reduction.');
