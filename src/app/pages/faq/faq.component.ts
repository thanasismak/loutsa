import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SectionComponent } from '@app/common/components';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [TranslateModule, SectionComponent],
  template: `
    <app-section [title]="'faq.title' | translate">
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
    </app-section>
  `,
  styleUrl: './faq.component.scss'
})
export class FaqComponent {}
