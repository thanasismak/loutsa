import { Injectable, signal, computed } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoMeta, OpenGraphMeta, SeoLocale } from './seo.config';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private metaSignal = signal<SeoMeta>({
    title: 'Camping Loutsa',
    description: 'Family-run camping in Finikounda, Messinia, Greece'
  });

  private locale = signal<SeoLocale>('en_US');

  meta = this.metaSignal.asReadonly();
  currentLocale = this.locale.asReadonly();

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  /**
   * Update meta tags from SEO configuration
   */
  updateMeta(config: SeoMeta): void {
    this.metaSignal.set(config);
    
    // Update title
    const titleText = this.buildTitle(config.title);
    this.titleService.setTitle(titleText);
    
    // Update description
    this.updateMetaTag('description', config.description);
    this.updateMetaTag('og:description', config.description);
    this.updateMetaTag('twitter:description', config.description);
    
    // Update keywords
    if (config.keywords?.length) {
      this.updateMetaTag('keywords', config.keywords.join(', '));
    }
    
    // Update images
    if (config.image) {
      this.updateMetaTag('image', config.image);
      this.updateMetaTag('og:image', config.image);
    }
    
    // Twitter specific image
    if (config.twitterImage) {
      this.updateMetaTag('twitter:image', config.twitterImage);
    } else if (config.image) {
      this.updateMetaTag('twitter:image', config.image);
    }
    
    // Update title tags for social
    this.updateMetaTag('og:title', config.title);
    this.updateMetaTag('twitter:title', config.title);
    
    // Canonical URL
    if (config.canonical) {
      this.updateLinkTag('canonical', config.canonical);
    }
    
    // No-index directive
    if (config.noindex) {
      this.updateMetaTag('robots', 'noindex, nofollow');
    } else {
      this.removeMetaTag('robots');
    }
    
    // Author
    if (config.author) {
      this.updateMetaTag('author', config.author);
    }
    
    // Update locale
    if (config.locale) {
      this.locale.set(config.locale);
      this.updateMetaTag('og:locale', config.locale);
    }
  }

  /**
   * Update Open Graph meta tags for social sharing
   */
  updateOpenGraph(config: OpenGraphMeta): void {
    this.updateMeta(config);
    
    if (config.type) {
      this.updateMetaTag('og:type', config.type);
    }
    
    if (config.url) {
      this.updateMetaTag('og:url', config.url);
    }
    
    if (config.siteName) {
      this.updateMetaTag('og:site_name', config.siteName);
    }
    
    if (config.localeAlternate?.length) {
      this.updateMetaTag('og:locale:alternate', config.localeAlternate.join(', '));
    }
  }

  /**
   * Update Twitter Card meta tags
   */
  updateTwitterCard(title: string, description: string, image?: string): void {
    this.updateMetaTag('twitter:card', 'summary_large_image');
    this.updateMetaTag('twitter:title', title);
    this.updateMetaTag('twitter:description', description);
    
    if (image) {
      this.updateMetaTag('twitter:image', image);
    }
  }

  /**
   * Set language alternate links
   */
  setLanguageAlternates(languages: Array<{ hrefLang: string; href: string }>): void {
    languages.forEach(lang => {
      this.updateLinkTag(`alternate-${lang.hrefLang}`, lang.href, {
        rel: 'alternate',
        'hreflang': lang.hrefLang
      });
    });
  }

  /**
   * Set canonical URL
   */
  setCanonical(url: string): void {
    this.updateLinkTag('canonical', url);
  }

  /**
   * Clear all custom meta tags
   */
  clearMeta(): void {
    this.metaSignal.set({
      title: 'Camping Loutsa',
      description: 'Family-run camping in Finikounda, Messinia, Greece'
    });
  }

  /**
   * Private helpers
   */
  private buildTitle(pageTitle: string): string {
    const siteName = 'Camping Loutsa';
    return pageTitle === siteName ? siteName : `${pageTitle} | ${siteName}`;
  }

  private updateMetaTag(name: string, content: string): void {
    const tag = this.metaService.getTag(`name='${name}'`) 
      || this.metaService.getTag(`property='${name}'`);
    
    if (tag) {
      tag.setAttribute('content', content);
    } else {
      // Determine if it's a property (og:, twitter:) or name attribute
      const isProperty = name.includes(':');
      if (isProperty) {
        this.metaService.addTag({ property: name, content });
      } else {
        this.metaService.addTag({ name, content });
      }
    }
  }

  private updateLinkTag(rel: string, href: string, attrs?: Record<string, string>): void {
    let tag = this.metaService.getTag(`rel='${rel}'`);
    
    if (tag) {
      tag.setAttribute('href', href);
      if (attrs) {
        Object.entries(attrs).forEach(([key, value]) => {
          tag.setAttribute(key, value);
        });
      }
    } else {
      const linkTag = { rel, href, ...attrs };
      this.metaService.addTag(linkTag as any);
    }
  }

  private removeMetaTag(name: string): void {
    this.metaService.removeTag(`name='${name}'`);
  }
}
