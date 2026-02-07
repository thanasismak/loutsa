import { Component, input, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ViewportService } from '../../../core/services/viewport.service';

export interface FeaturedContent {
  titleKey: string;
  descriptionKey: string;
  imageUrl: string;
  imageAlt: string;
  variant?: 'grid-animated' | 'grid-simple';
}

@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="featured-section" [class]="responsiveVariant()">
      <div class="featured-image-container" [style.transform]="getImageTransform()">
        <img 
          [src]="content().imageUrl" 
          [alt]="content().imageAlt"
          class="featured-image">
        <div class="image-overlay"></div>
      </div>
      <div class="featured-text">
        <h2>{{ content().titleKey | translate }}</h2>
        <p>{{ content().descriptionKey | translate }}</p>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .featured-section {
      display: grid;
      grid-template-columns: 1fr;
      gap: clamp(1.5rem, 5vw, 3rem);
      align-items: center;
      width: 100%;
    }

    .featured-section.grid-animated {
      animation: fadeIn 0.8s ease-out;
    }

    @media (min-width: 768px) {
      .featured-section {
        grid-template-columns: 1fr 1fr;
      }
    }

    .featured-image-container {
      position: relative;
      overflow: hidden;
      border-radius: 12px;
      aspect-ratio: 16 / 10;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .featured-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(14, 165, 164, 0.2) 0%, rgba(30, 205, 201, 0.1) 100%);
      pointer-events: none;
    }

    .featured-text {
      animation: slideInRight 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    .featured-text h2 {
      font-size: clamp(1.5rem, 4vw, 2.25rem);
      color: #0ea5a4;
      margin-bottom: 1rem;
      margin-top: 0;
    }

    .featured-text p {
      font-size: clamp(0.875rem, 2vw, 1.125rem);
      color: #64748b;
      line-height: 1.8;
      margin: 0;
    }

    @keyframes slideInRight {
      0% {
        opacity: 0;
        transform: translateX(60px);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  `]
})
export class FeaturedComponent {
  private viewportService = inject(ViewportService);

  content = input.required<FeaturedContent>();
  variant = input<'grid-animated' | 'grid-simple'>('grid-animated');
  scrollPosition = input(0);

  // Computed responsive variant - uses ViewportService signals for reactivity
  // Only animate on desktop (1280px+), use simple grid on mobile/tablet
  responsiveVariant = computed(() => {
    const isMobile = this.viewportService.isMobile();
    const isTablet = this.viewportService.isTablet();
    return (isMobile || isTablet) ? 'grid-simple' : this.variant();
  });

  getImageTransform(): string {
    // Only apply scroll transform when using animated variant (desktop only)
    if (this.responsiveVariant() !== 'grid-animated') return '';
    
    const scrollPos = this.scrollPosition();
    const rotation = scrollPos * 0.02;
    const scale = 1 + scrollPos * 0.0001;
    
    return `rotate(${rotation}deg) scale(${scale})`;
  }
}

