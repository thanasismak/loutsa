import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SectionComponent, TilesComponent } from '@app/common/components';

interface PriceCard {
  titleKey: string;
  price: string;
  descKey: string;
  featured?: boolean;
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, TranslateModule, SectionComponent, TilesComponent],
  template: `
    <app-section [title]="'pricing.title' | translate">
      <app-tiles [gridClass]="'cols-3'">
        <div class="price-card" *ngFor="let card of pricingCards()" [class.featured]="card.featured">
          <h3>{{ card.titleKey | translate }}</h3>
          <p class="price">{{ card.price }}</p>
          <p>{{ card.descKey | translate }}</p>
        </div>
      </app-tiles>
    </app-section>
  `,
  styles: [`
    .price-card {
      background: white;
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
      margin: 0.5rem 0;
    }
  `]
})
export class PricingComponent {
  pricingCards = signal<PriceCard[]>([
    {
      titleKey: 'pricing.low_season',
      price: '€15/night',
      descKey: 'pricing.low_desc'
    },
    {
      titleKey: 'pricing.mid_season',
      price: '€25/night',
      descKey: 'pricing.mid_desc',
      featured: true
    },
    {
      titleKey: 'pricing.high_season',
      price: '€35/night',
      descKey: 'pricing.high_desc'
    }
  ]);
}
