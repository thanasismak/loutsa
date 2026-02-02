import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SectionComponent } from '@app/common/components';

@Component({
  selector: 'app-how-to-reach',
  standalone: true,
  imports: [CommonModule, TranslateModule, SectionComponent],
  template: `
    <app-section [title]="'directions.title' | translate">
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
    </app-section>
  `,
  styles: [`
    h3 {
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
