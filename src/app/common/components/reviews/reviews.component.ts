import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsService, GoogleReview } from '../../../core/services/reviews/reviews.service';
import { GOOGLE_CONFIG } from '../../../config/constants';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  private readonly reviewsService = inject(ReviewsService);

  readonly reviews     = this.reviewsService.reviews;
  readonly loading     = this.reviewsService.loading;
  readonly usingStatic = this.reviewsService.usingStatic;
  readonly avgRating   = this.reviewsService.averageRating;
  readonly reviewLink  = signal(GOOGLE_CONFIG.reviewLink);

  readonly stars = computed(() => this.starsArray(this.avgRating()));

  ngOnInit(): void {
    this.reviewsService.load();
  }

  starsArray(rating: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < Math.round(rating));
  }

  reviewStars(rating: number): boolean[] {
    return this.starsArray(rating);
  }
}
