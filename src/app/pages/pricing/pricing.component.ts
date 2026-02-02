import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="pricing-section">
      <h2>{{ 'pricing.title' | translate }}</h2>
      <div class="pricing-grid">
        <div class="price-card">
          <h3>{{ 'pricing.low_season' | translate }}</h3>
          <p class="price">€15/night</p>
          <p>{{ 'pricing.low_desc' | translate }}</p>
        </div>
        <div class="price-card featured">
          <h3>{{ 'pricing.mid_season' | translate }}</h3>
          <p class="price">€25/night</p>
          <p>{{ 'pricing.mid_desc' | translate }}</p>
        </div>
        <div class="price-card">
          <h3>{{ 'pricing.high_season' | translate }}</h3>
          <p class="price">€35/night</p>
          <p>{{ 'pricing.high_desc' | translate }}</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .pricing-section {
      background: white;
      padding: 2rem;
      border-radius: 8px;
    }

    h2 {
      text-align: center;
      color: var(--accent, #0ea5a4);
    }

    .pricing-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-top: 1.5rem;
    }

    .price-card {
      border: 2px solid #e2e8f0;
      padding: 1.5rem;
      border-radius: 8px;
      text-align: center;
      transition: all 0.2s;
    }

    .price-card:hover,
    .price-card.featured {
      border-color: var(--accent, #0ea5a4);
      box-shadow: 0 4px 12px rgba(14, 165, 164, 0.15);
    }

    .price-card h3 {
      margin-top: 0;
      color: var(--accent, #0ea5a4);
    }

    .price {
      font-size: 1.8rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0.5rem 0;
    }

    .price-card p {
      color: #64748b;
      line-height: 1.5;
    }
  `]
})
export class PricingComponent {}
