import { Component, input, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

export interface StatItem {
  value: string;
  labelKey: string;
}

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="stats-section">
      <h2 *ngIf="titleKey()">{{ (titleKey() || '') | translate }}</h2>
      <div class="stats-grid">
        <div class="stat-item" *ngFor="let stat of stats()">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.labelKey | translate }}</div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .stats-section {
      background: linear-gradient(135deg, #5a3a28 0%, #6d4536 100%);
      color: white;
      padding: 3rem 1rem;
      margin: 3rem 0;
      text-align: center;
    }

    .stats-section h2 {
      font-size: 2.2rem;
      margin: 0 0 2.5rem 0;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .stat-item {
      padding: 2rem 1rem;
    }

    .stat-value {
      font-size: 2.8rem;
      font-weight: 700;
      color: #d4af37;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-size: 1rem;
      opacity: 0.9;
    }

    @media (max-width: 768px) {
      .stats-section h2 {
        font-size: 1.8rem;
      }

      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `]
})
export class StatsComponent {
  titleKey = input<string | undefined>();
  statsInput = input<StatItem[]>([]);
  
  stats = signal<StatItem[]>([]);

  constructor() {
    effect(() => {
      this.stats.set(this.statsInput());
    });
  }
}
