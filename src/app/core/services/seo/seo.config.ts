/**
 * SEO Configuration Types & Interfaces
 * Defines metadata structure for pages and schemas
 */

export type SeoLocale = 'en_US' | 'el_GR';

export interface SeoMeta {
  /** Page title (displayed in browser tab, search results) */
  title: string;
  /** Page description (search results snippet) */
  description: string;
  /** Keywords for page content (comma-separated) */
  keywords?: string[];
  /** Open Graph image URL (social sharing) */
  image?: string;
  /** Page language/locale */
  locale?: SeoLocale;
  /** Twitter image (may differ from OG image) */
  twitterImage?: string;
  /** Canonical URL (prevent duplicate content) */
  canonical?: string;
  /** Is this a no-index page? */
  noindex?: boolean;
  /** Author name */
  author?: string;
}

export interface SeoRouteData {
  seo: SeoMeta;
}

/**
 * Open Graph / Social Meta
 */
export interface OpenGraphMeta extends SeoMeta {
  type?: 'website' | 'article' | 'business.business' | 'place.place';
  url?: string;
  siteName?: string;
  locale?: SeoLocale;
  localeAlternate?: SeoLocale[];
}

/**
 * Organization schema data
 */
export interface OrganizationSchema {
  name: string;
  description: string;
  url: string;
  logo: string;
  email: string;
  phone: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  sameAs: string[]; // Social media URLs
}

/**
 * Local Business schema data
 */
export interface LocalBusinessSchema extends OrganizationSchema {
  priceRange: string;
  openingHoursSpecification: {
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }[];
  areaServed: string[];
  image: string;
}

/**
 * Breadcrumb navigation schema
 */
export interface BreadcrumbSchema {
  name: string;
  url: string;
}

/**
 * Web Page schema
 */
export interface WebPageSchema {
  url: string;
  title: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  breadcrumbs?: BreadcrumbSchema[];
}

/**
 * Aggregate Offer schema (for pricing)
 */
export interface AggregateOfferSchema {
  priceCurrency: string;
  offers: {
    name: string;
    price: number;
    availability: string;
  }[];
}
