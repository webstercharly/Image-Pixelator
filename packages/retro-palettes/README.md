# retro-palettes

Color palettes from NES, Game Boy, PICO-8, Commodore 64, etc.

```bash
npm install retro-palettes
```

```js
const { NES, PICO_8, PALETTES } = require('retro-palettes');

console.log(NES); // array of [r,g,b] colors
console.log(PALETTES.gameboy); // 4 shades of green
```

## Available palettes

- `NES` - 54 colors
- `GAME_BOY` - 4 colors  
- `GAME_BOY_COLOR` - 32 colors
- `PICO_8` - 16 colors
- `COMMODORE_64` - 16 colors

Or use `PALETTES.nes`, `PALETTES.gameboy`, etc.

## Helpers

```js
const { getPalette, getPaletteNames } = require('retro-palettes');

getPaletteNames(); // ['nes', 'gameboy', ...]
getPalette('pico8'); // returns PICO_8 array
```

That's it. Colors are `[r, g, b]` where each value is 0-255.

TypeScript defs included.

## License

MIT
