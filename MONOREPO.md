# Image Pixelator (Monorepo)

This repo contains three related projects for retro pixel art creation.

## Structure

```
packages/
├── retro-palettes/      - NPM package: Gaming console color palettes
├── canvas-dithering/    - NPM package: Dithering algorithms
└── (main app files in root)
```

## Packages

### retro-palettes

Color palettes from NES, Game Boy, PICO-8, Commodore 64, etc.

```bash
cd packages/retro-palettes
npm test
npm publish  # when ready
```

### canvas-dithering

Floyd-Steinberg, Atkinson, and Bayer dithering for canvas.

```bash
cd packages/canvas-dithering
npm test
npm publish  # when ready
```

### Main App

The web-based pixel art tool in the root directory. Open `index.html` in a browser.

## Publishing Packages Separately

To create standalone repos for each package:

```bash
# 1. Create new repos on GitHub
# 2. Copy package contents
cp -r packages/retro-palettes /path/to/new-repo
cd /path/to/new-repo
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/user/retro-palettes.git
git push -u origin master

# Repeat for canvas-dithering
```

Or keep them in this monorepo - both approaches work.

## Development

The main app (`index.html`) currently has embedded copies of the palette and dithering code.

Future: Refactor to use the packages as dependencies.

## License

MIT
