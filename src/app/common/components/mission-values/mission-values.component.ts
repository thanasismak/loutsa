import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-mission-values',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="mission-values">
      <div class="mission-card">
        <h3>{{ missionTitleKey | translate }}</h3>
        <p>{{ missionTextKey | translate }}</p>
      </div>
      <div class="values-card">
        <h3>{{ valuesTitleKey | translate }}</h3>
        <ul class="values-list">
          <li>{{ value1Key | translate }}</li>
          <li>{{ value2Key | translate }}</li>
          <li>{{ value3Key | translate }}</li>
          <li>{{ value4Key | translate }}</li>
        </ul>
      </div>
    </section>
  `,
  styles: [`
    .mission-values {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      max-width: 1200px;
      margin: 3rem auto;
      padding: 0 1rem;
    }

    .mission-card,
    .values-card {
      background: white;
      padding: 2.5rem;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }

    .mission-card {
      border-top: 4px solid #0ea5a4;
    }

    .values-card {
      border-top: 4px solid #d4af37;
    }

    .mission-card h3,
    .values-card h3 {
      color: #5a3a28;
      font-size: 1.5rem;
      margin: 0 0 1rem 0;
    }

    .mission-card p {
      color: #334155;
      line-height: 1.7;
      margin: 0;
    }

    .values-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .values-list li {
      color: #334155;
      padding: 0.75rem 0;
      padding-left: 1.5rem;
      position: relative;
      line-height: 1.6;
    }

    .values-list li:before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #0ea5a4;
      font-weight: bold;
      font-size: 1.2rem;
    }

    @media (max-width: 768px) {
      .mission-values {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class MissionValuesComponent {
  @Input() missionTitleKey: string = 'about.mission_title';
  @Input() missionTextKey: string = 'about.mission_text';
  @Input() valuesTitleKey: string = 'about.values_title';
  @Input() value1Key: string = 'about.value_1';
  @Input() value2Key: string = 'about.value_2';
  @Input() value3Key: string = 'about.value_3';
  @Input() value4Key: string = 'about.value_4';
}
