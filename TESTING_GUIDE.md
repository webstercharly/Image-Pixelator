# Image Pixelator - Testing Guide

**Version:** Phase 2 Complete
**Date:** November 2, 2025
**File:** index.html (1,268 lines, 50KB)

---

## Quick Test Checklist

### ✅ Basic Functionality
- [ ] File loads without JavaScript errors
- [ ] Can upload an image (PNG, JPG, GIF)
- [ ] Image displays in both panels
- [ ] All sliders move and update values
- [ ] Settings panel is visible and organized

### ✅ Phase 1 Features
- [ ] **PNG Download**: Can download 1x, 2x, 4x, 8x sizes
- [ ] **Transparency**: Alpha channel preserved in output
- [ ] **Palettes**: NES, Game Boy, PICO-8 palettes work
- [ ] **Grid Overlay**: Grid appears when enabled (8x8, 16x16, 32x32, 64x64)
- [ ] **Alpha Threshold**: Slider removes semi-transparent pixels

### ✅ Phase 2 Features
- [ ] **Dithering**: Floyd-Steinberg, Atkinson, Bayer all work
- [ ] **Outline**: Black outline appears around sprite edges
- [ ] **Background Preview**: Checkerboard, white, black, custom work
- [ ] **Variations**: Generate 8 variations with apply/download
- [ ] **Color Count**: Shows accurate unique color count
- [ ] **CSS Export**: Opens new window with CSS box-shadow

---

## Detailed Testing Procedures

### Test 1: Load & Display
**Purpose:** Verify basic file upload and display

1. Open `index.html` in browser
2. Check console for errors (F12)
3. Verify UI loads correctly:
   - Title: "🎮 Image Pixelator"
   - Settings panel visible
   - Two empty image containers

**Expected:** No console errors, clean UI

---

### Test 2: Image Upload & Processing
**Purpose:** Test core pixelation functionality

1. Click "Choose File"
2. Select a PNG image with transparency
3. Observe:
   - Original image appears in left panel
   - Pixelated version appears in right panel
   - Export section becomes visible
   - Color count updates

**Expected:** Both images display, no errors

**Test with:**
- Small image (64×64)
- Large image (1024×1024)
- Transparent PNG
- Opaque JPG
- Animated GIF (first frame only)

---

### Test 3: Color Palettes
**Purpose:** Verify palette quantization

1. Upload colorful test image
2. Select each palette:
   - NES (56 colors)
   - Game Boy (4 green shades)
   - Game Boy Color (32 colors)
   - PICO-8 (16 colors)
   - Commodore 64 (16 colors)

**Expected Results:**
- NES: Vibrant, classic Nintendo look
- Game Boy: 4 shades of green only
- PICO-8: Limited, indie game aesthetic
- Color count matches palette size (approximately)

**Visual Check:** Image should look retro/vintage

---

### Test 4: Dithering Algorithms
**Purpose:** Test dithering with gradients

1. Upload image with smooth gradients
2. Select "Game Boy" palette (4 colors)
3. Test each dithering method:
   - **None**: Hard color bands
   - **Floyd-Steinberg**: Smooth error diffusion
   - **Atkinson**: Lighter, more subtle
   - **Bayer**: Ordered pattern, checkerboard

**Expected:**
- None: Posterized look
- Floyd-Steinberg: Organic dithering
- Atkinson: Less dense than Floyd-Steinberg
- Bayer: Visible grid pattern

---

### Test 5: Sprite Outline
**Purpose:** Test edge detection and outline

1. Upload sprite with transparent background
2. Enable "Add Outline" checkbox
3. Test settings:
   - Thickness: 1px, 2px, 3px, 4px
   - Color: Black, White, Red

**Expected:**
- Outline appears only around non-transparent edges
- Thickness increases outline width
- Color changes outline color
- Outline is smooth and consistent

**Edge Cases:**
- Fully opaque image (no outline)
- Image with holes (outline around holes too)

