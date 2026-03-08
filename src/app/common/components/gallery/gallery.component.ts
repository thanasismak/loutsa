import { Component, input, computed, inject, ViewChild, ElementRef, signal, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ViewportService } from '../../../core/services/viewport.service';

export interface GalleryItem {
  src?: string;
  image?: string;
  alt?: string;
  title?: string;
  description?: string;
  /** Full-resolution URL shown in lightbox. Falls back to src/image if omitted. */
  fullImage?: string;
}

export type AnimationType = 'none' | 'revealStagger';

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
  
  // Animation type: 'none' = static, 'revealStagger' = reveal with stagger on viewport entry
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

  // Lightbox state
  lightboxItem = signal<GalleryItem | null>(null);
  lightboxIndex = signal<number>(-1);

  openLightbox(item: GalleryItem, index: number): void {
    this.lightboxItem.set(item);
    this.lightboxIndex.set(index);
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightboxItem.set(null);
    this.lightboxIndex.set(-1);
    document.body.style.overflow = '';
  }

  navigate(dir: 1 | -1): void {
    const all = this.items();
    const next = (this.lightboxIndex() + dir + all.length) % all.length;
    this.lightboxItem.set(all[next]);
    this.lightboxIndex.set(next);
  }

  get lightboxSrc(): string {
    const item = this.lightboxItem();
    if (!item) return '';
    return item.fullImage ?? item.src ?? item.image ?? '';
  }

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent): void {
    if (!this.lightboxItem()) return;
    if (e.key === 'Escape') this.closeLightbox();
    if (e.key === 'ArrowRight') this.navigate(1);
    if (e.key === 'ArrowLeft') this.navigate(-1);
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
