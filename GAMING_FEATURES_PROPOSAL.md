# Gaming Asset Features Proposal
## Image Pixelator - Gaming Enhancement Plan

**Target Audience:** Indie game developers, pixel artists, game asset creators
**Philosophy:** Keep it simple, single-file, client-side, focused on practical game dev needs

---

## Critical Missing Features (High Priority)

### 1. **Download/Export Pixelated Image** ⭐ ESSENTIAL
**Current:** Can only view the result
**Need:** Download as PNG with transparency support

**Why:** Game engines need actual image files, not just previews
**Implementation:**
- "Download PNG" button
- Preserve alpha channel from original
- Configurable output size (1x, 2x, 4x scaling)
- Filename: `pixelated_[original-name]_s[scale]_b[bitdepth].png`

**Complexity:** Low (canvas.toBlob() → download)

---

### 2. **Transparency Handling** ⭐ ESSENTIAL
**Current:** Likely converts alpha to white/black
**Need:** Proper alpha channel preservation and control

**Why:** 90% of game sprites require transparency
**Features:**
- Preserve original alpha channel
- Alpha threshold slider (0-255) - pixels below threshold become fully transparent
- "Background color" picker for alpha preview
- Checkerboard pattern toggle to visualize transparency

**Complexity:** Medium (requires alpha-aware processing)

---

### 3. **Preset Color Palettes** ⭐ HIGH VALUE
**Current:** Only bit-depth reduction
**Need:** Quantize to famous gaming palettes

**Why:** Authentic retro look, consistent style across assets
**Palettes to include:**
- NES (56 colors)
- Game Boy (4 shades of green)
- Game Boy Color (32 colors)
- PICO-8 (16 colors)
- Commodore 64 (16 colors)
- CGA (16 colors)
- EGA (64 colors)
- Grayscale (4, 8, 16 levels)
- Custom palette (upload .pal or .hex file)

**UI:**
- Dropdown: "Palette: [Free] [NES] [Game Boy] [PICO-8] ..."
- When palette selected, disable bit-depth slider
- Show palette preview (colored squares)

**Complexity:** Medium (palette data + nearest-color matching)

---

### 4. **Grid Overlay & Tile Alignment** ⭐ HIGH VALUE
**Current:** No alignment tools
**Need:** Grid overlay for tile-based games

**Why:** Most 2D games use tile-based systems (8x8, 16x16, 32x32)
**Features:**
- Grid overlay toggle
- Grid size selector: 8x8, 16x16, 32x32, 64x64, custom
- Grid color selector (default: semi-transparent white)
- Auto-snap image dimensions to grid multiples
- Show pixel dimensions in real-time

**UI Example:**
```
[✓] Show Grid  [16x16 ▼]  Grid Color: [⚪]
Output Size: 64×64 pixels (4×4 tiles)
```

**Complexity:** Low (canvas overlay)

---

### 5. **Multiple Export Sizes** ⭐ ESSENTIAL
**Current:** Single output size
**Need:** Export at multiple resolutions simultaneously

**Why:** Games need assets at different resolutions (mobile, HD, 4K)
**Features:**
- Checkbox options: 1x, 2x, 4x, 8x
- "Download All" button → creates ZIP file
- Individual download buttons
- Preview of each size

**UI:**
```
Export Sizes: [✓] 1x  [✓] 2x  [✓] 4x  [ ] 8x
[Download 1x] [Download 2x] [Download 4x] [Download All as ZIP]
```

**Complexity:** Medium (requires JSZip library or manual zip creation)

---

## High-Value Enhancements

### 6. **Dithering Support**
**Why:** Classic retro aesthetic, smooth gradients with limited colors

**Algorithms:**
- None (current)
- Floyd-Steinberg (most common)
- Ordered/Bayer matrix (classic)
- Atkinson (Mac-style)

**UI:**
```
Dithering: [None ▼]  Strength: [||||----] 50%
```

**Complexity:** Medium (error diffusion algorithms)

---

### 7. **Background Preview Options**
**Why:** Sprites look different on various backgrounds

**Options:**
- Transparent (checkerboard)
- White
- Black
- Custom color picker
- Upload background image
- Animated toggle (switch between light/dark)