---

### Test 6: Background Preview
**Purpose:** Test transparency preview options

1. Upload transparent sprite
2. Test each background:
   - **Checkerboard**: Gray/white pattern
   - **White**: Solid white
   - **Black**: Solid black
   - **Dark Gray**: #333333
   - **Custom**: Pick any color

**Expected:**
- Background changes immediately
- Checkerboard pattern visible
- Custom color picker works
- Sprite transparency visible against all backgrounds

---

### Test 7: Grid Overlay
**Purpose:** Test tile alignment visualization

1. Upload any image
2. Enable "Show Grid"
3. Test each grid size:
   - 8×8
   - 16×16
   - 32×32
   - 64×64

**Expected:**
- White semi-transparent grid lines appear
- Grid aligns to tile boundaries
- Dimension info shows tile count
- Example: "64×64 pixels (4×4 tiles at 16×16)"

---

### Test 8: Quick Variations
**Purpose:** Test variation generator

1. Upload test image
2. Adjust some settings (brightness, contrast)
3. Click "Generate Variations"
4. Wait for all 8 variations to appear

**Expected Variations:**
1. Original (current settings)
2. Light (brighter)
3. Dark (darker)
4. High Contrast (increased contrast)
5. Warm (hue shifted)
6. Cool (hue shifted opposite)
7. Vibrant (saturated)
8. Desaturated (gray)

**Test Actions:**
- Click "Apply" on variation → settings update
- Click "Download" on variation → PNG downloads
- All variations should be pixel art

---

### Test 9: Multi-Size Export
**Purpose:** Test PNG export at different scales

1. Upload small sprite (32×32)
2. Process with settings
3. Check export size checkboxes:
   - ✓ 1x
   - ✓ 2x
   - ✓ 4x
   - ✓ 8x
4. Download each individually
5. Click "Download All Selected"

**Expected:**
- 1x = 32×32 pixels
- 2x = 64×64 pixels (clean upscale)
- 4x = 128×128 pixels
- 8x = 256×256 pixels
- All maintain transparency
- "Download All" downloads all checked sizes

**File Check:**
- Open downloaded PNGs
- Verify dimensions
- Check no smoothing/blurring
- Transparency intact

---

### Test 10: CSS Export
**Purpose:** Test box-shadow CSS generation

1. Upload small image (16×16 or 32×32)
2. Process with settings
3. Click "Export as CSS Box-Shadow"

**Expected:**
- New window opens
- Pixel art visible as CSS
- "Copy CSS" button present
- CSS code in box-shadow property

**Manual Test:**
1. Click "Copy CSS"
2. Paste into browser console
3. Verify it's valid CSS

**Warning:** Large images (>64×64) will create huge CSS

---

### Test 11: Color Count Accuracy
**Purpose:** Verify color counting algorithm

**Test Cases:**

1. **Solid color image**
   - Upload: Red square
   - Expected: "Unique colors: 1"

2. **Two color image**
   - Upload: Half red, half blue
   - Expected: "Unique colors: 2"

3. **Palette mode**
   - Select "Game Boy" (4 colors)
   - Expected: "Unique colors: ≤4"

4. **With transparency**
   - Transparent background shouldn't count
   - Only visible pixels counted

---

### Test 12: Slider Value Updates
**Purpose:** Test real-time value display

**For each slider, verify:**
- Dragging updates the display value
- Value shows correct decimal places
- Image updates when released

**Sliders to test:**
- Scale: Shows integer (1-50)
- Bit Depth: Shows integer (1-8)
- Brightness: Shows decimal (-1.00 to 1.00)
- Contrast: Shows decimal
- Hue: Shows decimal
- Saturation: Shows decimal
- Lightness: Shows decimal
- Alpha Threshold: Shows integer (0-255)
- Outline Thickness: Shows integer (1-4)

---

### Test 13: Reset All Settings
**Purpose:** Test reset functionality

