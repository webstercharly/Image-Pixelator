/**
 * Tests for retro-palettes
 * Verifies palette data integrity, not just that exports exist.
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

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    console.log('  FAIL: ' + message);
    failures++;
  }
}

function isValidRGB(color) {
  return Array.isArray(color)
    && color.length === 3
    && color.every(v => Number.isInteger(v) && v >= 0 && v <= 255);
}

console.log('retro-palettes tests\n');

console.log('Counts:');
assert(NES.length === 64, `NES should have 64 entries, got ${NES.length}`);
assert(GAME_BOY.length === 4, `GAME_BOY should have 4 entries, got ${GAME_BOY.length}`);
assert(GAME_BOY_COLOR.length === 30, `GAME_BOY_COLOR should have 30 entries, got ${GAME_BOY_COLOR.length}`);
assert(PICO_8.length === 16, `PICO_8 should have 16 entries, got ${PICO_8.length}`);
assert(COMMODORE_64.length === 16, `COMMODORE_64 should have 16 entries, got ${COMMODORE_64.length}`);

console.log('Metadata matches data:');
assert(PALETTE_INFO.nes.colors === NES.length, 'NES metadata count must match data');
assert(PALETTE_INFO.gameboy.colors === GAME_BOY.length, 'Game Boy metadata count must match data');
assert(PALETTE_INFO.gameboycolor.colors === GAME_BOY_COLOR.length, 'GBC metadata count must match data');
assert(PALETTE_INFO.pico8.colors === PICO_8.length, 'PICO-8 metadata count must match data');
assert(PALETTE_INFO.commodore64.colors === COMMODORE_64.length, 'C64 metadata count must match data');

console.log('RGB validity:');
[['NES', NES], ['GAME_BOY', GAME_BOY], ['GAME_BOY_COLOR', GAME_BOY_COLOR],
 ['PICO_8', PICO_8], ['COMMODORE_64', COMMODORE_64]].forEach(([name, palette]) => {
  palette.forEach((color, i) => {
    assert(isValidRGB(color), `${name}[${i}] is not valid RGB: ${JSON.stringify(color)}`);
  });
});

// Known reference colors - if these change, the data has been corrupted
console.log('Known reference values:');
assert(GAME_BOY[0].join(',') === '15,56,15', 'Game Boy darkest green should be (15,56,15)');
assert(GAME_BOY[3].join(',') === '155,188,15', 'Game Boy lightest green should be (155,188,15)');
assert(PICO_8[0].join(',') === '0,0,0', 'PICO-8 color 0 should be black');
assert(PICO_8[7].join(',') === '255,241,232', 'PICO-8 color 7 should be (255,241,232)');
assert(COMMODORE_64[0].join(',') === '0,0,0', 'C64 color 0 should be black');
assert(COMMODORE_64[1].join(',') === '255,255,255', 'C64 color 1 should be white');

console.log('Helpers:');
assert(getPalette('nes') === NES, "getPalette('nes') returns NES");
assert(getPalette('nonexistent') === null, "getPalette of unknown name returns null");
assert(getPaletteNames().length === 5, 'getPaletteNames returns 5 names');
assert(getPaletteInfo('pico8').name === 'PICO-8', 'getPaletteInfo returns correct name');
assert(getPaletteInfo('nonexistent') === null, 'getPaletteInfo of unknown returns null');

console.log('Export consistency:');
assert(PALETTES.nes === NES, 'PALETTES.nes is same reference as NES export');
assert(PALETTES.gameboy === GAME_BOY, 'PALETTES.gameboy is same reference as GAME_BOY export');

console.log('');
if (failures === 0) {
  console.log('All tests passed.');
  process.exit(0);
} else {
  console.log(`${failures} test(s) failed.`);
  process.exit(1);
}
