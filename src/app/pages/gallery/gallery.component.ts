import { Component, inject, computed } from '@angular/core';
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
      <app-gallery [itemsInput]="galleryImages()"></app-gallery>
    </app-section>
  `,
  styles: []
})
export class GalleryComponent {
  private readonly cdn = inject(CdnService);

  /**
   * Gallery images sourced from R2.
   * Add/remove entries here as new photos are uploaded to the bucket.
   *
   * Naming convention: /images/{folder}/loutsa{NN}.jpg
   * medium = 400-600px  |  large = 800-1200px  |  hero = 1400px+
   */
  private readonly _assets = this.cdn.listSignal([
    ['medium',  1],
    ['medium',  2],
    ['medium',  3],
    ['medium',  5],
    ['medium',  6],
    ['medium',  8],
    ['medium',  9],
    ['medium', 11],
    ['medium', 14],
    ['medium', 17],
    ['medium', 20],
    ['medium', 23],
    ['medium', 26],
    ['large',  17],
  ]);

  readonly galleryImages = computed<GalleryItem[]>(() =>
    this._assets().map(asset => ({ image: asset.url, alt: asset.alt }))
  );
}

