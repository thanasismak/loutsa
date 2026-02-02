import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-how-to-reach',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="card">
      <h2>{{ 'directions.title' | translate }}</h2>
      <div class="directions-grid">
        <div class="directions-content">
          <h3>{{ 'directions.address' | translate }}</h3>
          <p>Loutsa, Athens, Greece</p>
          <h3>{{ 'directions.coordinates' | translate }}</h3>
          <p>38.0517° N, 23.8747° E</p>
          <h3>{{ 'directions.directions' | translate }}</h3>
          <p>{{ 'directions.directions_text' | translate }}</p>
        </div>
        <div class="map-placeholder">
          <p>{{ 'directions.map_embed' | translate }}</p>
          <div style="background: #e2e8f0; padding: 2rem; text-align: center; border-radius: 6px;">
            📍 Map will be embedded here
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 1px 8px rgba(2, 6, 23, 0.06);
    }

    h2, h3 {
      color: var(--accent, #0ea5a4);
    }

    .directions-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin-top: 1.5rem;
    }

    .directions-content p {
      color: #64748b;
      line-height: 1.6;
    }

    @media (max-width: 768px) {
      .directions-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HowToReachComponent {}
