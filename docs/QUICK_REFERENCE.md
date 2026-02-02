# ⚡ Quick Reference

## Common SCSS Patterns

**Responsive padding:**
```scss
padding: clamp(1rem, 4vw, 2rem);
```

**Breakpoint enhancement:**
```scss
@include respond-to('md') {
  grid-template-columns: 1fr 1fr;
}
```

**Responsive typography:**
```scss
@include responsive-text($font-size-xl, $font-size-2xl, $font-size-4xl);
```

**Auto-responsive grid:**
```scss
@include grid-auto-fit(250px, $spacing-lg);
```

## Variable Shortcuts

Colors: `$color-primary`, `$color-gray-muted`, `$color-white`  
Spacing: `$spacing-md`, `$spacing-lg`, `$spacing-xl`  
Typography: `$font-size-base`, `$font-size-lg`, `$font-size-2xl`  
Radius: `$radius-lg`, `$radius-xl`  
Shadows: `$shadow-lg`, `$shadow-xl`  

## Adding New Component

1. Create component files: `component.ts`, `component.html`, `component.scss`
2. Import variables/mixins automatically (already in styles.scss)
3. Use `@include respond-to('md')` for breakpoints
4. Reference variables: `$color-*`, `$spacing-*`
5. Use `@include responsive-text()` for typography

See RESPONSIVE.md for detailed system info.
