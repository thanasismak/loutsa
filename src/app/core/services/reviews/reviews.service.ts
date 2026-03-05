import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { GOOGLE_CONFIG } from '../../../config/constants';

export interface GoogleReview {
  authorName: string;
  authorPhoto?: string;
  rating: number;            // 1–5
  text: string;
  relativeTime: string;      // e.g. 'a month ago'
  profileUrl?: string;
}

/** Static fallback reviews shown when the API is not configured */
const STATIC_REVIEWS: GoogleReview[] = [
  {
    authorName: 'Maria K.',
    rating: 5,
    text: "Magical spot right on the beach. The pitches are shaded, clean and the staff incredibly friendly. We'll be back every summer!",
    relativeTime: '2 months ago',
  },
  {
    authorName: 'Thomas B.',
    rating: 5,
    text: 'Wunderschöner Campingplatz direkt am Meer. Perfekt für Familien. Das Wasser ist kristallklar.',
    relativeTime: '3 months ago',
  },
  {
    authorName: 'Αλέξανδρος Π.',
    rating: 5,
    text: 'Ο καλύτερος κάμπινγκ της Μεσσηνίας! Καθαρός, ήσυχος, με εκπληκτική παραλία. Πηγαίνουμε εδώ χρόνια.',
    relativeTime: '1 month ago',
  },
  {
    authorName: 'Sarah L.',
    rating: 5,
    text: 'Absolutely stunning location. Woke up to the sound of waves every morning. Highly recommend the beach-front pitches.',
    relativeTime: '4 months ago',
  },
  {
    authorName: 'Dimitris N.',
    rating: 4,
    text: 'Excellent facilities, very clean. Good value for money. The sunsets from the camping are breathtaking.',
    relativeTime: '5 months ago',
  },
  {
    authorName: 'Ingrid H.',
    rating: 5,
    text: 'Eine traumhafte Anlage. Direkter Strandzugang, freundliches Personal, sehr gepflegt.',
    relativeTime: '6 months ago',
  },
];

interface PlacesApiResponse {
  reviews: GoogleReview[];
}

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  private readonly http = inject(HttpClient);

  readonly reviews     = signal<GoogleReview[]>([]);
  readonly loading     = signal(false);
  readonly error       = signal<string | null>(null);
  readonly usingStatic = signal(false);

  readonly hasReviews = computed(() => this.reviews().length > 0);
  readonly averageRating = computed(() => {
    const r = this.reviews();
    if (!r.length) return 0;
    return r.reduce((sum, rev) => sum + rev.rating, 0) / r.length;
  });

  load(): void {
    if (!environment.googleReviewsEndpoint) {
      this.reviews.set(STATIC_REVIEWS.slice(0, GOOGLE_CONFIG.maxReviews));
      this.usingStatic.set(true);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.http.get<PlacesApiResponse>(environment.googleReviewsEndpoint).pipe(
      tap(res => {
        const data = res?.reviews?.slice(0, GOOGLE_CONFIG.maxReviews) ?? [];
        this.reviews.set(data.length ? data : STATIC_REVIEWS.slice(0, GOOGLE_CONFIG.maxReviews));
        this.usingStatic.set(!data.length);
      }),
      catchError(() => {
        // Graceful fallback — never break the page over reviews
        this.reviews.set(STATIC_REVIEWS.slice(0, GOOGLE_CONFIG.maxReviews));
        this.usingStatic.set(true);
        this.error.set(null); // suppress UI error; static data is shown instead
        return EMPTY;
      }),
      finalize(() => this.loading.set(false))
    ).subscribe();
  }
}
