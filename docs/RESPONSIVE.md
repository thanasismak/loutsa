# 📋 Responsive Design System

## Breakpoints
```scss
xs: 320px    (phones)
sm: 480px    (small phones)
md: 768px    (tablets)
lg: 1024px   (laptops)
xl: 1280px   (desktops)
2xl: 1536px  (wide)
```

## Key Mixins

**Mobile-first approach:**
```scss
.component {
  padding: 1rem;
  
  @include respond-to('md') {
    padding: 1.5rem;
  }
}
```

**Responsive typography:**
```scss
.heading {
  @include responsive-text($font-size-xl, $font-size-2xl, $font-size-4xl);
}
```

**Auto-responsive grid:**
```scss
.gallery {
  @include grid-auto-fit(250px, $spacing-lg);
}
```

## Files Reference
- Variables: `src/styles/_variables.scss`
- Mixins: `src/styles/_mixins.scss`
- Utilities: `src/styles/utilities.scss`

See full docs in parent folder for implementation details.
