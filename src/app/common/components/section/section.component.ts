import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section [class]="'section ' + sectionClass()">
      <div class="container">
        <div class="section-header" *ngIf="title()">
          <h2 class="section-title fade-in">{{ (title() || '') | translate }}</h2>
          <p class="section-subtitle fade-in" *ngIf="subtitle()">{{ (subtitle() || '') | translate }}</p>
        </div>
        <ng-content></ng-content>
      </div>
    </section>
  `,
  styleUrl: './section.component.scss'
})
export class SectionComponent {
  title = input<string | undefined>();
  subtitle = input<string | undefined>();
  sectionClass = input<string>('');
}
