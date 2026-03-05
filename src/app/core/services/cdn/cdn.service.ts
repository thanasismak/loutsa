import { Injectable, signal, computed } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IMAGE_ALT, ImageAsset } from '../../../config/constants';

export type ImageFolder = 'hero' | 'large' | 'medium' | 'thumb';

/**
 * CdnService — single source of truth for asset URLs.
 *
 * Dev  → 'assets/images/hero/loutsa01.jpg'   (local fallback)
 * Prod → 'https://assets.loutsacamping.gr/images/hero/loutsa01.jpg'  (R2)
 *
 * The base URL is held as a writable signal.
 * Use imageSignal() / assetSignal() to get computed() signals in components
 * — they update automatically if the base ever changes at runtime.
 */
@Injectable({ providedIn: 'root' })
export class CdnService {
  private readonly _base = signal(environment.cdnBase);

  /** Read-only view of the current CDN base URL */
  readonly base = this._base.asReadonly();

  /**
   * Override CDN base at runtime.
   * Useful for switching CDN provider or for integration tests.
   */
  setBase(url: string): void {
    this._base.set(url);
  }

  private pad(n: number): string {
    return String(n).padStart(2, '0');
  }

  /**
   * Returns the full URL for one image.
   * When called inside a computed() / effect() context, it is reactive.
   *
   * R2 bucket structure (no /images/ prefix):
   *   Prod → https://assets.loutsacamping.gr/{folder}/loutsa{NN}.jpg
   *   Dev  → assets/images/{folder}/loutsa{NN}.jpg  (local Angular assets)
   */
  imageUrl(folder: ImageFolder, n: number): string {
    const base = this._base();
    return base
      ? `${base}/${folder}/loutsa${this.pad(n)}.jpg`
      : `assets/images/${folder}/loutsa${this.pad(n)}.jpg`;
  }

  /**
   * Returns a computed Signal<string> for an image.
   * Bind directly to template: [src]="heroImage()"
   */
  imageSignal(folder: ImageFolder, n: number) {
    return computed(() => this.imageUrl(folder, n));
  }

  /**
   * Returns a computed Signal<ImageAsset> (url + SEO alt text).
   * Use when you need both src and alt reactively.
   */
  assetSignal(folder: ImageFolder, n: number) {
    return computed<ImageAsset>(() => ({
      url: this.imageUrl(folder, n),
      alt: IMAGE_ALT[folder](n),
    }));
  }

  /**
   * Returns a computed Signal<ImageAsset[]> for a list of images.
   * Pass the list of [folder, number] pairs to generate a reactive array.
   *
   * Example:
   *   readonly slides = this.cdn.listSignal([
   *     ['hero', 1], ['hero', 2], ['hero', 3]
   *   ]);
   */
  listSignal(items: Array<[ImageFolder, number]>) {
    return computed<ImageAsset[]>(() =>
      items.map(([folder, n]) => ({
        url: this.imageUrl(folder, n),
        alt: IMAGE_ALT[folder](n),
      }))
    );
  }
}
