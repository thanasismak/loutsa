# Loutsa Project - Next Steps TODO

## COMPLETED - Phase 2: All Pages Refactored (Component-Based Architecture)

### Phase 2 Summary - All Pages Converted ✅
Pages refactored with SectionComponent wrapper + component-based architecture:
- ✅ **Things-to-do**: Now uses SectionComponent + TilesComponent with data signal
- ✅ **Gallery**: Now uses SectionComponent + GalleryComponent with images signal
- ✅ **Contact**: Now uses SectionComponent wrapper, maintains form structure
- ✅ **How-to-reach**: Now uses SectionComponent wrapper for directions content
- ✅ **Rules**: Now uses SectionComponent wrapper with list items
- ✅ **FAQ**: Now uses SectionComponent wrapper with FAQ items

All pages follow clean component pattern:
- No raw `<section class="card">` wrapper - uses `<app-section>`
- No duplicate `.card` styles - removed from individual pages
- Data-driven where possible (signals for arrays)
- Consistent styling through theme tokens
- Zero hardcoded colors - all use CSS variables

### Theme System Completed ✅
- **Theme Tokens** (_variables.scss): $theme-primary, $theme-secondary, $theme-accent, $theme-light, $gradient-*
- **Theme Utilities** (utilities.scss): .bg-primary, .text-accent, .border-left-primary, .shadow-primary, etc.
- **Home Page**: Removed scroll listeners, now uses HeroComponent
- **Pricing/Facilities**: Data-driven with signals + component-based
- **All Components**: Reference theme tokens instead of hardcoded colors

---

## Priority Tasks

### 1. Fix Other Navigation's Page Content
- [x] About page - uses component-based architecture with HeroComponent, CardsGridComponent, StoryComponent, MissionValuesComponent, StatsComponent
- [x] Contact page - enhanced with Section wrapper, contact form, location info
- [x] Facilities page - component-based, data-driven facility descriptions
- [x] FAQ page - component-based with Section wrapper and FAQ items
- [x] Pricing page - component-based, data-driven pricing tiers
- [x] Rules page - component-based list with Section wrapper
- [x] Things to Do page - component-based with tiles and data signal
- [x] How to Reach page - component-based with Section wrapper
- [x] Gallery page - refactored to use GalleryComponent with items signal

**Status:** COMPLETE ✅

---

### 2. Viewport Service for Signal-based Responsiveness
- [ ] Create `viewport.service.ts` to track window size changes
- [ ] Implement signals for breakpoint detection (xs, sm, md, lg, xl, 2xl)
- [ ] Add helper methods: `isMobile()`, `isTablet()`, `isDesktop()`, `isScreenSize(breakpoint)`
- [ ] Implement resize listener with RAF optimization
- [ ] Create injectable service available across app
- [ ] Replace hardcoded media queries with signal-based logic where needed
- [ ] Add tests for different breakpoints

**Effort:** Low (1.5-2 hours)
**Location:** `src/app/common/services/viewport.service.ts`
**Benefits:** Cleaner responsiveness management, reusable across components

---

### 3. Contact Form with Responsive Map Integration
- [ ] Build robust contact form (name, email, message, phone, subject)
- [ ] Add form validation and error handling
- [ ] Integrate map component (Google Maps or Leaflet)
- [ ] Display Loutsa location on map with markers
- [ ] Make map responsive (resize with viewport)
- [ ] Add form submission handling (email integration or backend)
- [ ] Style form and map for mobile/tablet/desktop
- [ ] Add accessibility (ARIA labels, keyboard navigation)

**Effort:** Medium-High (3-4 hours)
**Components Needed:** 
- ContactFormComponent
- MapComponent (or GoogleMaps integration)
**Dependencies:** Map API key (Google Maps or similar)

---

### 4. Find Purposeful Ideas/Sections for Company Value
- [ ] Research competitor beach/resort websites
- [ ] Identify what customers want/expect
- [ ] Consider adding:
  - [ ] Sustainability/eco-friendly practices section
  - [ ] Special packages/seasonal offers
  - [ ] Member loyalty program
  - [ ] Photo gallery with user-generated content
  - [ ] Blog/news section
  - [ ] Events/activities calendar
  - [ ] Weather/water conditions widget
  - [ ] Guest testimonials section (we have this - enhance it)
  - [ ] "Things to Pack" guide
  - [ ] Local area recommendations
  - [ ] Safety/health guidelines

**Effort:** Low (1-2 hours research)
**Outcome:** List of 2-3 high-value features to prioritize

---

### 5. Add Reasonable/Purposeful Services
Based on #4 findings, add service sections such as:
- [ ] Equipment rental (umbrellas, loungers, etc.)
- [ ] Water sports/activities
- [ ] Food & beverage options
- [ ] Parking facilities
- [ ] WiFi availability
- [ ] Lifeguard services
- [ ] Beach cleaning/maintenance
- [ ] Event hosting/private gatherings
- [ ] Photography services
- [ ] Relaxation/spa services

**Effort:** Medium (2-3 hours)
**Integration:** Create ServiceCard components, update pricing, add to facilities page

---

## Implementation Order (Recommended)

1. **Week 1:** Fix navigation page content (#1) - Content-heavy, no dependencies
2. **Week 1:** Viewport Service (#2) - Quick win, helps with #3
3. **Week 2:** Contact Form + Map (#3) - Uses viewport service
4. **Week 2:** Research value-add ideas (#4) - Inform #5
5. **Week 3:** Implement services (#5) - Based on research findings

---

## Additional Notes

### SEO Integration
- Add meta titles & descriptions to all pages
- Schema markup for LocalBusiness, FAQ, Services
- Keywords naturally in content

### Code Quality
- Maintain standalone components pattern
- Use signals for state management
- Keep services injectable and reusable
- Add TypeScript interfaces for all models

### Testing
- Add unit tests for viewport service
- Test responsive layouts across breakpoints
- Form validation tests

---

## Current Status

✅ **COMPLETED:**
- Project documentation organized (PROJECT_NOTES)
- Testimonials carousel (6 items, auto-rotation)
- Home component refactored (cleaner architecture)
- CarouselComponent with service injection
- Border-radius variables added
- Testimonials grid styling

⏳ **IN PROGRESS:**
- None currently

❌ **NOT STARTED:**
- All 5 items in this TODO

---

## Questions to Answer Before Starting

1. **Map Provider:** Google Maps API or free alternative (Leaflet)?
2. **Contact Form Backend:** Email integration or database?
3. **High-Priority Services:** Which 3-4 services to focus on first?
4. **Content Timeline:** Who will provide page content?