**UI:**
```
Preview BG: [Checkerboard ▼] or [Pick Color: ⚫]
```

**Complexity:** Low (background-color or background-image CSS)

---

### 8. **Sprite Outline/Border**
**Why:** Common game sprite technique for visibility

**Features:**
- Toggle outline on/off
- Outline thickness: 1-4 pixels
- Outline color picker
- Outline opacity
- Smart outline (only around non-transparent pixels)

**UI:**
```
[✓] Add Outline  Thickness: [2px ▼]  Color: [⚫]  Opacity: 100%
```

**Complexity:** Medium (edge detection + pixel expansion)

---

### 9. **Quick Variations Panel**
**Why:** Game devs often need multiple versions (damaged, powered-up, etc.)

**Features:**
- Generate 4-6 quick variations with different parameters
- Grid view of variations
- Click to apply that variation
- "Generate Variations" button creates:
  - Light version (+brightness)
  - Dark version (-brightness)
  - High contrast
  - Desaturated
  - Different hues (±30°, ±60°)
- Download all variations as sprite sheet

**UI:**
```
[Generate Variations]

[Original]  [Light]    [Dark]     [High Contrast]
[Red-ish]   [Blue-ish] [Grayscale] [Damaged]

[Download as Sprite Sheet]
```

**Complexity:** High (parameter combinations + sprite sheet layout)

---

### 10. **Side-by-Side Size Comparison**
**Why:** Need to see how sprite looks at actual game size

**Features:**
- Toggle "Actual Size" view
- Show original, pixelated, and scaled versions
- Zoom levels: 25%, 50%, 100%, 200%, 400%
- "Actual pixels" mode (no smoothing)

**UI:**
```
View: [Fit to Screen ▼]  [✓] Show actual pixels (no smoothing)
Zoom: [25%] [50%] [100%] [200%] [400%]
```

**Complexity:** Low (CSS image-rendering: pixelated)

---

## Nice-to-Have Features

### 11. **Animation Frame Support**
**Why:** Create simple sprite animations

**Features:**
- Upload multiple images
- Process all with same settings
- Preview as animation (adjustable FPS)
- Export as sprite sheet (horizontal/vertical)
- Export individual frames
- Onion skinning (see previous frame ghosted)

**Complexity:** High (requires timeline UI)

---

### 12. **Aspect Ratio Constraints**
**Why:** Some games need specific sizes

**Presets:**
- Free
- Square (1:1)
- 16:9
- 4:3
- Custom (input width:height)
- Common sizes: 16×16, 32×32, 64×64, 128×128

**Complexity:** Low (crop/scale logic)

---

### 13. **Color Count Display**
**Why:** Optimization awareness

**Show:**
- Original color count
- Pixelated color count
- "Unique colors: 47"
- Warning if >256 colors for 8-bit formats

**Complexity:** Low (Set data structure)

---

### 14. **Posterize Effect**
**Why:** Additional stylization option

**Features:**
- Posterize levels slider (2-16)
- Different from bit-depth (affects brightness levels too)

**Complexity:** Low

---

### 15. **Edge Detection & Line Art**
**Why:** Generate outline assets or coloring book style

**Features:**
- "Extract Lines" button
- Output black lines on transparent background
- Line thickness adjustment
- Use for creating outline layers

**Complexity:** Medium (Sobel/Canny edge detection)

---

### 16. **Preset Save/Load**
**Why:** Consistent style across multiple assets

**Features:**
- Save current settings as preset (localStorage)
- Name presets: "Character Style", "Environment", etc.
- Load preset applies all settings
- Export/Import presets as JSON
- Share preset via URL parameter

**Example URL:**
```
index.html?preset=eyJzY2FsZSI6OCwiYml0RGVwdGgiOjUsInBhbGV0dGUiOiJORVMifQ==
```

**Complexity:** Low (localStorage + JSON)

---

### 17. **Batch Processing**
**Why:** Process multiple assets consistently

**Features:**
- Drop multiple images
- Apply same settings to all
- Show grid of results
- Download all as ZIP
- Name pattern: "sprite_001.png", "sprite_002.png"

