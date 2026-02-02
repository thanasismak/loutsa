import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="card">
      <h2>{{ 'faq.title' | translate }}</h2>
      <div class="faq-list">
        <div class="faq-item">
          <h3>{{ 'faq.q1' | translate }}</h3>
          <p>{{ 'faq.a1' | translate }}</p>
        </div>
        <div class="faq-item">
          <h3>{{ 'faq.q2' | translate }}</h3>
          <p>{{ 'faq.a2' | translate }}</p>
        </div>
        <div class="faq-item">
          <h3>{{ 'faq.q3' | translate }}</h3>
          <p>{{ 'faq.a3' | translate }}</p>
        </div>
        <div class="faq-item">
          <h3>{{ 'faq.q4' | translate }}</h3>
          <p>{{ 'faq.a4' | translate }}</p>
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

    .faq-list {
      margin-top: 1.5rem;
    }

    .faq-item {
      padding: 1.5rem;
      margin-bottom: 1rem;
      background: #f8fafc;
      border-radius: 6px;
      border-left: 4px solid var(--accent, #0ea5a4);
    }

    .faq-item h3 {
      margin: 0 0 0.5rem 0;
      color: var(--accent, #0ea5a4);
    }

    .faq-item p {
      margin: 0;
      color: #334155;
      line-height: 1.6;
    }
  `]
})
export class FaqComponent {}
