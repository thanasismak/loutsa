import { Component, input, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

export interface CardItem {
  icon: string;
  titleKey: string;
  descKey: string;
}

@Component({
  selector: 'app-cards-grid',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="cards-grid-section">
      <h2 *ngIf="titleKey()">{{ (titleKey() || '') | translate }}</h2>
      <div class="cards-grid" [ngClass]="'cols-' + columns()">
        <div class="card-item" *ngFor="let item of items()">
          <div class="card-icon">{{ item.icon }}</div>
          <h3>{{ item.titleKey | translate }}</h3>
          <p>{{ item.descKey | translate }}</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .cards-grid-section {
      padding: 3rem 1rem;
      background: white;
      margin: 2rem 1rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(14, 165, 164, 0.1);
    }

    .cards-grid-section h2 {
      text-align: center;
      color: #5a3a28;
      font-size: 2.2rem;
      margin: 0 0 2.5rem 0;
    }

    .cards-grid {
      display: grid;
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .cards-grid.cols-2 {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }

    .cards-grid.cols-3 {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }

    .cards-grid.cols-4 {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }

    .card-item {
      background: linear-gradient(135deg, #faf5f0 0%, #f0ebe5 100%);
      padding: 2rem;
      border-radius: 10px;
      text-align: center;
      border-left: 4px solid #0ea5a4;
      transition: all 0.3s ease;
    }

    .card-item:hover {
      transform: translateY(-8px);
      box-shadow: 0 8px 25px rgba(14, 165, 164, 0.2);
      border-left-color: #d4af37;
    }

    .card-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      animation: bounce 2s infinite;
    }

    .card-item h3 {
      color: #0ea5a4;
      margin: 1rem 0 0.5rem 0;
      font-size: 1.2rem;
    }

    .card-item p {
      color: #5a3a28;
      line-height: 1.6;
      margin: 0;
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    @media (max-width: 768px) {
      .cards-grid {
        grid-template-columns: 1fr;
      }

      .cards-grid-section h2 {
        font-size: 1.8rem;
      }
    }
  `]
})
export class CardsGridComponent {
  titleKey = input<string | undefined>();
  columns = input<number>(3);
  itemsInput = input<CardItem[]>([]);
  
  items = signal<CardItem[]>([]);

  constructor() {
    effect(() => {
      this.items.set(this.itemsInput());
    });
  }
}