1. Change all settings:
   - Move all sliders
   - Change palette
   - Enable dithering
   - Enable outline
   - Enable grid
2. Click "Reset All Settings"

**Expected:**
- All sliders return to defaults:
  - Scale: 8
  - Bit Depth: 5
  - All adjustments: 0
  - Alpha Threshold: 5
- Palette: "Free (Bit Depth)"
- Dithering: "None"
- Outline: Unchecked
- Grid: Unchecked
- Background: Checkerboard

---

### Test 14: Browser Compatibility
**Purpose:** Test across browsers

**Test in:**
- ✓ Chrome/Edge (Chromium)
- ✓ Firefox
- ✓ Safari (if available)

**Features to verify:**
- File upload works
- Canvas rendering works
- Download triggers work
- Color pickers work
- New window (CSS export) opens

---

### Test 15: Performance Testing
**Purpose:** Test with large images

**Test Cases:**

1. **Small image (64×64)**
   - Processing: < 100ms
   - Variations: < 1 second

2. **Medium image (512×512)**
   - Processing: < 500ms
   - Variations: < 5 seconds

3. **Large image (2048×2048)**
   - Processing: May take several seconds
   - Browser may lag
   - Check for freezing

**Performance Tips:**
- Smaller scale = faster processing
- Dithering adds overhead
- Outline adds significant processing time

---

## Automated Validation Checks

### Code Validation
```bash
# Check for syntax errors
grep -n "function.*{$" index.html | wc -l  # Count functions

# Check all tags balanced
grep -c "<script>" index.html  # Should equal </script> count
grep -c "<div>" index.html     # Should be close to </div> count

# Check file size
ls -lh index.html

# Check line count
wc -l index.html
```

### JavaScript Console Tests

Open browser console and run:

```javascript
// Check all required DOM elements exist
console.log('File input:', document.getElementById('image-file'));
console.log('Palette select:', document.getElementById('palette-select'));
console.log('Dithering select:', document.getElementById('dithering-select'));
console.log('Export section:', document.getElementById('export-section'));

// Check PALETTES object loaded
console.log('NES palette:', PALETTES?.nes?.length, 'colors');
console.log('Game Boy palette:', PALETTES?.gameboy?.length, 'colors');
console.log('PICO-8 palette:', PALETTES?.pico8?.length, 'colors');

// Check functions defined
console.log('updateImages:', typeof updateImages);
console.log('downloadCanvasAsPNG:', typeof downloadCanvasAsPNG);
console.log('generateVariations:', typeof generateVariations);
console.log('applyDithering:', typeof applyDithering);
console.log('applyOutline:', typeof applyOutline);
```

---

## Bug Testing Checklist

### Edge Cases

- [ ] Upload non-image file → Should be rejected
- [ ] Upload very small image (1×1) → Should handle gracefully
- [ ] Upload very large image (4096×4096) → May be slow but shouldn't crash
- [ ] Rapidly change settings → Should debounce/throttle
- [ ] Click export before uploading image → Should be disabled or show message
- [ ] Enable outline on opaque image → Should do nothing
- [ ] Scale slider to 1 → Very pixelated (1×1 blocks)
- [ ] Scale slider to 50 → Nearly original
- [ ] Alpha threshold to 255 → Fully transparent
- [ ] Alpha threshold to 0 → All pixels visible

### Regression Tests (Previously Fixed Bugs)

- [ ] Body has correct class name (not "lass")
- [ ] Brightness/contrast uses parseFloat (not parseInt)
- [ ] No inline oninput handlers causing errors
- [ ] Color quantization uses correct formula
- [ ] Container titles persist after updates

---

## Manual Visual Inspection

### UI/UX Quality

**Check for:**
- [ ] All text readable and well-spaced
- [ ] Buttons have hover states
- [ ] Sliders have clear labels and values
- [ ] Settings organized logically
- [ ] Color info panel visible
- [ ] Variations grid displays properly (4 columns)
- [ ] Export buttons clearly labeled
- [ ] No layout breaking on window resize

