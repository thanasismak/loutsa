import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SectionComponent, GalleryComponent as GalleryGridComponent } from '@app/common/components';

@Component({
  selector: 'app-gallery-page',
  standalone: true,
  imports: [CommonModule, TranslateModule, SectionComponent, GalleryGridComponent],
  template: `
    <app-section [title]="'gallery.title' | translate">
      <app-gallery [itemsInput]="galleryImages()"></app-gallery>
    </app-section>
  `,
  styles: []
})
export class GalleryComponent {
  galleryImages = signal([
    { title: 'Camping Tent', image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&h=600&fit=crop' },
    { title: 'Beach View', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=600&fit=crop' },
    { title: 'Sunset', image: 'https://images.unsplash.com/photo-1495995424756-f1be0f4f4f75?w=600&h=600&fit=crop' },
    { title: 'Mountain Camp', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=600&fit=crop' },
    { title: 'Forest Trail', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=600&fit=crop' },
    { title: 'Night Sky', image: 'https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?w=600&h=600&fit=crop' },
    { title: 'Campfire', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=600&fit=crop' },
    { title: 'Hiking', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop' },
    { title: 'Ocean', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop' },
  ]);
}
