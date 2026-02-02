# 📐 Responsive Design Quick Reference

## Breakpoint Quick Reference

```
┌────────────────────────────────────────────────────────────────────┐
│                     BREAKPOINT QUICK REFERENCE                    │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  $breakpoint-xs: 320px   (extra small devices)                    │
│  $breakpoint-sm: 480px   (small devices)                          │
│  $breakpoint-md: 768px   (tablets)          ← Most common         │
│  $breakpoint-lg: 1024px  (small laptops)    ← Most common         │
│  $breakpoint-xl: 1280px  (desktops)                               │
│  $breakpoint-2xl: 1536px (large screens)                          │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

## Mixin Quick Reference

### Mobile-First (most common)
```scss
// Start with mobile, enhance for larger screens
.component {
  padding: 1rem;  // Default: mobile
  
  @include respond-to('md') {
    padding: 1.5rem;  // Tablets and up
  }
  
  @include respond-to('lg') {
    padding: 2rem;    // Desktops and up
  }
}
```

### Desktop-First (if needed)
```scss
// Start with desktop, reduce for smaller screens
.component {
  display: block;  // Default: visible
  
  @include respond-below('md') {
    display: none;    // Hide on tablets and smaller
  }
}
```

## Color Variables Quick Reference

```scss
// Primary colors
$color-primary: #0ea5a4;        // Main teal
$color-primary-light: #14b8a6;  // Light teal
$color-primary-dark: #0d9488;   // Dark teal

// Neutral colors
$color-white: #ffffff;
$color-dark: #1f2937;
$color-gray-muted: #64748b;    // Use for text

// Semantic colors
$color-primary-very-light: #f0fdfa;  // Backgrounds
$color-gray-300: #d1d5db;             // Borders
$color-gray-900: #1f2937;             // Dark text
```

## Spacing Variables Quick Reference

```scss
$spacing-xs:  0.25rem  (4px)
$spacing-sm:  0.5rem   (8px)
$spacing-md:  1rem     (16px)   ← Most common
$spacing-lg:  1.5rem   (24px)   ← Most common
$spacing-xl:  2rem     (32px)
$spacing-2xl: 2.5rem   (40px)
$spacing-3xl: 3rem     (48px)
$spacing-4xl: 4rem     (64px)
```

## Typography Variables Quick Reference

```scss
$font-size-xs:  0.75rem  (12px)
$font-size-sm:  0.875rem (14px)
$font-size-base: 1rem    (16px)  ← Default
$font-size-lg:  1.125rem (18px)
$font-size-xl:  1.25rem  (20px)
$font-size-2xl: 1.5rem   (24px)
$font-size-3xl: 1.875rem (30px)
$font-size-4xl: 2.25rem  (36px)
$font-size-5xl: 3rem     (48px)
```

## Common SCSS Patterns

### Pattern 1: Responsive Padding
```scss
.card {
  // Scales from 1rem (mobile) → 2rem (desktop)
  padding: clamp(1rem, 4vw, 2rem);
}
```

### Pattern 2: Responsive Font Size
```scss
.heading {
  @include responsive-text(
    $font-size-xl,      // Mobile: 1.25rem
    $font-size-3xl,     // Medium: 1.875rem
    $font-size-4xl      // Desktop: 2.25rem
  );
}
```

### Pattern 3: Responsive Grid
```scss
.gallery {
  @include grid-auto-fit(250px, $spacing-lg);
  // Mobile: adjusts columns to fit 250px minimum
  // Automatically scales on all devices
}
```

### Pattern 4: Responsive Breakpoint
```scss
.featured-section {
  display: grid;
  grid-template-columns: 1fr;  // Mobile: stacked
  gap: clamp(1rem, 4vw, 3rem);
  
  @include respond-to('md') {
    grid-template-columns: 1fr 1fr;  // Tablets: 2 columns
  }
}
```

## Device Sizes

```
┌──────────────────────────────────────────────────┐
│             COMMON DEVICE SIZES                 │
├──────────────────────────────────────────────────┤
│                                                  │
│  📱 Phones                                       │
│  ├─ Old (iPhone SE, etc.): 320px - 375px      │
│  ├─ Small (iPhone 12 mini): 375px             │
│  ├─ Standard (iPhone 12): 390px - 414px       │
│  └─ Large (iPhone 14 Pro Max): 430px - 480px  │
│                                                  │
│  📱 Tablets                                      │
│  ├─ Portrait: 480px - 600px                    │
│  ├─ Standard: 768px (iPad)                     │
│  └─ Landscape: 1024px - 1366px                 │
│                                                  │
│  💻 Desktops                                     │
│  ├─ Laptop: 1024px - 1366px                    │
│  ├─ Desktop: 1366px - 1920px                   │
│  ├─ Wide: 1920px - 2560px                      │
│  └─ Ultra-wide: 3440px+                        │
│                                                  │
└──────────────────────────────────────────────────┘
```

## Component Responsive Patterns

### Home Component
```
320px (mobile)         768px (tablet)        1024px (desktop)
─────────────          ──────────────────    ─────────────────
Hero: 250px tall       Featured: 2-col       Navigation: 3-col
Cards: 1-col           Cards: 2-col          Cards: 3-col
Highlights: 1-col      Highlights: 2-col     Highlights: 3-col
```

### Card Component
```
Mobile                Tablet                 Desktop
──────                ──────                 ───────
Padding: 1rem         Padding: 1.25rem       Padding: 1.5rem
Image: 120px          Image: 180px           Image: 150px
Title: 1rem           Title: 1.125rem        Title: 1.25rem
```

### Gallery Component
```
Mobile    Tablet        Desktop
──────    ──────        ───────
2 cols    Auto-fit      4 cols
          (250px min)
