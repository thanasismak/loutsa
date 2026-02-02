import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="hero-banner" [style.background-image]="backgroundImage ? 'url(' + backgroundImage + ')' : ''">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>{{ titleKey | translate }}</h1>
        <p class="hero-subtitle">{{ subtitleKey | translate }}</p>
      </div>
    </section>
  `,
  styles: [`
    .hero-banner {
      position: relative;
      height: 400px;
      background: linear-gradient(135deg, #0ea5a4 0%, #14b8a6 100%);
      background-size: cover;
      background-position: center;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-align: center;
      margin-bottom: 3rem;
      overflow: hidden;
    }

    .hero-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.3);
    }

    .hero-content {
      position: relative;
      z-index: 2;
      animation: slideUp 0.8s ease-out;
    }

    .hero-banner h1 {
      font-size: 3.5rem;
      margin: 0 0 1rem 0;
      font-weight: 700;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }

    .hero-subtitle {
      font-size: 1.3rem;
      margin: 0;
      opacity: 0.95;
      font-weight: 300;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      .hero-banner {
        height: 300px;
      }

      .hero-banner h1 {
        font-size: 2.2rem;
      }

      .hero-subtitle {
        font-size: 1rem;
      }
    }
  `]
})
export class HeroComponent {
  @Input() titleKey: string = '';
  @Input() subtitleKey: string = '';
  @Input() backgroundImage?: string;
}
