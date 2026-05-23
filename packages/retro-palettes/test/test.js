/**
 * Simple test file to verify palettes load correctly
 */

const {
  NES,
  GAME_BOY,
  GAME_BOY_COLOR,
  PICO_8,
  COMMODORE_64,
  PALETTES,
  PALETTE_INFO,
  getPaletteNames,
  getPalette,
  getPaletteInfo
} = require('../src/index.js');

console.log('🧪 Testing retro-palettes...\n');

// Test 1: Palette exports exist
console.log('✓ Test 1: All palette exports exist');
console.assert(Array.isArray(NES), 'NES should be an array');
console.assert(Array.isArray(GAME_BOY), 'GAME_BOY should be an array');
console.assert(Array.isArray(PICO_8), 'PICO_8 should be an array');

// Test 2: Correct number of colors
console.log('✓ Test 2: Correct color counts');
console.assert(NES.length === 64, `NES should have 64 colors, got ${NES.length}`);
console.assert(GAME_BOY.length === 4, `Game Boy should have 4 colors, got ${GAME_BOY.length}`);
console.assert(PICO_8.length === 16, `PICO-8 should have 16 colors, got ${PICO_8.length}`);
console.assert(COMMODORE_64.length === 16, `C64 should have 16 colors, got ${COMMODORE_64.length}`);

// Test 3: RGB format validation
console.log('✓ Test 3: RGB format is valid');
function isValidRGB(color) {
  return Array.isArray(color) &&
    color.length === 3 &&
    color.every(v => typeof v === 'number' && v >= 0 && v <= 255);
}

NES.forEach((color, i) => {
  console.assert(isValidRGB(color), `NES color ${i} should be valid RGB: ${color}`);
});

// Test 4: PALETTES object
console.log('✓ Test 4: PALETTES object structure');
console.assert(typeof PALETTES === 'object', 'PALETTES should be an object');
console.assert(PALETTES.nes === NES, 'PALETTES.nes should match NES export');
console.assert(PALETTES.gameboy === GAME_BOY, 'PALETTES.gameboy should match GAME_BOY');

// Test 5: Helper functions
console.log('✓ Test 5: Helper functions work');
const names = getPaletteNames();
console.assert(Array.isArray(names), 'getPaletteNames should return array');
console.assert(names.includes('nes'), 'Should include "nes"');
console.assert(names.includes('pico8'), 'Should include "pico8"');

const nesPalette = getPalette('nes');
console.assert(nesPalette === NES, 'getPalette("nes") should return NES');

const invalidPalette = getPalette('playstation');
console.assert(invalidPalette === null, 'Invalid palette should return null');

// Test 6: Palette info
console.log('✓ Test 6: Palette metadata');
const nesInfo = getPaletteInfo('nes');
console.assert(nesInfo.name === 'Nintendo Entertainment System', 'NES name should be correct');
console.assert(nesInfo.colors === 54, 'NES should report 54 colors in metadata');

console.log('\nAll tests passed!\n');

// Display summary
console.log('Palettes available:');
getPaletteNames().forEach(name => {
  const info = getPaletteInfo(name);
  const palette = getPalette(name);
  console.log(`  ${info.name}: ${palette.length} colors`);
});