**Complexity:** Medium (queue management)

---

### 18. **Histogram Display**
**Why:** Color distribution analysis

**Show:**
- RGB histogram
- Before/after comparison
- Identify dominant colors

**Complexity:** Medium (data visualization)

---

### 19. **Crop/Trim Tools**
**Why:** Remove excess transparent space

**Features:**
- "Auto-trim" button (crop to content)
- Manual crop with draggable rectangle
- Maintain center point
- Show dimensions in real-time

**Complexity:** Medium (UI for crop rectangle)

---

### 20. **Rotate & Flip**
**Why:** Quick variations, sprite directions

**Buttons:**
- Flip Horizontal
- Flip Vertical
- Rotate 90° CW
- Rotate 90° CCW

**Complexity:** Low (canvas transforms)

---

## Implementation Priority for Gaming Focus

### Phase 1: Essential (Do First)
1. ✅ Download PNG with transparency
2. ✅ Alpha channel handling
3. ✅ Preset color palettes (NES, GB, PICO-8)
4. ✅ Multiple export sizes
5. ✅ Grid overlay

**Impact:** Makes tool actually useful for game dev
**Effort:** ~8-12 hours

---

### Phase 2: High Value (Do Next)
6. ✅ Background preview options
7. ✅ Dithering support
8. ✅ Sprite outline/border
9. ✅ Actual size preview
10. ✅ Color count display

**Impact:** Professional features that set tool apart
**Effort:** ~12-16 hours

---

### Phase 3: Power Features (Do Later)
11. ✅ Quick variations panel
12. ✅ Preset save/load
13. ✅ Batch processing
14. ✅ Crop/trim tools
15. ✅ Rotate & flip

**Impact:** Power user features
**Effort:** ~20-24 hours

---

### Phase 4: Advanced (If Time Permits)
16. ✅ Animation frame support
17. ✅ Edge detection
18. ✅ Histogram
19. ✅ Custom palette upload

**Impact:** Specialized workflows
**Effort:** ~16-20 hours

---

## Suggested UI Layout (Still Single File)

```
┌─────────────────────────────────────────────────────────────┐
│  🎮 Image Pixelator - Gaming Asset Creator                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  📁 [Choose Image] or Drag & Drop                           │
│                                                              │
├──────────────────────┬──────────────────────────────────────┤
│  ⚙️ SETTINGS         │  🖼️ PREVIEW                         │
├──────────────────────┤                                      │
│                      │  ┌──────────┐  ┌──────────┐         │
│ Pixelation           │  │ Original │  │ Pixelated│         │
│ Scale: [8]           │  │          │  │          │         │
│ [1───────50]         │  │  Image   │  │  Result  │         │
│                      │  │          │  │          │         │
│ Color                │  └──────────┘  └──────────┘         │
│ Palette: [NES ▼]     │                                      │
│ Dithering: [None ▼]  │  View: [Fit ▼] Zoom: [100%]        │
│                      │  [✓] Show Grid (16×16)              │
│ Adjustments          │  BG: [Checkerboard ▼]               │
│ Brightness: [0]      │                                      │
│ Contrast: [0]        │                                      │
│ Hue: [0]             │                                      │
│ Saturation: [0]      │                                      │
│                      │                                      │
│ Transparency         │                                      │
│ Alpha Threshold: [5] │                                      │
│                      │                                      │
│ Effects              │                                      │
│ [✓] Outline (2px)    │                                      │
│ Color: [⚫]          │                                      │
│                      │                                      │
├──────────────────────┴──────────────────────────────────────┤
│  📤 EXPORT                                                  │
├─────────────────────────────────────────────────────────────┤
│  Sizes: [✓]1x [✓]2x [✓]4x [ ]8x                            │
│                                                              │
│  [Download 1x PNG] [Download 2x PNG] [Download All ZIP]    │
│  [Generate Variations] [Download Sprite Sheet]              │
│                                                              │
│  💾 Presets: [My Style ▼] [Save Current] [Load]            │
└─────────────────────────────────────────────────────────────┘
```

---

## Example Workflows

