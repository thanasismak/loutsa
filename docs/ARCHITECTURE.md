# 🏗️ Component Architecture

## Component Hierarchy

```
App Root
├── Home Page
│   ├── Hero Section (inline)
│   ├── app-section (Featured)
│   ├── app-tiles (Navigation Cards)
│   │   └── app-card (x9)
│   ├── app-tiles (Features)
│   │   └── app-card (x3)
│   └── app-tiles (Highlights)
│       └── app-card (x3)
```

## Responsive Patterns

**Mobile**: 1 column  
**Tablet**: 2-3 columns  
**Desktop**: 3-4 columns  

All components use `@include respond-to()` mixins for breakpoint handling.

## Files

| Component | Files |
|-----------|-------|
| Home | `home.component.ts/html/scss` |
| Card | `card.component.ts/html/scss` |
| Gallery | `gallery.component.ts/scss` |
| Section | `section.component.ts/scss` |
| Tiles | `tiles.component.ts/scss` |

All in `src/app/` directory.

See RESPONSIVE.md for styling patterns.