```

## Quick Copy-Paste Snippets

### For New Component SCSS
```scss
/* New Component Styles - Responsive */

.component {
  // Base mobile styles
  padding: clamp(1rem, 4vw, 1.5rem);
  color: $color-gray-muted;
  
  // Enhance for tablets
  @include respond-to('md') {
    padding: $spacing-lg;
  }
  
  // Optimize for desktops
  @include respond-to('lg') {
    padding: $spacing-xl;
  }
}

.component-heading {
  @include responsive-text($font-size-lg, $font-size-2xl, $font-size-3xl);
  color: $color-primary;
}

.component-grid {
  @include grid-auto-fit(250px, $spacing-lg);
}
```

### For Responsive Typography Only
```scss
.heading {
  @include responsive-text($font-size-xl, $font-size-3xl, $font-size-4xl);
}
```

### For Responsive Grid
```scss
.grid-container {
  @include grid-auto-fit(200px, $spacing-lg);
}
```

### For Breakpoint Specific Styles
```scss
.featured {
  display: grid;
  grid-template-columns: 1fr;
  
  @include respond-to('md') {
    grid-template-columns: 1fr 1fr;
  }
}
```

## Testing in Browser

### Chrome DevTools
1. Press `F12` to open DevTools
2. Press `Ctrl+Shift+M` to enable device emulation
3. Select device or enter custom width
4. Test at: **320px, 480px, 768px, 1024px, 1280px**

### Responsive Design Tester
```
Open in browser: http://localhost:4200
Then test at different viewport sizes
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Styles not applying | Check @include respond-to() syntax |
| Text too small | Verify @include responsive-text() params |
| Grid wrong columns | Check @include grid-auto-fit() breakpoints |
| Colors wrong | Use $color-* variables, not hex codes |
| Spacing inconsistent | Use $spacing-* variables, not px |
| Media query not working | Ensure respond-to('md') not respond-to(768px) |

## Import Hierarchy

In any component SCSS file:
```scss
// Automatically available (imported in styles.scss):
// ✅ $color-* variables
// ✅ $spacing-* variables
// ✅ $font-size-* variables
// ✅ All @mixin definitions
// ✅ $breakpoint-* variables

// Use them directly (no @import needed):
.component {
  color: $color-primary;           // ✅ Works
  padding: $spacing-lg;             // ✅ Works
  font-size: $font-size-lg;        // ✅ Works
  @include respond-to('md') { }    // ✅ Works
}
```

## Performance Tips

1. ✅ Use `clamp()` instead of multiple breakpoints
2. ✅ Use mixins instead of writing media queries
3. ✅ Use CSS variables for dynamic theming
4. ✅ Lazy load images on mobile
5. ✅ Minimize JavaScript for faster parsing
