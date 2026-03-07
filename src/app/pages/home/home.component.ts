import { Component, OnInit, signal, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  CardComponent,
  SectionComponent,
  TilesComponent,
  GalleryComponent,
  CarouselComponent,
  HeroComponent,
  FeaturedComponent
} from '@app/common/components';
import { GalleryItem } from '@app/common/components/gallery/gallery.component';
import { FeaturedContent } from '@app/common/components/featured/featured.component';
import { HOME_NAVIGATION_CARDS, HOME_FEATURE_ITEMS, HOME_TESTIMONIALS, HOME_FEATURED_CONTENT } from './home.constants';
import { CdnService } from '@app/core/services/cdn/cdn.service';
import { GOOGLE_CONFIG } from '@app/config/constants';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    CardComponent,
    SectionComponent,
    TilesComponent,
    // GalleryComponent,
    CarouselComponent,
    HeroComponent,
    FeaturedComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private readonly cdn = inject(CdnService);
  private scrollRAF: number | null = null;
  private lastScrollPos = 0;
  
  scrollPosition = signal(0);
  readonly heroImage = this.cdn.imageSignal('hero', 1);
  readonly heroImageMobile = this.cdn.imageSignal('medium', 1);
  navigationCards = HOME_NAVIGATION_CARDS;
  featuredContent = signal<FeaturedContent>(HOME_FEATURED_CONTENT);
  featureItems = signal<GalleryItem[]>(HOME_FEATURE_ITEMS);
  testimonials = signal(HOME_TESTIMONIALS);
  showAllReviews = signal(false);
  readonly reviewLink = GOOGLE_CONFIG.reviewLink;

  toggleReviews(): void {
    this.showAllReviews.update(v => !v);
  }
  readonly avgRating = 4.8;
  readonly ratingStars = [true, true, true, true, true];

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.scrollRAF !== null) {
      cancelAnimationFrame(this.scrollRAF);
    }
    this.scrollRAF = requestAnimationFrame(() => {
      const currentScroll = window.pageYOffset || window.scrollY;
      if (currentScroll !== this.lastScrollPos) {
        this.lastScrollPos = currentScroll;
        this.scrollPosition.set(currentScroll);
      }
    });
  }

  ngOnInit(): void {
    // Component initialization if needed
  }
}
