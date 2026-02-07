import { Injectable, signal, effect, OnDestroy } from '@angular/core';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

@Injectable({
  providedIn: 'root',
})
export class ViewportService implements OnDestroy {
  private readonly BREAKPOINTS = {
    xs: 0,
    sm: 480,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  };

  // Signals
  readonly width = signal<number>(this.getWidth());
  readonly height = signal<number>(this.getHeight());
  readonly isMobile = signal<boolean>(this.getWidth() < 768);
  readonly isTablet = signal<boolean>(this.getWidth() >= 768 && this.getWidth() < 1024);
  readonly isDesktop = signal<boolean>(this.getWidth() >= 1024);
  readonly breakpoint = signal<Breakpoint>(this.getBreakpoint());

  // Computed breakpoint checks
  readonly isXs = signal<boolean>(this.width() < this.BREAKPOINTS.sm);
  readonly isSm = signal<boolean>(this.width() >= this.BREAKPOINTS.sm && this.width() < this.BREAKPOINTS.md);
  readonly isMd = signal<boolean>(this.width() >= this.BREAKPOINTS.md && this.width() < this.BREAKPOINTS.lg);
  readonly isLg = signal<boolean>(this.width() >= this.BREAKPOINTS.lg && this.width() < this.BREAKPOINTS.xl);
  readonly isXl = signal<boolean>(this.width() >= this.BREAKPOINTS.xl && this.width() < this.BREAKPOINTS['2xl']);
  readonly is2xl = signal<boolean>(this.width() >= this.BREAKPOINTS['2xl']);

  private resizeListener!: () => void;

  constructor() {
    this.setupResizeListener();
    this.setupEffects();
  }

  private setupResizeListener(): void {
    if (typeof window === 'undefined') return;

    this.resizeListener = () => {
      this.width.set(this.getWidth());
      this.height.set(this.getHeight());
    };

    window.addEventListener('resize', this.resizeListener);
  }

  private setupEffects(): void {
    // Update derived signals when width changes
    effect(() => {
      const w = this.width();
      this.breakpoint.set(this.getBreakpointForWidth(w));
      this.isMobile.set(w < 768);
      this.isTablet.set(w >= 768 && w < 1024);
      this.isDesktop.set(w >= 1024);
      this.isXs.set(w < this.BREAKPOINTS.sm);
      this.isSm.set(w >= this.BREAKPOINTS.sm && w < this.BREAKPOINTS.md);
      this.isMd.set(w >= this.BREAKPOINTS.md && w < this.BREAKPOINTS.lg);
      this.isLg.set(w >= this.BREAKPOINTS.lg && w < this.BREAKPOINTS.xl);
      this.isXl.set(w >= this.BREAKPOINTS.xl && w < this.BREAKPOINTS['2xl']);
      this.is2xl.set(w >= this.BREAKPOINTS['2xl']);
    });
  }

  private getWidth(): number {
    return typeof window !== 'undefined' ? window.innerWidth : 1024;
  }

  private getHeight(): number {
    return typeof window !== 'undefined' ? window.innerHeight : 768;
  }

  private getBreakpoint(): Breakpoint {
    return this.getBreakpointForWidth(this.getWidth());
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
    if (typeof window !== 'undefined' && this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }
}
