# 🎨 Image Pixelator

> Transform any image into retro pixel art with **authentic gaming console palettes**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Made with ❤️](https://img.shields.io/badge/Made%20with-%E2%9D%A4%EF%B8%8F-red.svg)](https://github.com/webstercharly/Image-Pixelator)

**Zero dependencies • Single HTML file • Works offline • Production-ready**

---

## ✨ What Makes This Special?

Not just another image converter - this tool combines **authentic retro gaming hardware palettes** with **professional-grade dithering algorithms**:

### 🎮 **Authentic Console Palettes**
- **NES** (54 colors) - Nintendo Entertainment System's iconic palette
- **Game Boy** (4 shades) - That classic green monochrome
- **PICO-8** (16 colors) - Fantasy console favorite
- **Commodore 64** (16 colors) - 8-bit computing legend
- **Game Boy Color** (32K colors) - Handheld gaming at its finest

### 🖼️ **Professional Dithering**
- **Floyd-Steinberg** - Smooth gradients via error diffusion
- **Atkinson** - Apple's classic algorithm from HyperCard & MacPaint
- **Bayer Matrix** - Ordered dithering for that authentic CRT look

### 🚀 **Power Features**
- **Variation Generator** - See 6 different looks simultaneously
- **CSS Box-Shadow Export** - Create pure-CSS pixel art
- **Sprite Outlining** - Auto edge-detection with custom colors
- **Multi-Size Export** - Download 1x, 2x, 4x, 8x in one click
- **Real-Time Preview** - Instant updates as you adjust

---

## 🎯 Perfect For

- 🎮 **Indie game devs** creating retro-style sprites
- 🎨 **Pixel artists** starting from reference images
- 🌐 **Web developers** wanting CSS-based pixel art
- 🎓 **Students** learning image processing algorithms
- 📱 **Content creators** making nostalgic social media posts

---

## 🚀 Quick Start

```bash
# Clone and run
git clone https://github.com/webstercharly/Image-Pixelator.git
cd Image-Pixelator
# Open index.html in your browser - that's it!
```

**Or just:**
1. Download `index.html`
2. Open it in any modern browser
3. Start creating pixel art

No installation. No build step. No dependencies. **It just works.**

---

## 💡 Why Choose This Over Other Tools?

| Feature | Image Pixelator | Photoshop | Aseprite | Basic Converters |
|---------|----------------|-----------|----------|------------------|
| **Price** | **Free** | $55/month | $20 | Free (ads) |
| **Installation** | **None** | Required | Required | None |
| **Retro Palettes** | **✅ 5 authentic** | ❌ Generic | ❌ Generic | ⚠️ Limited |
| **Dithering** | **✅ 3 algorithms** | ✅ Yes | ✅ Yes | ⚠️ Basic |
| **CSS Export** | **✅ Unique** | ❌ No | ❌ No | ❌ No |
| **Variations** | **✅ 6 at once** | ❌ Manual | ❌ Manual | ❌ No |
| **File Size** | **50KB** | GB+ | ~40MB | Varies |

---

## 🎨 Features Deep Dive

### Real-Time Processing
Adjust brightness, contrast, hue, saturation, lightness - see results instantly

### Smart Alpha Handling
Preserves transparency with proper threshold-based edge detection

### Color Analysis
Shows exact color count in your pixelated result

### Background Preview Options
- Checkerboard pattern
- White, black, dark gray
- Custom color picker

### Grid Overlay
Optional pixel grid (1×1, 2×2, 4×4) for precision work

---

## 🔧 Technical Excellence

```javascript
// Example: Proper color quantization preserving endpoints
function quantizeColor(r, g, b, bitDepth) {
  const levels = Math.pow(2, bitDepth);
  const maxLevel = levels - 1;
  return [
    Math.round(r / 255 * maxLevel) * (255 / maxLevel),
    Math.round(g / 255 * maxLevel) * (255 / maxLevel),
    Math.round(b / 255 * maxLevel) * (255 / maxLevel)
  ];
}
```

**Production-Ready Code:**
- ✅ Race condition prevention (request ID tracking)
- ✅ Defensive validation (palette existence checks)
- ✅ Proper async sequencing (Promise-based downloads)
- ✅ Memory efficiency (canvas reuse patterns)
- ✅ Error handling (blob creation, edge cases)

---

## 📖 Usage Examples

### Game Development Workflow
```
1. Upload character sketch
2. Select "PICO-8" palette
3. Enable Floyd-Steinberg dithering
4. Download 2x and 4x versions
5. Import into game engine
```

### Web Developer Workflow
```
1. Upload logo
2. Select "NES" palette  
3. Export as CSS box-shadow
4. Copy to your stylesheet
5. Pure CSS pixel art - no image files!
```

### Social Media Content
```
1. Upload photo
2. Select "Game Boy" palette
3. Add outline for pop
4. Download at 4x size
5. Post with #RetroAesthetic
```

---

## 🤝 Contributing

Want to make this even better? PRs welcome!

**Ideas for contributions:**
- Add more console palettes (Atari 2600, Sega Genesis)
- Implement additional dithering (Sierra, Stucki, Burkes)
- Add GIF animation frame export
- Create CLI version with Node.js
- Build browser extension
- Add batch processing capability

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📊 Technical Stats

- **Total size:** ~50KB (single HTML file)
- **Lines of code:** ~1,300
- **Dependencies:** 0️⃣
- **Palettes:** 5 historically accurate
- **Dithering algorithms:** 3 professional-grade
- **Export formats:** PNG (1x/2x/4x/8x) + CSS

---

## 🌟 Show Your Support

If this tool saved you time or helped with your project:

- ⭐ **Star this repo**
- 🐦 **Share on social media**
- 🎮 **Tell your gamedev friends**
- 🍴 **Fork and customize it**
- 🐛 **Report bugs or suggest features**

Every star helps this reach more creators!

---

## 📜 License

MIT License - see [LICENSE](LICENSE) file.

**TL;DR:** Use it for anything. Commercial, personal, educational. Just don't sue me.

---

## 🙏 Built With Love For

- Indie game developers grinding on their dream project
- Pixel artists who need quick reference conversions
- Web developers wanting creative CSS solutions
- Retro gaming enthusiasts celebrating 8-bit aesthetics
- Students learning about image processing
- Anyone who gets nostalgic for chunky pixels

---

**Made by [Charly Webster](https://github.com/webstercharly)**

*"Converting memories to pixels, one palette at a time."* 🎮✨

---

## 🔗 Links

- **Repository:** [github.com/webstercharly/Image-Pixelator](https://github.com/webstercharly/Image-Pixelator)
- **Report Bug:** [Create an issue](https://github.com/webstercharly/Image-Pixelator/issues)
- **Request Feature:** [Create an issue](https://github.com/webstercharly/Image-Pixelator/issues)
