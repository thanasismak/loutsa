import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-facilities',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="card">
      <h2>{{ 'facilities.title' | translate }}</h2>
      <div class="facilities-grid">
        <div class="facility-item">
          <div class="icon">💧</div>
          <h3>{{ 'facilities.water' | translate }}</h3>
          <p>{{ 'facilities.water_desc' | translate }}</p>
        </div>
        <div class="facility-item">
          <div class="icon">🚿</div>
          <h3>{{ 'facilities.showers' | translate }}</h3>
          <p>{{ 'facilities.showers_desc' | translate }}</p>
        </div>
        <div class="facility-item">
          <div class="icon">⚡</div>
          <h3>{{ 'facilities.electricity' | translate }}</h3>
          <p>{{ 'facilities.electricity_desc' | translate }}</p>
        </div>
        <div class="facility-item">
          <div class="icon">📶</div>
          <h3>{{ 'facilities.wifi' | translate }}</h3>
          <p>{{ 'facilities.wifi_desc' | translate }}</p>
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

    h2 {
      color: var(--accent, #0ea5a4);
    }

    .facilities-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-top: 1.5rem;
    }

    .facility-item {
      text-align: center;
      padding: 1.5rem;
      background: #f8fafc;
      border-radius: 6px;
    }

    .icon {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .facility-item h3 {
      margin: 0.5rem 0;
      color: var(--accent, #0ea5a4);
    }

    .facility-item p {
      margin: 0;
      color: #64748b;
      font-size: 0.9rem;
    }
  `]
})
export class FacilitiesComponent {}
