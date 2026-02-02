import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  signal,
  computed,
  HostListener,
  output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TestimonialCarouselService } from '@app/pages/home/services/testimonial-carousel.service';
import { getCurrentScrollPosition, hasScrollPositionChanged } from '@app/pages/home/utils/scroll.utils';

export interface CarouselItem {
  id?: string | number;
  // Testimonial-specific properties (optional)
  rating?: number;
  text?: string;
  name?: string;
  title?: string;
  [key: string]: any; // Allow any properties
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent implements OnInit, OnDestroy {
  private carouselService = inject(TestimonialCarouselService);

  @Input() items: CarouselItem[] = [];
  @Input() autoRotate = true;
  @Input() rotationInterval = 5000; // 5 seconds
  @Input() showIndicators = true;
  @Input() showNavigation = true;
  @Input() visibleCount = 1; // Number of items to show at once (1 for single, 3 for grid)

  // Output the current item so parent can use it
  itemChanged = output<{ item: CarouselItem; index: number }>();

  currentIndex = signal(0);
  isHovered = signal(false);
  scrollPosition = signal(0);
  private scrollRAF: number | null = null;
  private lastScrollPos = 0;

  // Computed properties
  currentItem = computed(() => this.items[this.currentIndex()]);
  totalItems = computed(() => this.items.length);
  indicatorIndices = computed(() =>
    Array.from({ length: this.totalItems() }, (_, i) => i)
  );
  // New: Get multiple visible items for grid carousel
  visibleItems = computed(() => {
    const visible: CarouselItem[] = [];
    for (let i = 0; i < this.visibleCount; i++) {
      visible.push(this.items[(this.currentIndex() + i) % this.totalItems()]);
    }
    return visible;
  });

  private rotationTimer: any;

  ngOnInit(): void {
    if (this.autoRotate && this.items.length > 1) {
      this.startAutoRotation();
    }
    // Initialize scroll position
    this.updateScrollPosition();
    // Emit initial item
    this.emitItemChange();
  }

  ngOnDestroy(): void {
    this.stopAutoRotation();
    if (this.scrollRAF !== null) {
      cancelAnimationFrame(this.scrollRAF);
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.scrollRAF !== null) {
      cancelAnimationFrame(this.scrollRAF);
    }
    this.scrollRAF = requestAnimationFrame(() => {
      this.updateScrollPosition();
    });
  }

  private startAutoRotation(): void {
    this.rotationTimer = setInterval(() => {
      this.next();
    }, this.rotationInterval);
  }

  private stopAutoRotation(): void {
    if (this.rotationTimer) {
      clearInterval(this.rotationTimer);
    }
  }

  private updateScrollPosition(): void {
    const currentScroll = getCurrentScrollPosition();
    if (hasScrollPositionChanged(currentScroll, this.lastScrollPos)) {
      this.lastScrollPos = currentScroll;
      this.scrollPosition.set(currentScroll);
    }
  }

  private emitItemChange(): void {
    const item = this.currentItem();
    if (item) {
      this.itemChanged.emit({ item, index: this.currentIndex() });
    }
  }

  next(): void {
    const nextIndex = (this.currentIndex() + 1) % this.totalItems();
    this.currentIndex.set(nextIndex);
    this.emitItemChange();
    // Reset timer on manual navigation
    if (this.autoRotate) {
      this.stopAutoRotation();
      this.startAutoRotation();
    }
  }

  previous(): void {
    const prevIndex =
      (this.currentIndex() - 1 + this.totalItems()) % this.totalItems();
    this.currentIndex.set(prevIndex);
    this.emitItemChange();
    // Reset timer on manual navigation
    if (this.autoRotate) {
      this.stopAutoRotation();
      this.startAutoRotation();
    }
  }

  goToSlide(index: number): void {
    this.currentIndex.set(index);
    this.emitItemChange();
    // Reset timer on manual navigation
    if (this.autoRotate) {
      this.stopAutoRotation();
      this.startAutoRotation();
    }
  }
}
