# Component Responsive Architecture

## Component Hierarchy & Responsive Patterns

```
App Root
├── app.component.ts
│   └── Layout wrapper with language switching
│
└── Home Page
    └── home.component.ts (~50 lines - data only)
        ├── template: home.component.html (extracted)
        ├── styles: home.component.scss (responsive)
        │
        └── Child Components:
            │
            ├── [1] Hero Section (inline in home.component.html)
            │   └── home.component.scss:
            │       - height: clamp(250px, 60vh, 400px)
            │       - Hero content padding responsive
            │       - Featured section switches layout at md
            │
            ├── [2] app-section (SectionComponent)
            │   ├── section.component.ts (wrapper)
            │   ├── section.component.html (extracted)
            │   ├── section.component.scss (responsive)
            │   │
            │   └── Features for "Featured" section:
            │       - Padding: clamp(2rem, 8vw, 4rem)
            │       - Background gradient
            │
            ├── [3] app-tiles (TilesComponent)
            │   ├── tiles.component.ts (grid system)
            │   └── tiles.component.scss (responsive)
            │       ├── .cols-3: auto-fit → 2 cols → 3 cols
            │       ├── .cols-2: 1 col → 2 cols
            │       └── .cols-4: 1 col → 2 cols → 4 cols
            │
            ├── [4] app-card (CardComponent) × multiple
            │   ├── card.component.ts (~15 lines)
            │   ├── card.component.html (extracted)
            │   ├── card.component.scss (responsive)
            │   │
            │   └── Responsive Features:
            │       - Padding: clamp(1rem, 3vw, 1.5rem)
            │       - Image height: clamp(120px, 40vw, 150px)
            │       - Title: @include responsive-text(sm, lg, xl)
            │
            └── [5] app-gallery (GalleryComponent)
                ├── gallery.component.ts
                ├── gallery.component.html
                └── gallery.component.scss (responsive)
                    ├── Mobile: 2 columns
                    ├── Tablet: auto-fit 250px
                    └── Desktop: 4 columns
```

## Responsive Breakpoint Flow

```
┌─────────────────────────────────────────────────────────┐
│                    320px - 480px (Mobile)               │
├─────────────────────────────────────────────────────────┤
│  Hero Height: 250px                                     │
│  Navigation Grid: 1 column                              │
│  Featured Section: Stacked (1 col)                      │
│  Feature Cards: 1 column                                │
│  Highlight Items: 1 column                              │
│  Gallery: 2 columns                                     │
│  Card Padding: 1rem                                     │
│  Typography: Small (responsive-text mixins)            │
└─────────────────────────────────────────────────────────┘
                             ↓
              @include respond-to('md')
                             ↓
┌─────────────────────────────────────────────────────────┐
│               768px - 1023px (Tablet)                   │
├─────────────────────────────────────────────────────────┤
│  Hero Height: 300px                                     │
│  Navigation Grid: 2 columns                             │
│  Featured Section: 2 columns (side-by-side)            │
│  Feature Cards: 2 columns                               │
│  Highlight Items: 2 columns                             │
│  Gallery: auto-fit (250px minimum)                      │
│  Card Padding: 1.25rem                                  │
│  Typography: Medium (clamp scaling)                     │
└─────────────────────────────────────────────────────────┘
                             ↓
              @include respond-to('lg')
                             ↓
┌─────────────────────────────────────────────────────────┐
│            1024px+ (Desktop & Larger)                   │
├─────────────────────────────────────────────────────────┤
│  Hero Height: 400px                                     │
│  Navigation Grid: 3 columns                             │
│  Featured Section: 2 columns (optimized)               │
│  Feature Cards: 3 columns                               │
│  Highlight Items: 3-4 columns                           │
│  Gallery: 4 columns                                     │
│  Card Padding: 1.5rem                                   │
│  Typography: Large (responsive-text mixins)            │
│  Container: max-width 1200px, centered                 │
└─────────────────────────────────────────────────────────┘
```

## Mixin Usage Patterns

### Pattern 1: Mobile-First Enhancement
```scss
.component {
  // Base mobile styles
  padding: 1rem;
  font-size: 1rem;
  
  // Enhance for tablets
  @include respond-to('md') {
    padding: 1.5rem;
    font-size: 1.125rem;
  }
  
  // Optimize for desktops
  @include respond-to('lg') {
    padding: 2rem;
    font-size: 1.25rem;
  }
}
```

### Pattern 2: Fluid Scaling (No Breakpoint)
```scss
.heading {
  // Automatically scales between mobile/desktop
  // No @media queries needed - CSS does the work
  @include responsive-text(
    $font-size-2xl,   // 1.5rem on mobile
    $font-size-3xl,   // 1.875rem on medium
    $font-size-4xl    // 2.25rem on desktop
  );
  // Internally uses: clamp($min, $vw, $max)
}
```

