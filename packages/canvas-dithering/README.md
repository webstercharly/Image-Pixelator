# canvas-dithering

Floyd-Steinberg, Atkinson, and Bayer dithering for canvas.

```bash
npm install canvas-dithering
```

## Usage

```js
const { floydSteinberg, atkinson, bayer } = require('canvas-dithering');

const ctx = canvas.getContext('2d');
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

// reduce to 4-bit color
floydSteinberg(imageData, { bitDepth: 4 });

ctx.putImageData(imageData, 0, 0);
```

## With a palette

```js
const palette = [
  [0, 0, 0],
  [255, 255, 255]
];

floydSteinberg(imageData, { palette });
```

Works well with [retro-palettes](https://npmjs.com/package/retro-palettes):

```js
const { PALETTES } = require('retro-palettes');
floydSteinberg(imageData, { palette: PALETTES.nes });
```

## Algorithms

**Floyd-Steinberg** - Classic error diffusion, smooth gradients  
**Atkinson** - Lighter output, high contrast (like old Mac)  
**Bayer** - Ordered dithering, faster, crosshatch patterns

```js
bayer(imageData, { bitDepth: 3, strength: 32 });
```

## API

All functions modify ImageData in place and return it.

```js
floydSteinberg(imageData, options)
atkinson(imageData, options)
bayer(imageData, options)
```

Options:
- `palette` - array of `[r,g,b]` colors (optional)
- `bitDepth` - 1-8 bits per channel (default 5)
- `strength` - for Bayer only (default 32)

Also exports `findNearestColor(r, g, b, palette)` and `quantizeColor(r, g, b, bitDepth)` if you need them.

TypeScript defs included.

## License

MIT
