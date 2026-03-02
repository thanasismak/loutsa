import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SectionComponent } from '@app/common/components';

@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [TranslateModule, SectionComponent],
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
  styleUrl: './rules.component.scss'
})
export class RulesComponent {}
