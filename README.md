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

The palette and dithering code is also available as standalone npm packages in `packages/`:

- `retro-palettes` - The color palettes
- `canvas-dithering` - The dithering algorithms

Each has its own README.

## License

MIT
