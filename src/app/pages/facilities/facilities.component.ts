import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SectionComponent, TilesComponent } from '@app/common/components';

interface Facility {
  icon: string;
  titleKey: string;
  descKey: string;
}

@Component({
  selector: 'app-facilities',
  standalone: true,
  imports: [CommonModule, TranslateModule, SectionComponent, TilesComponent],
  template: `
    <app-section [title]="'facilities.title' | translate">
      <app-tiles [gridClass]="'cols-4'">
        <div class="facility-item" *ngFor="let facility of facilities()">
          <div class="icon">{{ facility.icon }}</div>
          <h3>{{ facility.titleKey | translate }}</h3>
          <p>{{ facility.descKey | translate }}</p>
        </div>
      </app-tiles>
    </app-section>
  `,
  styles: [`
    .facility-item {
      text-align: center;
      padding: 1.5rem;
      background: #f8fafc;
      border-radius: 6px;
      transition: all 0.3s ease;
    }

    .facility-item:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(14, 165, 164, 0.15);
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
export class FacilitiesComponent {
  facilities = signal<Facility[]>([
    { icon: '💧', titleKey: 'facilities.water', descKey: 'facilities.water_desc' },
    { icon: '🚿', titleKey: 'facilities.showers', descKey: 'facilities.showers_desc' },
    { icon: '⚡', titleKey: 'facilities.electricity', descKey: 'facilities.electricity_desc' },
    { icon: '📶', titleKey: 'facilities.wifi', descKey: 'facilities.wifi_desc' }
  ]);
}
