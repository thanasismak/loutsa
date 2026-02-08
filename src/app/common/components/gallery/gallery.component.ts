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

  // Easing function: easeOutCubic for smooth deceleration
  private easeOutCubic(t: number): number {
    const x = 1 - t;
    return 1 - x * x * x;
  }

  // Calculate offset for CSS custom property (safe hardclamped value)
  getOffset(index: number): string {
    // Disable all animations on mobile AND tablet (only desktop animations)
    if (this.viewportService.isMobile() || this.viewportService.isTablet()) {
      return '0px';
    }

    const anim = this.animationType();
    if (anim !== 'scrollCloser') return '0px';
    
    const itemCount = this.items().length;
    const scrollPos = this.scrollPosition();
    
    // Animation trigger point: fixed, frame-independent
    const startScroll = 300;
    const endScroll = 1200;
    const scrollRange = endScroll - startScroll;
    
    // Calculate animation progress (0 to 1)
    const scrollProgress = Math.max(0, Math.min((scrollPos - startScroll) / scrollRange, 1));
    
    // Apply easing function for smooth deceleration
    const easedProgress = this.easeOutCubic(scrollProgress);
    
    // Hard clamp max offset to safe range (160-260px)
    // This prevents any spike regardless of viewport width or signal glitches
    const MIN_OFFSET = 160;
    const MAX_OFFSET = 260;
    const maxOffset = 610; // Use middle-of-range value for consistent motion
    
    // Calculate current offset: starts at maxOffset, decreases to 0
    let currentOffset = maxOffset * (1 - easedProgress);
    
    // Double clamp for safety - guarantee bounds even if signals glitch
    currentOffset = Math.max(0, Math.min(currentOffset, MAX_OFFSET));
    
    // Return offset for outer cards only
    if (index === 0 || index === itemCount - 1) {
      return `${currentOffset}px`;
    }
    
    return '0px';
  }
}
