/**
 * Retro Gaming Console Color Palettes
 *
 * Extracted from a pixel art tool - these are the actual RGB values
 * from gaming console hardware specs, not approximations.
 *
 * @module retro-palettes
 */

// TODO: Add Atari 2600, Sega Genesis palettes
// TODO: Maybe add alternative Game Boy palettes (Super Game Boy, etc.)

/**
 * Nintendo Entertainment System (NES) - 54 colors
 * The iconic 8-bit console palette (1983-1995)
 * @type {Array<[number, number, number]>}
 */
const NES = [
  [124,124,124],[0,0,252],[0,0,188],[68,40,188],[148,0,132],[168,0,32],
  [168,16,0],[136,20,0],[80,48,0],[0,120,0],[0,104,0],[0,88,0],
  [0,64,88],[0,0,0],[0,0,0],[0,0,0],[188,188,188],[0,120,248],
  [0,88,248],[104,68,252],[216,0,204],[228,0,88],[248,56,0],[228,92,16],
  [172,124,0],[0,184,0],[0,168,0],[0,168,68],[0,136,136],[0,0,0],
  [0,0,0],[0,0,0],[248,248,248],[60,188,252],[92,148,252],[204,136,252],
  [244,120,252],[248,116,176],[248,164,192],[240,208,176],[248,216,120],
  [184,248,24],[88,216,84],[88,248,152],[0,232,216],[120,120,120],
  [0,0,0],[0,0,0],[252,252,252],[164,228,252],[184,184,248],[216,184,248],
  [248,184,248],[248,164,192],[240,208,176],[252,224,168],[248,216,120],
  [216,248,120],[184,248,184],[184,248,216],[0,252,252],[248,216,248],
  [0,0,0],[0,0,0]
];

/**
 * Game Boy - 4 shades
 * The classic green monochrome palette (1989-2003)
 * @type {Array<[number, number, number]>}
 */
const GAME_BOY = [
  [15,56,15],
  [48,98,48],
  [139,172,15],
  [155,188,15]
];

/**
 * Game Boy Color - 32 colors
 * Enhanced handheld console palette (1998-2003)
 * @type {Array<[number, number, number]>}
 */
const GAME_BOY_COLOR = [
  [0,0,0],[52,104,86],[136,192,112],[224,248,208],[139,172,15],[155,188,15],
  [48,98,48],[15,56,15],[52,40,40],[92,80,80],[156,144,144],[220,216,216],
  [255,0,0],[255,127,0],[255,255,0],[0,255,0],[0,255,255],[0,0,255],
  [255,0,255],[255,184,248],[248,120,88],[152,120,248],[120,184,248],
  [184,248,248],[184,248,120],[248,216,120],[248,120,120],[184,0,0],
  [0,184,0],[0,0,184]
];

/**
 * PICO-8 - 16 colors
 * Fantasy console palette by Lexaloffle Games (2015)
 * @type {Array<[number, number, number]>}
 */
const PICO_8 = [
  [0,0,0],[29,43,83],[126,37,83],[0,135,81],[171,82,54],[95,87,79],
  [194,195,199],[255,241,232],[255,0,77],[255,163,0],[255,236,39],
  [0,228,54],[41,173,255],[131,118,156],[255,119,168],[255,204,170]
];

/**
 * Commodore 64 - 16 colors
 * Classic 8-bit computer palette (1982-1994)
 * @type {Array<[number, number, number]>}
 */
const COMMODORE_64 = [
  [0,0,0],[255,255,255],[136,0,0],[170,255,238],[204,68,204],[0,204,85],
  [0,0,170],[238,238,119],[221,136,85],[102,68,0],[255,119,119],[51,51,51],
  [119,119,119],[170,255,102],[0,136,255],[187,187,187]
];

/**
 * All palettes in a single object for easy access
 * @type {Object.<string, Array<[number, number, number]>>}
 */
const PALETTES = {
  nes: NES,
  gameboy: GAME_BOY,
  gameboycolor: GAME_BOY_COLOR,
  pico8: PICO_8,
  commodore64: COMMODORE_64
};

/**
 * Palette metadata for display/documentation purposes
 */
const PALETTE_INFO = {
  nes: {
    name: 'Nintendo Entertainment System',
    colors: 54,
    year: '1983-1995',
    description: 'Iconic 8-bit console palette'
  },
  gameboy: {
    name: 'Game Boy',
    colors: 4,
    year: '1989-2003',
    description: 'Classic green monochrome'
  },
  gameboycolor: {
    name: 'Game Boy Color',
    colors: 32,
    year: '1998-2003',
    description: 'Enhanced handheld palette'
  },
  pico8: {
    name: 'PICO-8',
    colors: 16,
    year: '2015',
    description: 'Fantasy console by Lexaloffle'
  },
  commodore64: {
    name: 'Commodore 64',
    colors: 16,
    year: '1982-1994',
    description: 'Classic 8-bit computer'
  }
};

/**
 * Get a list of all available palette names
 * @returns {string[]} Array of palette identifiers
 */
function getPaletteNames() {
  return Object.keys(PALETTES);
}

/**
 * Get a palette by name
 * @param {string} name - Palette identifier (nes, gameboy, pico8, etc.)
 * @returns {Array<[number, number, number]>|null} RGB color array or null if not found
 */
function getPalette(name) {
  return PALETTES[name] || null;
}

/**
 * Get palette metadata
 * @param {string} name - Palette identifier
 * @returns {Object|null} Palette info object or null if not found
 */
function getPaletteInfo(name) {
  return PALETTE_INFO[name] || null;
}

// CommonJS exports
module.exports = {
  // Individual palettes
  NES,
  GAME_BOY,
  GAME_BOY_COLOR,
  PICO_8,
  COMMODORE_64,

  // All palettes object
  PALETTES,
  PALETTE_INFO,

  // Helper functions
  getPaletteNames,
  getPalette,
  getPaletteInfo
};

// ES6 exports
module.exports.default = PALETTES;