### Pattern 3: Auto-Responsive Grid
```scss
.gallery {
  // Automatically determines columns based on container width
  // No manual media queries!
  @include grid-auto-fit(
    250px,           // Minimum column width
    $spacing-lg      // Gap between items
  );
  // Generates: grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))
}
```

### Pattern 4: Desktop-First (if needed)
```scss
.sidebar {
  // Default: full width on all screens
  width: 100%;
  
  // Hide on small screens
  @include respond-below('md') {
    display: none;
  }
}
```

## Variable References Across Components

```
_variables.scss (Single Source of Truth)
    ↓
    ├── Colors
    │   ├── $color-primary → Used in: hero, cards, sections
    │   ├── $color-gray-muted → Used in: text, descriptions
    │   └── $color-white → Used in: backgrounds, overlays
    │
    ├── Spacing
    │   ├── $spacing-md → Used in: card padding, gaps
    │   ├── $spacing-lg → Used in: grid gaps, margins
    │   └── $spacing-2xl → Used in: section padding
    │
    ├── Typography
    │   ├── $font-size-sm → Used in: descriptions, small text
    │   ├── $font-size-base → Used in: body text
    │   └── $font-size-2xl+ → Used in: headings
    │
    ├── Shadows
    │   ├── $shadow-md → Used in: cards
    │   └── $shadow-lg → Used in: hover states
    │
    └── Radius
        └── $radius-lg → Used in: cards, images, sections

_mixins.scss (Reusable Logic)
    ↓
    ├── Responsive Queries
    │   ├── respond-to('md') → Used in: all components
    │   ├── respond-to('lg') → Used in: gallery, home
    │   └── respond-below('sm') → Used in: card, section
    │
    ├── Typography
    │   ├── responsive-text() → Used in: all headings
    │   └── truncate → Used in: text overflow
    │
    ├── Layout
    │   ├── grid-auto-fit() → Used in: gallery
    │   └── flex-center → Used in: cards, overlays
    │
    └── Utilities
        ├── transition() → Used in: hover effects
        ├── card → Used in: card component
        └── sr-only → Used in: accessibility

home.component.scss
    ├── Uses: all variables, all mixins
    └── Contains: hero, featured, features, highlights styles

card.component.scss
    ├── Uses: color, spacing, typography variables
    └── Uses: responsive-text, transition, card mixin

tiles.component.scss
    ├── Uses: spacing, color variables
    └── Uses: respond-to, grid-auto-fit mixins

section.component.scss
    ├── Uses: all typography, color variables
    └── Uses: responsive-text, container mixin

gallery.component.scss
    ├── Uses: radius, color, shadow variables
    └── Uses: grid-auto-fit, responsive-text mixins
```

## File Dependencies

```
styles/
├── _variables.scss ◄─── No dependencies
│
├── _mixins.scss ◄─────── Depends on: _variables
│
├── animations.scss ◄──── No dependencies (but referenced in utilities)
│
├── utilities.scss ◄───── Depends on: _variables, _mixins
│
└── styles.scss ◄─────── Imports:
    1. _variables      (tokens)
    2. _mixins         (logic)
    3. animations      (keyframes)
    4. utilities       (classes)
    5. Global resets

app/common/components/
├── card/
│   └── card.component.scss ◄─── Depends on: _variables, _mixins
├── tiles/
│   └── tiles.component.scss ◄─── Depends on: _variables, _mixins
├── section/
│   └── section.component.scss ◄─ Depends on: _variables, _mixins
└── gallery/
    └── gallery.component.scss ◄─ Depends on: _variables, _mixins

app/pages/home/
└── home.component.scss ◄───── Depends on: _variables, _mixins
```

## Performance Characteristics

| Aspect | Benefit |
|--------|---------|
| **CSS Bundle** | Mixins reduce duplication ~15% |
| **Maintainability** | Change breakpoints 1 place, apply everywhere |
| **Scaling** | New components inherit responsive system |
| **Runtime** | No JavaScript viewport listeners needed |
| **Accessibility** | sr-only and disabled mixins included |
| **Responsiveness** | clamp() eliminates many breakpoint queries |

---

**Architecture Benefits**:
- ✅ Single responsibility (variables, mixins, components)
- ✅ DRY principle (no duplicated breakpoints/values)
- ✅ Component reusability (4 core components)
- ✅ Future-proof (easy to add new pages)
- ✅ Performance optimized (mixin reuse)
