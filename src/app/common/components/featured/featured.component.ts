import { Component, input, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ViewportService } from '../../../core/services/viewport.service';

export interface FeaturedContent {
  titleKey?: string;
  descriptionKey?: string;
  imageUrl: string;
  imageAlt?: string;
  extraImages?: string[];
  variant?: 'grid-animated' | 'grid-simple';
}

@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="featured-section" [class]="responsiveVariant()">
      <div class="photo-row">
        @for (photo of allPhotos(); track $index; let i = $index) {
          <div class="photo-card" [style.transform]="getImageTransform(i)">
            <div class="photo-inner">
              <img [src]="photo" [alt]="content().imageAlt ?? ''" class="photo-img">
              <div class="photo-overlay"></div>
            </div>
          </div>
        }
      </div>
      @if (content().titleKey) {
        <div class="featured-text">
          <h2>{{ content().titleKey! | translate }}</h2>
          @if (content().descriptionKey) {
            <p>{{ content().descriptionKey! | translate }}</p>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding: clamp(1rem, 3vw, 2rem) 0 clamp(2rem, 6vw, 4rem);
      overflow: visible;
    }

    .featured-section {
      display: grid;
      grid-template-columns: 1fr;
      gap: clamp(1.5rem, 5vw, 3rem);
      align-items: center;
      width: 100%;
    }

    /* When there is text, photos take 3/5 and text 2/5 */
    @media (min-width: 768px) {
      .featured-section:has(.featured-text) {
        grid-template-columns: 3fr 2fr;
      }
    }

    .featured-section.grid-animated {
      animation: fadeIn 0.6s ease-out;
    }

    /* ===== Photo row ===== */
    .photo-row {
      display: flex;
      flex-direction: row;
      gap: clamp(0.6rem, 1.5vw, 1rem);
      align-items: center;
      justify-content: center;
      padding: 1.5rem 0.5rem;   /* room for rotated corners */
      overflow: visible;
    }

    /* The rotating wrapper — overflow visible so tilt shows */
    .photo-card {
      flex: 0 1 auto;
      width: clamp(100px, 16vw, 160px);
      overflow: visible;
      transition: transform 0.4s cubic-bezier(0.34, 1.2, 0.64, 1),
                  box-shadow 0.3s ease;
      transform-origin: bottom center;
      cursor: default;
    }

    .photo-card:hover {
      /* lift and straighten on hover */
      transform: translateY(-6px) rotate(0deg) scale(1.06) !important;
      z-index: 2;
    }

    /* Inner clip — keeps rounded corners & hides img overflow */
    .photo-inner {
      position: relative;
      overflow: hidden;
      border-radius: 10px;
      aspect-ratio: 3 / 4;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18), 0 2px 6px rgba(0, 0, 0, 0.1);
      transition: box-shadow 0.3s ease;
    }

    .photo-card:hover .photo-inner {
      box-shadow: 0 14px 32px rgba(0, 0, 0, 0.22);
    }

    .photo-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .photo-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(14, 165, 164, 0.15) 0%, rgba(0, 0, 0, 0.05) 100%);
      pointer-events: none;
    }

    /* Text column (optional) */
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

    @media (max-width: 767px) {
      .photo-card {
        width: clamp(72px, 18vw, 110px);
      }
    }

    @keyframes slideInRight {
      0% { opacity: 0; transform: translateX(60px); }
      100% { opacity: 1; transform: translateX(0); }
    }

    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
  `]
})
export class FeaturedComponent {
  private viewportService = inject(ViewportService);

  content = input.required<FeaturedContent>();
  variant = input<'grid-animated' | 'grid-simple'>('grid-animated');
  scrollPosition = input(0);

  // All photos: main + extras merged into a single array for @for
  allPhotos = computed(() => {
    const c = this.content();
    return [c.imageUrl, ...(c.extraImages ?? [])];
  });

  responsiveVariant = computed(() => {
    const isMobile = this.viewportService.isMobile;
    const isTablet = this.viewportService.isTablet;
    return (isMobile() || isTablet()) ? 'grid-simple' : this.variant();
  });

  // Each card gets a slightly different rotation for a staggered feel
  // Base tilt per card index — gives scattered/Polaroid look at rest
  private static readonly BASE_ROTATIONS = [-4, 2, -3, 5, -1.5];

  getImageTransform(index: number): string {
    const base = FeaturedComponent.BASE_ROTATIONS[index % FeaturedComponent.BASE_ROTATIONS.length];
    if (this.responsiveVariant() !== 'grid-animated') return `rotate(${base}deg)`;

    const scrollPos = this.scrollPosition();
    const direction = base >= 0 ? 1 : -1;
    const extra = Math.min(scrollPos * 0.01, 2.5) * direction;
    const scale = Math.min(1 + scrollPos * 0.00005, 1.03);

    return `rotate(${base + extra}deg) scale(${scale})`;
  }
}

