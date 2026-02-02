import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SectionComponent, TilesComponent } from '@app/common/components';

interface Activity {
  titleKey: string;
  descKey: string;
}

@Component({
  selector: 'app-things-to-do',
  standalone: true,
  imports: [CommonModule, TranslateModule, SectionComponent, TilesComponent],
  template: `
    <app-section [title]="'activities.title' | translate">
      <app-tiles [gridClass]="'cols-2'">
        <div class="activity-item" *ngFor="let activity of activities()">
          <h3>{{ activity.titleKey | translate }}</h3>
          <p>{{ activity.descKey | translate }}</p>
        </div>
      </app-tiles>
    </app-section>
  `,
  styles: [`
    .activity-item {
      padding: 1rem;
      background: #f8fafc;
      border-radius: 6px;
      border-left: 4px solid var(--accent, #0ea5a4);
      transition: all 0.3s ease;
    }

    .activity-item:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(14, 165, 164, 0.15);
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
export class ThingsToDoComponent {
  activities = signal<Activity[]>([
    { titleKey: 'activities.beaches', descKey: 'activities.beaches_desc' },
    { titleKey: 'activities.hiking', descKey: 'activities.hiking_desc' },
    { titleKey: 'activities.dining', descKey: 'activities.dining_desc' },
    { titleKey: 'activities.fishing', descKey: 'activities.fishing_desc' }
  ]);
}
