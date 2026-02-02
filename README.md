# 🏕️ Loutsa - Camping Site

Angular 19 standalone component application for a camping resort website with responsive design, multi-language support (Greek/English), and animations.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm start

# Navigate to http://localhost:4200
```

## 📱 Responsive Design

Mobile-first responsive system with support for all devices:
- ✅ 320px - 1536px+ screen sizes
- ✅ Centralized design tokens (variables, colors, spacing)
- ✅ Reusable responsive mixins
- ✅ Auto-responsive grid layouts

**For detailed responsive design info**: See [docs/RESPONSIVE.md](docs/RESPONSIVE.md)

## 🌐 Internationalization

- Greek (default) and English support
- Language toggle with flag icons
- All content properly translated using ngx-translate

## 🎨 Design System

**Design Tokens** (`src/styles/_variables.scss`):
- 8 responsive breakpoints
- 16+ semantic colors
- Spacing scale (xs-4xl)
- Typography scale (xs-5xl)
- Shadows, radius, transitions

**Responsive Mixins** (`src/styles/_mixins.scss`):
- `@include respond-to('md')` - Mobile-first queries
- `@include grid-auto-fit()` - Auto-responsive grids
- `@include responsive-text()` - Adaptive typography
- 18+ utility mixins total

## 📁 Project Structure

```
src/
├── styles/
│   ├── _variables.scss       (Design tokens)
│   ├── _mixins.scss          (Responsive mixins)
│   ├── utilities.scss        (Utility classes)
│   └── styles.scss           (Global imports)
├── app/
│   ├── pages/
│   │   └── home/             (Landing page)
│   └── common/
│       └── components/       (Reusable components)
│           ├── card/         (Card component)
│           ├── gallery/      (Gallery grid)
│           ├── section/      (Section container)
│           └── tiles/        (Grid system)
└── assets/
    └── i18n/                 (Translation files)
```

## 🧩 Core Components

### Card Component
Reusable card with optional image, icon, and link routing.

### Gallery Component
Responsive image gallery with hover overlays and staggered animations.

### Section Component
Semantic section wrapper with optional header and theme variants (featured, dark, highlight).

### Tiles Component
Responsive grid system supporting 2, 3, or 4 column layouts that adapt to screen size.

## 🛠️ Tech Stack

- **Angular**: 19 (standalone components, signals, effects)
- **TypeScript**: 5.6 (strict mode)
- **SCSS**: 3 (variables, mixins, responsive design)
- **i18n**: ngx-translate with HTTP loader
- **Build**: Angular CLI with Vite

## 📚 Documentation

### Main Documentation (In PROJECT_NOTES folder)
All comprehensive project documentation has been organized in the `PROJECT_NOTES/` folder:

- **[PROJECT_NOTES/INDEX.md](PROJECT_NOTES/INDEX.md)** ⭐ **START HERE** - Master index and navigation
- **[PROJECT_NOTES/01_COMPLETE_SUMMARY.md](PROJECT_NOTES/01_COMPLETE_SUMMARY.md)** - Complete project overview
- **[PROJECT_NOTES/02_COMPONENT_ARCHITECTURE.md](PROJECT_NOTES/02_COMPONENT_ARCHITECTURE.md)** - Component structure & patterns
- **[PROJECT_NOTES/03_FINAL_CHECKLIST.md](PROJECT_NOTES/03_FINAL_CHECKLIST.md)** - Feature verification checklist
- **[PROJECT_NOTES/04_IMPLEMENTATION_REPORT.md](PROJECT_NOTES/04_IMPLEMENTATION_REPORT.md)** - Project metrics & achievements
- **[PROJECT_NOTES/05_QUICK_REFERENCE.md](PROJECT_NOTES/05_QUICK_REFERENCE.md)** - Developer cheat sheet
- **[PROJECT_NOTES/06_README_RESPONSIVE.md](PROJECT_NOTES/06_README_RESPONSIVE.md)** - Responsive design quick start
- **[PROJECT_NOTES/07_TESTING_CHECKLIST.md](PROJECT_NOTES/07_TESTING_CHECKLIST.md)** - Testing procedures & verification

### Additional Resources
- **[docs/RESPONSIVE.md](docs/RESPONSIVE.md)** - Responsive design system details
- **[docs/TESTING.md](docs/TESTING.md)** - Testing breakpoints and validation
- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** - System architecture overview
- **[docs/QUICK_REFERENCE.md](docs/QUICK_REFERENCE.md)** - Code snippets & common patterns

### Quick Navigation by Role

**👨‍💻 Developers**: Start with [PROJECT_NOTES/INDEX.md](PROJECT_NOTES/INDEX.md) → Read [02_COMPONENT_ARCHITECTURE.md](PROJECT_NOTES/02_COMPONENT_ARCHITECTURE.md) → Keep [05_QUICK_REFERENCE.md](PROJECT_NOTES/05_QUICK_REFERENCE.md) handy

**🧪 QA Engineers**: Read [03_FINAL_CHECKLIST.md](PROJECT_NOTES/03_FINAL_CHECKLIST.md) → Use [07_TESTING_CHECKLIST.md](PROJECT_NOTES/07_TESTING_CHECKLIST.md)

**👥 Project Managers**: Check [04_IMPLEMENTATION_REPORT.md](PROJECT_NOTES/04_IMPLEMENTATION_REPORT.md) → Review [01_COMPLETE_SUMMARY.md](PROJECT_NOTES/01_COMPLETE_SUMMARY.md)

*Note: Detailed reports also available in docs folder for reference*

## 🎯 Next Steps

- [ ] Test responsive design at all breakpoints
- [ ] Implement About page
- [ ] Implement Pricing page
- [ ] Implement Contact form
- [ ] Add mobile hamburger menu
- [ ] Performance optimization

## ✅ Status

- ✅ Responsive design system complete
- ✅ Translation system working
- ✅ Reusable component library
- ✅ Home page fully featured
- ✅ Ready for additional page development

---

**Ready to build!** 🚀 See [docs/](docs/) for detailed information.
