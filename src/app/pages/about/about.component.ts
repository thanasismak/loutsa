import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SectionComponent, GalleryComponent } from '@app/common/components';
import { GalleryItem } from '@app/common/components/gallery/gallery.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TranslateModule, SectionComponent, GalleryComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  // Gallery items for "Why Camping Loutsa?" section
  whyItems = signal<GalleryItem[]>([
    { title: 'home.why_modern', description: 'home.why_modern_desc' },
    { title: 'home.why_booking', description: 'home.why_booking_desc' },
    { title: 'home.why_support', description: 'home.why_support_desc' }
  ]);
}
