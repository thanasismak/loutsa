import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tiles',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="'tiles-grid ' + gridClass()">
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './tiles.component.scss'
})
export class TilesComponent {
  gridClass = input<string>('cols-3');
}
