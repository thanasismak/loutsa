import { Component, input, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ViewportService } from '../../../core/services/viewport.service';

export interface GalleryItem {
  src?: string;
  image?: string;
  alt?: string;
  title?: string;
  description?: string;
}

export type AnimationType = 'none' | 'farToClose' | 'closeToFar' | 'scrollCloser';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  private viewportService = inject(ViewportService);
  
  // Items to display - can be array or signal
  itemsInput = input<GalleryItem[]>([]);
  
  // Computed items - simple pass-through
  items = computed(() => this.itemsInput() ?? []);
  
  // Grid columns: 1, 2, or 3
  columns = input<1 | 2 | 3>(3);
  
  // Animation type: 'none' = static, 'farToClose' = from far to closer, 'closeToFar' = from closer to farther, 'scrollCloser' = scroll-based
  animationType = input<AnimationType>('none');
  
  // Scroll position for scroll-based animations
  scrollPosition = input(0);

  // Computed: responsive columns - single column on mobile, otherwise use input columns
  responsiveColumns = computed(() => {
    return this.viewportService.isMobile() ? 1 : this.columns();
  });

  // Computed: responsive animation type - disable animations on mobile AND tablet, only on desktop
  responsiveAnimationType = computed(() => {
    return (this.viewportService.isMobile() || this.viewportService.isTablet()) ? 'none' : this.animationType();
  });
  
  // Computed: whether items have animations
  hasMotionedItems = computed(() => this.responsiveAnimationType() !== 'none');

  // Get offset multiplier based on breakpoint
  private getOffsetMultiplier(): number {
    const breakpoint = this.viewportService.breakpoint;
    const multipliers: Record<string, number> = {
      xs: 0.3,
      sm: 0.35,
      md: 0.4,
      lg: 0.5,
      xl: 0.6,
      '2xl': 0.7,
    };
    return multipliers[breakpoint()] ?? 0.3;
  }

  // Easing function: easeOutCubic for smooth deceleration
  private easeOutCubic(t: number): number {
    const x = 1 - t;
    return 1 - x * x * x;
  }

  // Compute transform for scroll-based animations
  getTransform(index: number): string {
    // Disable all animations on mobile AND tablet (only desktop animations)
    if (this.viewportService.isMobile() || this.viewportService.isTablet()) {
      return '';
    }

    const anim = this.animationType();
    if (anim !== 'scrollCloser') return '';
    
    const itemCount = this.items().length;
    const scrollPos = this.scrollPosition();
    const viewportWidth = this.viewportService.width();
    
    // Get responsive offset multiplier from breakpoint
    const offsetMultiplier = this.getOffsetMultiplier();
    const maxOffset = viewportWidth * offsetMultiplier;
    
    // Animation trigger point: responsive based on breakpoint
    const startScroll = 300;
    const endScroll = 1200;
    const scrollRange = endScroll - startScroll;
    
    // Calculate animation progress (0 to 1)
    const scrollProgress = Math.max(0, Math.min((scrollPos - startScroll) / scrollRange, 1));
    
    // Apply easing function for smooth deceleration
    const easedProgress = this.easeOutCubic(scrollProgress);
    
    // Calculate current offset: starts at maxOffset, decreases to 0
    const currentOffset = maxOffset * (1 - easedProgress);
    
    // First item starts far left, moves right toward center
    if (index === 0) {
      return `translateX(${-currentOffset}px)`;
    } 
    // Last item starts far right, moves left toward center
    else if (index === itemCount - 1) {
      return `translateX(${currentOffset}px)`;
    }
    
    return '';
  }
}
