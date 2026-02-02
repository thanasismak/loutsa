import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SectionComponent } from '@app/common/components';

@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [CommonModule, TranslateModule, SectionComponent],
  template: `
    <app-section [title]="'rules.title' | translate">
      <ul class="rules-list">
        <li>{{ 'rules.quiet_hours' | translate }}</li>
        <li>{{ 'rules.pets' | translate }}</li>
        <li>{{ 'rules.campfires' | translate }}</li>
        <li>{{ 'rules.noise' | translate }}</li>
        <li>{{ 'rules.parking' | translate }}</li>
        <li>{{ 'rules.safety' | translate }}</li>
      </ul>
    </app-section>
  `,
  styles: [`
    .rules-list {
      list-style: none;
      padding: 0;
    }

    .rules-list li {
      padding: 0.75rem 0;
      padding-left: 1.5rem;
      position: relative;
      color: #334155;
      line-height: 1.6;
    }

    .rules-list li:before {
      content: '✓';
      position: absolute;
      left: 0;
      color: var(--accent, #0ea5a4);
      font-weight: bold;
    }

    .rules-list li:not(:last-child) {
      border-bottom: 1px solid #f1f5f9;
    }
  `]
})
export class RulesComponent {}
