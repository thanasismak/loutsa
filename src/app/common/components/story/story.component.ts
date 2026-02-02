import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="story-section">
      <div class="story-content">
        <div class="story-text">
          <h2>{{ titleKey | translate }}</h2>
          <p>{{ introKey | translate }}</p>
          <p>{{ detail1Key | translate }}</p>
          <p>{{ detail2Key | translate }}</p>
        </div>
        <div class="story-image">
          <img [src]="imageUrl" [alt]="titleKey" class="fade-in">
        </div>
      </div>
    </section>
  `,
  styles: [`
    .story-section {
      padding: 3rem 1rem;
      margin: 2rem 0;
    }

    .story-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
    }

    .story-text h2 {
      color: #5a3a28;
      font-size: 2rem;
      margin: 0 0 1.5rem 0;
    }

    .story-text p {
      color: #334155;
      line-height: 1.8;
      margin: 0 0 1.5rem 0;
      font-size: 1rem;
    }

    .story-image img {
      width: 100%;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
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

    .fade-in {
      animation: slideUp 0.8s ease-out;
    }

    @media (max-width: 768px) {
      .story-content {
        grid-template-columns: 1fr;
      }

      .story-text h2 {
        font-size: 1.5rem;
      }
    }
  `]
})
export class StoryComponent {
  @Input() titleKey: string = '';
  @Input() introKey: string = '';
  @Input() detail1Key: string = '';
  @Input() detail2Key: string = '';
  @Input() imageUrl: string = 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&h=400&fit=crop';
}
