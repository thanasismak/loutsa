import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-things-to-do',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="card">
      <h2>{{ 'activities.title' | translate }}</h2>
      <div class="activities-list">
        <div class="activity-item">
          <h3>🏖️ {{ 'activities.beaches' | translate }}</h3>
          <p>{{ 'activities.beaches_desc' | translate }}</p>
        </div>
        <div class="activity-item">
          <h3>🥾 {{ 'activities.hiking' | translate }}</h3>
          <p>{{ 'activities.hiking_desc' | translate }}</p>
        </div>
        <div class="activity-item">
          <h3>🍽️ {{ 'activities.dining' | translate }}</h3>
          <p>{{ 'activities.dining_desc' | translate }}</p>
        </div>
        <div class="activity-item">
          <h3>🎣 {{ 'activities.fishing' | translate }}</h3>
          <p>{{ 'activities.fishing_desc' | translate }}</p>
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

    .activities-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-top: 1.5rem;
    }

    .activity-item {
      padding: 1rem;
      background: #f8fafc;
      border-radius: 6px;
      border-left: 4px solid var(--accent, #0ea5a4);
    }

    .activity-item h3 {
      margin: 0 0 0.5rem 0;
      color: #0f172a;
    }

    .activity-item p {
      margin: 0;
      color: #64748b;
      line-height: 1.5;
    }
  `]
})
export class ThingsToDoComponent {}