### Workflow 1: Character Sprite
1. Upload character artwork (PNG with transparency)
2. Select "PICO-8" palette
3. Set scale to 4
4. Enable grid overlay (16×16)
5. Add 2px black outline
6. Generate variations (light/dark/damaged)
7. Download all as sprite sheet

### Workflow 2: Environment Tiles
1. Upload texture photo
2. Set scale to 8
3. Select "NES" palette
4. Enable Floyd-Steinberg dithering (30%)
5. Enable grid (32×32)
6. Export at 1x, 2x, 4x sizes
7. Download as ZIP

### Workflow 3: UI Icons
1. Upload icon (512×512)
2. Set scale to 16 (results in 32×32)
3. Select "Game Boy" palette
4. Enable outline (1px white)
5. Preview on dark background
6. Download 1x, 2x for UI scaling

---

## Technical Considerations

### Keep Single-File Simple
- Use vanilla JavaScript (no build process)
- Embed palette data as const arrays
- Use data URLs for downloads
- LocalStorage for presets
- Consider JSZip from CDN for ZIP exports
- Keep total file under 50KB (excluding libraries)

### Performance
- Process images in Web Worker (optional, can be added later)
- Debounce slider inputs (300ms)
- Show loading spinner for large images
- Limit max dimensions (e.g., 4096×4096)

### Browser Compatibility
- Test in Chrome, Firefox, Safari, Edge
- Use feature detection for File API
- Graceful degradation for older browsers
- Mobile-responsive layout

---

## Palette Data Structure Example

```javascript
const PALETTES = {
  'NES': {
    name: 'NES (56 colors)',
    colors: [
      [124, 124, 124], [0, 0, 252], [0, 0, 188], // ... 56 total
    ]
  },
  'PICO-8': {
    name: 'PICO-8 (16 colors)',
    colors: [
      [0, 0, 0], [29, 43, 83], [126, 37, 83], // ... 16 total
    ]
  },
  'GAME_BOY': {
    name: 'Game Boy (4 colors)',
    colors: [
      [15, 56, 15], [48, 98, 48], [139, 172, 15], [155, 188, 15]
    ]
  }
};

function findNearestPaletteColor(r, g, b, palette) {
  let minDist = Infinity;
  let nearest = palette[0];

  for (const color of palette) {
    const dist = Math.sqrt(
      Math.pow(r - color[0], 2) +
      Math.pow(g - color[1], 2) +
      Math.pow(b - color[2], 2)
    );
    if (dist < minDist) {
      minDist = dist;
      nearest = color;
    }
  }

  return nearest;
}
```

---

## Success Metrics

A successful gaming-focused version would:
- ✅ Support transparent PNG export
- ✅ Offer 3+ retro game palettes
- ✅ Allow multi-size exports
- ✅ Show grid overlay for tiles
- ✅ Process images under 2MB in <1 second
- ✅ Generate sprite sheets
- ✅ Work on mobile devices
- ✅ Remain under 100KB total (excluding images)

---

## Comparison to Existing Tools

### vs. Photoshop/GIMP
- ✅ Faster for simple pixelation
- ✅ No installation
- ✅ Gaming-specific features
- ❌ Less powerful overall

### vs. Aseprite
- ❌ Not for drawing/animation
- ✅ Quick batch conversion
- ✅ Free and browser-based
- ✅ Good for non-artists

### vs. Online Converters
- ✅ Gaming palettes
- ✅ Transparency support
- ✅ Multi-size export
- ✅ Grid overlay
- ✅ More control

**Niche:** Quick, gaming-focused pixelation for developers who need assets but aren't pixel artists

---

## Conclusion

The key to making this a valuable **gaming asset tool** is:

1. **Actual output** (download PNG, not just view)
2. **Transparency support** (essential for sprites)
3. **Gaming palettes** (authentic retro look)
4. **Multiple sizes** (different resolutions)
5. **Grid overlay** (tile alignment)

These 5 features would transform it from a demo into a genuinely useful game dev tool, while still keeping it simple and single-file.

The additional features (dithering, outlines, variations, sprite sheets) would make it a professional-grade tool that could compete with paid alternatives.

**Recommended First Sprint:** Implement Phase 1 features (5 essential features) in ~8-12 hours of focused work.
