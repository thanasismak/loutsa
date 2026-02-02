import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="card">
      <h2>{{ 'rules.title' | translate }}</h2>
      <ul class="rules-list">
        <li>{{ 'rules.quiet_hours' | translate }}</li>
        <li>{{ 'rules.pets' | translate }}</li>
        <li>{{ 'rules.campfires' | translate }}</li>
        <li>{{ 'rules.noise' | translate }}</li>
        <li>{{ 'rules.parking' | translate }}</li>
        <li>{{ 'rules.safety' | translate }}</li>
      </ul>
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
