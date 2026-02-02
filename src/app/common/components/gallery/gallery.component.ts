import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

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
  
  // Computed: whether items have animations
  hasMotionedItems = computed(() => this.animationType() !== 'none');

  // Easing function: easeOutCubic for smooth deceleration
  private easeOutCubic(t: number): number {
    const x = 1 - t;
    return 1 - x * x * x;
  }

  // Compute transform for scroll-based animations
  getTransform(index: number): string {
    const anim = this.animationType();
    if (anim !== 'scrollCloser') return '';
    
    const itemCount = this.items().length;
    const scrollPos = this.scrollPosition();
    
    // Responsive offset calculation based on viewport width
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
    
    // Responsive multiplier: smaller on mobile, larger on desktop
    let offsetMultiplier = 0.3; // Default mobile (320-480px)
    if (viewportWidth > 480) offsetMultiplier = 0.35; // Tablet small (480-768px)
    if (viewportWidth > 768) offsetMultiplier = 0.4;  // Tablet (768-1024px)
    if (viewportWidth > 1024) offsetMultiplier = 0.5; // Desktop small
    if (viewportWidth > 1280) offsetMultiplier = 0.6; // Desktop large
    if (viewportWidth > 1536) offsetMultiplier = 0.7; // Desktop xlarge
    
    // Calculate maximum offset based on viewport width and responsive multiplier
    const maxOffset = viewportWidth * offsetMultiplier;
    
    // Animation trigger point: items start animating after 200px scroll (earlier on mobile)
    const startScroll = viewportWidth > 768 ? 300 : 200;
    const endScroll = viewportWidth > 768 ? 1200 : 800; // Shorter duration on mobile
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
