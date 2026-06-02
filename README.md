# Image Pixelator

Web tool to convert images to pixel art with retro gaming palettes (NES, Game Boy, PICO-8, C64).

Open `index.html` in a browser. No build step.

## Features

- Upload an image, get pixel art
- Retro console palettes
- Dithering: Floyd-Steinberg, Atkinson, Bayer
- Adjustments: brightness, contrast, hue, saturation
- Sprite outlines
- Export as PNG (1x, 2x, 4x, 8x) or CSS box-shadow

## Packages

The palette data and dithering algorithms were extracted into standalone
npm packages under `packages/`:

- `retro-palettes` - The colour palettes as a JS module
- `canvas-dithering` - Floyd-Steinberg / Atkinson / Bayer dithering

These are independent packages with their own tests and READMEs. Note
that `index.html` does **not** import them - it has its own copy of the
code inline so the app stays a single static file with no build step.
If you only need the algorithms or palettes for another project, use the
packages. If you want to run the app, just open `index.html`.

## License

MIT
