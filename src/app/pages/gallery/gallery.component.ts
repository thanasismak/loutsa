import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SectionComponent, GalleryComponent as GalleryGridComponent } from '@app/common/components';
import { GalleryItem } from '@app/common/components/gallery/gallery.component';
import { CdnService } from '@app/core/services/cdn/cdn.service';

@Component({
  selector: 'app-gallery-page',
  standalone: true,
  imports: [CommonModule, TranslateModule, SectionComponent, GalleryGridComponent],
  template: `
    <app-section [title]="'gallery.title' | translate">
      <app-gallery [itemsInput]="galleryImages"></app-gallery>
    </app-section>
  `,
  styles: []
})
export class GalleryComponent {
  private readonly cdn = inject(CdnService);

  /**
   * 9 unique photos confirmed by file-size deduplication across medium/ and large/ folders.
   * Duplicate groups (same bytes → same file):
   *   01 = 04 = 27 | 02 = 03 = 29 | 05 = 26 = 30 | 08 = 10
   *   09 = 11 = 15 | 12 = 24 = 25 | 16 = 22 = 28 | 17 = 19 = 20
   * Only the lowest-numbered representative is kept.
   * Every entry has both medium (preview) and large (lightbox zoom).
   */
  readonly galleryImages: GalleryItem[] = [
    { image: this.cdn.imageUrl('medium',  1), fullImage: this.cdn.imageUrl('large',  1) },
    { image: this.cdn.imageUrl('medium',  2), fullImage: this.cdn.imageUrl('large',  2) },
    { image: this.cdn.imageUrl('medium',  5), fullImage: this.cdn.imageUrl('large',  5) },
    { image: this.cdn.imageUrl('medium',  7), fullImage: this.cdn.imageUrl('large',  7) },
    { image: this.cdn.imageUrl('medium',  8), fullImage: this.cdn.imageUrl('large',  8) },
    { image: this.cdn.imageUrl('medium',  9), fullImage: this.cdn.imageUrl('large',  9) },
    { image: this.cdn.imageUrl('medium', 12), fullImage: this.cdn.imageUrl('large', 12) },
    { image: this.cdn.imageUrl('medium', 16), fullImage: this.cdn.imageUrl('large', 16) },
    { image: this.cdn.imageUrl('medium', 17), fullImage: this.cdn.imageUrl('large', 17) },
  ];
}