**Typography:**
- [ ] Consistent font sizes
- [ ] Clear hierarchy (h1, h2, h3)
- [ ] Good contrast for readability

**Colors:**
- [ ] Blue buttons for downloads
- [ ] Green button for "Download All"
- [ ] Purple button for "Generate Variations"
- [ ] Gray button for "Reset"
- [ ] Indigo button for CSS export

---

## Success Criteria

### ✅ All Features Working
- File upload and preview
- All 5 palettes working
- All 3 dithering algorithms working
- Outline with edge detection
- Background preview (5 options)
- Grid overlay (4 sizes)
- Variations generator (8 variations)
- Multi-size PNG export (4 sizes)
- CSS box-shadow export
- Color count display
- Reset functionality

### ✅ No Critical Bugs
- No JavaScript console errors
- No broken downloads
- No UI layout breaks
- No data loss

### ✅ Performance Acceptable
- Small images (64×64): Instant
- Medium images (512×512): < 1 second
- Large images (2048×2048): < 10 seconds

### ✅ Cross-Browser Compatible
- Works in Chrome/Edge
- Works in Firefox
- Works in Safari (ideally)

---

## Known Limitations

### By Design
1. **Single file architecture** - No code splitting
2. **Client-side only** - No server processing
3. **No undo/redo** - Would require state management
4. **No drag-and-drop** - File picker only
5. **Large image performance** - JavaScript canvas limitations

### Browser Limitations
1. **File size** - Very large images may cause memory issues
2. **Download behavior** - Browser may block multiple rapid downloads
3. **CSS export size** - Huge CSS files for large images (>64×64)
4. **Canvas size limits** - Different browsers have different max canvas sizes

---

## Troubleshooting

### Issue: Image doesn't appear after upload
**Possible causes:**
- File is not an image format
- Image is corrupted
- Browser doesn't support format

**Solution:** Try different image, check console for errors

### Issue: Downloads don't work
**Possible causes:**
- Browser blocking downloads
- Popup blocker enabled

**Solution:** Allow downloads from localhost, disable popup blocker

### Issue: Processing is very slow
**Possible causes:**
- Image too large
- Dithering + outline both enabled

**Solution:** Reduce image size, disable dithering or outline

### Issue: Colors look wrong
**Possible causes:**
- Palette selected but expecting free mode
- Dithering creating unexpected patterns

**Solution:** Set palette to "Free (Bit Depth)", set dithering to "None"

### Issue: Variations don't generate
**Possible causes:**
- No image uploaded yet
- Settings haven't been initialized

**Solution:** Upload image, adjust a slider first

---

## Testing Report Template

```
Image Pixelator - Test Report
Date: ___________
Tester: ___________
Browser: ___________
OS: ___________

PASS/FAIL Summary:
[ ] Basic functionality
[ ] Phase 1 features (5)
[ ] Phase 2 features (6)
[ ] Performance acceptable
[ ] No critical bugs

Critical Issues Found:
1. ___________
2. ___________

Minor Issues Found:
1. ___________
2. ___________

Suggestions:
1. ___________
2. ___________

Overall Rating: ___ / 10
Recommendation: [ ] Ship it  [ ] Needs fixes  [ ] Major issues
```

---

## Quick Smoke Test (5 minutes)

**Minimal test to verify nothing is broken:**

1. Open index.html → No console errors ✓
2. Upload test image → Displays ✓
3. Change scale slider → Updates ✓
4. Select "PICO-8" palette → Changes colors ✓
5. Enable grid → Grid appears ✓
6. Download 1x PNG → File downloads ✓
7. Generate variations → 8 thumbnails appear ✓

**If all pass:** Tool is functional
**If any fail:** Debug that feature

---

**End of Testing Guide**
