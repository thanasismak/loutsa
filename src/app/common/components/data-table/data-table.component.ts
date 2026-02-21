import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TableVariant = 'striped' | 'transparent';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="wrapperClass()">
      @if (caption()) {
        <h4 class="table-caption">{{ caption() }}</h4>
      }
      <div class="table-scroll">
        <table class="data-table">
          <ng-content></ng-content>
        </table>
      </div>
    </div>
  `,
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent {
  variant  = input<TableVariant>('striped');
  caption  = input<string>();

  wrapperClass = computed(() => `table-wrapper table-wrapper--${this.variant()}`);
}
