import { Injectable, signal, Signal } from '@angular/core';

export interface Testimonial {
  name: string;
  title: string;
  text: string;
  rating: number;
}

@Injectable({
  providedIn: 'root'
})
export class TestimonialCarouselService {
  /**
   * Get visible testimonials (3 items rotating)
   * @param allTestimonials - All available testimonials
   * @param currentIndex - Current rotation index
   * @returns Array of 3 visible testimonials
   */
  getVisibleTestimonials(
    allTestimonials: Testimonial[],
    currentIndex: number
  ): Testimonial[] {
    if (!allTestimonials || allTestimonials.length === 0) {
      return [];
    }

    const visible: Testimonial[] = [];
    for (let i = 0; i < 3; i++) {
      visible.push(allTestimonials[(currentIndex + i) % allTestimonials.length]);
    }
    return visible;
  }

  /**
   * Get next rotation index
   * @param currentIndex - Current index
   * @param total - Total number of testimonials
   * @returns Next index
   */
  getNextIndex(currentIndex: number, total: number): number {
    return (currentIndex + 1) % total;
  }
}
