import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

export type BannerVariant = 'ribbon' | 'inline';
export type BannerTheme = 'light' | 'dark';

/**
 * Configuration interface for the Banner component
 */
export interface BannerConfig {
  /** Main message text (supports translation keys) */
  title: string;
  /** Optional subtitle for inline variant */
  subtitle?: string;
  /** Optional background image URL for inline variant */
  imageUrl?: string;
  /** Alt text for image if provided */
  alt?: string;
  /** Banner layout variant: 'ribbon' (fixed top) or 'inline' (page content) */
  variant?: BannerVariant;
  /** Overlay theme for images */
  theme?: BannerTheme;
  /** Make banner clickable */
  clickable?: boolean;
  /** Optional CTA text (supports translation keys) */
  ctaText?: string;
  /** Optional route link */
  routeLink?: string | string[];
  /** Optional external URL */
  externalUrl?: string;
  /** Open external URL in new tab */
  externalUrlNewTab?: boolean;
  /** Optional custom CSS classes */
  customClass?: string;
}

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {
  config = input.required<BannerConfig>();
  bannerClick = output<void>();

  variant = computed(() => this.config().variant ?? 'inline');
  theme = computed(() => this.config().theme ?? 'dark');
  isClickable = computed(() => this.config().clickable ?? false);

  backgroundImage = computed(() => {
    const url = this.config().imageUrl;
    return url ? `url(${url})` : '';
  });

  containerClasses = computed(() => {
    const classes = ['banner', `banner--${this.variant()}`];
    if (this.config().imageUrl) {
      classes.push(`banner--theme-${this.theme()}`);
    }
    if (this.isClickable()) {
      classes.push('banner--clickable');
    }
    if (this.config().customClass) {
      classes.push(this.config().customClass!);
    }
    return classes.join(' ');
  });

  onKeydown(event: Event): void {
    if (!this.isClickable()) return;
    (event as KeyboardEvent).preventDefault();
    this.handleClick();
  }

  onBannerClick(): void {
    if (!this.isClickable()) return;
    this.handleClick();
  }

  private handleClick(): void {
    const cfg = this.config();
    if (cfg.externalUrl) {
      window.open(cfg.externalUrl, cfg.externalUrlNewTab ? '_blank' : '_self');
      return;
    }
    if (!cfg.routeLink) {
      this.bannerClick.emit();
    }
  }
}
