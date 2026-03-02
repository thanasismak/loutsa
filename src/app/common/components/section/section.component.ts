import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [TranslateModule],
  template: `
    <section [class]="'section ' + sectionClass()">
      <div class="container">
        @if (title()) {
          <div class="section-header">
            <h2 class="section-title fade-in">{{ (title() || '') | translate }}</h2>
            @if (subtitle()) {
              <p class="section-subtitle fade-in">{{ (subtitle() || '') | translate }}</p>
            }
          </div>
        }
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
