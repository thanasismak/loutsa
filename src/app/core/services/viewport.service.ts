import { Injectable, signal, computed, OnDestroy } from '@angular/core';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

@Injectable({
  providedIn: 'root',
})
export class ViewportService implements OnDestroy {
  private readonly BREAKPOINTS = {
    xs: 0,
    sm: 480,
    md: 640,      // Mobile/tablet boundary
    lg: 1024,     // Tablet range
    xl: 1280,     // Desktop starts here (1280px+)
    '2xl': 1536,
  };

  // Primary signals - width and height update on resize
  readonly width = signal<number>(this.getWidth());
  readonly height = signal<number>(this.getHeight());

  // Computed breakpoint - derives reactively from width signal
  readonly breakpoint = computed(() => this.getBreakpointForWidth(this.width()));

  // Computed device categories - auto-update when width changes
  readonly isMobile = computed(() => this.width() < 640);           // xs, sm
  readonly isTablet = computed(() => this.width() >= 640 && this.width() < 1280);  // md, lg  
  readonly isDesktop = computed(() => this.width() >= 1280);        // xl, 2xl

  // Computed individual breakpoint checks
  readonly isXs = computed(() => this.width() < this.BREAKPOINTS.sm);
  readonly isSm = computed(() => this.width() >= this.BREAKPOINTS.sm && this.width() < this.BREAKPOINTS.md);
  readonly isMd = computed(() => this.width() >= this.BREAKPOINTS.md && this.width() < this.BREAKPOINTS.lg);
  readonly isLg = computed(() => this.width() >= this.BREAKPOINTS.lg && this.width() < this.BREAKPOINTS.xl);
  readonly isXl = computed(() => this.width() >= this.BREAKPOINTS.xl && this.width() < this.BREAKPOINTS['2xl']);
  readonly is2xl = computed(() => this.width() >= this.BREAKPOINTS['2xl']);

  private resizeListener!: () => void;

  constructor() {
    this.setupResizeListener();
    this.setupEffects();
    
    // Force initial signal update to ensure correct viewport is captured
    if (typeof window !== 'undefined') {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        this.width.set(this.getWidth());
        this.height.set(this.getHeight());
      });
    }
  }

  private setupResizeListener(): void {
    if (typeof window === 'undefined') return;

    this.resizeListener = () => {
      this.width.set(this.getWidth());
      this.height.set(this.getHeight());
    };

    // Listen to multiple viewport change events for comprehensive coverage
    window.addEventListener('resize', this.resizeListener);
    window.addEventListener('orientationchange', this.resizeListener);
    
    // Catch DevTools mobile emulation and visualViewport changes
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', this.resizeListener);
      window.visualViewport.addEventListener('scroll', this.resizeListener);
    }
  }

  private setupEffects(): void {
    // No effects needed - all breakpoint signals are computed() and auto-derive from width
  }

  private getWidth(): number {
    return typeof window !== 'undefined' ? window.innerWidth : 1024;
  }

  private getHeight(): number {
    return typeof window !== 'undefined' ? window.innerHeight : 768;
  }



  private getBreakpointForWidth(width: number): Breakpoint {
    if (width < this.BREAKPOINTS.sm) return 'xs';
    if (width < this.BREAKPOINTS.md) return 'sm';
    if (width < this.BREAKPOINTS.lg) return 'md';
    if (width < this.BREAKPOINTS.xl) return 'lg';
    if (width < this.BREAKPOINTS['2xl']) return 'xl';
    return '2xl';
  }

  /**
   * Check if current width is at or above a specific breakpoint
   */
  isAtBreakpoint(breakpoint: Breakpoint): boolean {
    return this.width() >= this.BREAKPOINTS[breakpoint];
  }

  /**
   * Check if current width is below a specific breakpoint
   */
  isBelowBreakpoint(breakpoint: Breakpoint): boolean {
    return this.width() < this.BREAKPOINTS[breakpoint];
  }

  /**
   * Get breakpoint value in pixels
   */
  getBreakpointValue(breakpoint: Breakpoint): number {
    return this.BREAKPOINTS[breakpoint];
  }

  ngOnDestroy(): void {
    if (typeof window === 'undefined' || !this.resizeListener) return;
    
    window.removeEventListener('resize', this.resizeListener);
    window.removeEventListener('orientationchange', this.resizeListener);
    
    if (window.visualViewport) {
      window.visualViewport.removeEventListener('resize', this.resizeListener);
      window.visualViewport.removeEventListener('scroll', this.resizeListener);
    }
  }
}
