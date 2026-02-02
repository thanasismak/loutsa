import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="gallery-section">
      <h2 class="section-title">{{ 'gallery.title' | translate }}</h2>
      <div class="gallery-grid">
        <div class="gallery-item gallery-item-1" *ngFor="let image of galleryImages; let i = index"
             [style.animation-delay]="(i * 100) + 'ms'">
          <div class="image-wrapper">
            <img [src]="image.url" [alt]="image.title">
            <div class="overlay">
              <p>{{ image.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes zoomIn {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(1.05);
      }
    }

    .gallery-section {
      background: white;
      padding: 2rem;
      border-radius: 8px;
    }

    .section-title {
      color: #0ea5a4;
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 3rem;
      animation: fadeIn 0.8s ease-out;
    }

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }

    .gallery-item {
      position: relative;
      overflow: hidden;
      border-radius: 10px;
      height: 250px;
      animation: scaleIn 0.6s ease-out forwards;
      opacity: 0;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
    }

    .gallery-item:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 25px rgba(14, 165, 164, 0.2);
    }

    .image-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    .image-wrapper img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .gallery-item:hover img {
      animation: zoomIn 0.5s ease forwards;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(14, 165, 164, 0.8) 0%, rgba(20, 184, 166, 0.6) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
      color: white;
      text-align: center;
      padding: 1rem;
    }

    .gallery-item:hover .overlay {
      opacity: 1;
    }

    .overlay p {
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      .gallery-grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
      }

      .gallery-item {
        height: 200px;
      }

      .section-title {
        font-size: 1.8rem;
      }
    }
  `]
})
export class GalleryComponent {
  galleryImages = [
    { title: 'Camping Tent', url: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&h=600&fit=crop' },
    { title: 'Beach View', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=600&fit=crop' },
    { title: 'Sunset', url: 'https://images.unsplash.com/photo-1495995424756-f1be0f4f4f75?w=600&h=600&fit=crop' },
    { title: 'Mountain Camp', url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=600&fit=crop' },
    { title: 'Forest Trail', url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=600&fit=crop' },
    { title: 'Night Sky', url: 'https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?w=600&h=600&fit=crop' },
    { title: 'Campfire', url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=600&fit=crop' },
    { title: 'Hiking', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop' },
    { title: 'Ocean', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop' },
  ];
}
