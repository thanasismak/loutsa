import { Component, input, computed, inject, ViewChild, ElementRef, signal, AfterViewInit, OnDestroy } from '@angular/core';
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

export type AnimationType = 'none' | 'farToClose' | 'closeToFar' | 'revealStagger';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements AfterViewInit, OnDestroy {
  private viewportService = inject(ViewportService);
  
  // Reference to gallery container for IntersectionObserver
  @ViewChild('galleryContainer') galleryContainer?: ElementRef<HTMLDivElement>;
  
  // Track whether gallery is in viewport
  isInView = signal(false);
  
  // IntersectionObserver instance
  private intersectionObserver?: IntersectionObserver;
  
  // Items to display - can be array or signal
  itemsInput = input<GalleryItem[]>([]);
  
  // Computed items - simple pass-through
  items = computed(() => this.itemsInput() ?? []);
  
  // Grid columns: 1, 2, or 3
  columns = input<1 | 2 | 3>(3);
  
  // Animation type: 'none' = static, 'farToClose' = from far to closer, 'closeToFar' = from closer to farther, 'revealStagger' = reveal with stagger on viewport entry
  animationType = input<AnimationType>('none');

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

  // Easing function: easeOutCubic for smooth deceleration (kept for legacy animations)
  private easeOutCubic(t: number): number {
    const x = 1 - t;
    return 1 - x * x * x;
  }

  // Calculate stagger delay for revealStagger animation
  getStaggerDelay(index: number): string {
    if (!this.hasMotionedItems() || this.responsiveAnimationType() !== 'revealStagger') {
      return '0ms';
    }
    // Apply 80ms stagger per card
    return `${index * 80}ms`;
  }

  ngAfterViewInit() {
    // Set up IntersectionObserver for gallery container
    if (!this.galleryContainer?.nativeElement) return;

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1 // Trigger when 10% of gallery is visible
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Update in-view state signal
        this.isInView.set(entry.isIntersecting);
      });
    }, options);

    this.intersectionObserver.observe(this.galleryContainer.nativeElement);
  }

  ngOnDestroy() {
    // Clean up IntersectionObserver
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }
}
