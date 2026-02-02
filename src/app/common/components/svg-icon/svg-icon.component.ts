import { Component, input, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

export type IconType = 'beach' | 'dining' | 'fishing' | 'tent' | 'heart' | 'star' | 'check' | 'arrow';

@Component({
  selector: 'app-svg-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg
      [attr.viewBox]="'0 0 24 24'"
      [style.width.px]="size()"
      [style.height.px]="size()"
      [style.color]="color()"
      [attr.aria-label]="label()"
      class="svg-icon"
      [class.animated]="animated()"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      [attr.stroke]="strokeWidth() ? 'currentColor' : 'none'"
      [attr.stroke-width]="strokeWidth()"
    >
      <ng-container [ngSwitch]="type()">
        <!-- Beach Icon -->
        <g *ngSwitchCase="'beach'">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5z" />
        </g>

        <!-- Dining Icon -->
        <g *ngSwitchCase="'dining'">
          <path d="M11 9H9c0-1.1.9-2 2-2s2 .9 2 2h-2v2h4V9c0-2.21-1.79-4-4-4s-4 1.79-4 4h2zm7-4h-1V3h-2v2h-4V3h-2v2H4v2h2.34c.5 4.12 3.85 7.17 7.66 7.17s7.16-3.05 7.66-7.17H20V5zm-6 8h-2v-2h2v2zm0 4h-2v-2h2v2z" />
        </g>

        <!-- Fishing Icon -->
        <g *ngSwitchCase="'fishing'">
          <path d="M19.07 4.93L17.65 3.5C16.37 2.22 14.34 2.22 13.05 3.5L4.93 11.62c-1.29 1.29-1.29 3.33 0 4.62l1.41 1.41c1.29 1.29 3.33 1.29 4.62 0l8.12-8.12c1.29-1.29 1.29-3.33 0-4.62zM12 19H2v2h10v-2z" />
        </g>

        <!-- Tent Icon -->
        <g *ngSwitchCase="'tent'">
          <path d="M10 3L2 8v11h7v-6h6v6h7V8l-8-5zm0 14v-4h4v4h-4z" />
        </g>

        <!-- Heart Icon -->
        <g *ngSwitchCase="'heart'">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </g>

        <!-- Star Icon -->
        <g *ngSwitchCase="'star'">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2l-2.81 6.63L2 9.24l5.46 4.73L5.82 21z" />
        </g>

        <!-- Check Icon -->
        <g *ngSwitchCase="'check'">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </g>

        <!-- Arrow Icon -->
        <g *ngSwitchCase="'arrow'">
          <path d="M5 13h14v-2H5v2z" />
          <path d="M12 5.83L17.17 11H5v2h12.17L12 18.17V5.83z" />
        </g>
      </ng-container>
    </svg>
  `,
  styles: `
    .svg-icon {
      display: inline-block;
      vertical-align: middle;
      transition: all 0.3s ease;

      &.animated {
        animation: float 3s ease-in-out infinite;
      }
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-8px);
      }
    }
  `
})
export class SvgIconComponent {
  // Input signals
  type = input<IconType | string>('star');
  size = input<number>(24);
  color = input<string>('currentColor');
  strokeWidth = input<number>(0);
  animated = input<boolean>(false);
  label = input<string>('Icon');

  constructor() {
    // Optional: effects for tracking changes
    effect(() => {
      const currentSize = this.size();
      const currentColor = this.color();
      // Side effects if needed (analytics, logging, etc.)
    });
  }
}
