/**
 * Application-wide constants and configuration
 * Single source of truth — all site-wide values live here.
 * Update this file when brand details, social profiles, or endpoints change.
 */

export type Language = 'en' | 'el' | 'de';

export interface LanguageConfig {
  code: Language;
  name: string;
  flag: string;
  label: string;
}

export const LANGUAGES: Record<Language, LanguageConfig> = {
  en: {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
    label: 'EN'
  },
  el: {
    code: 'el',
    name: 'Ελληνικά',
    flag: '🇬🇷',
    label: 'ΕΛ'
  },
  de: {
    code: 'de',
    name: 'Deutsch',
    flag: '🇩🇪',
    label: 'DE'
  }
};

export const DEFAULT_LANGUAGE: Language = 'el';

export const I18N_LANGUAGES = Object.keys(LANGUAGES) as Language[];

import { environment } from '../../environments/environment';

// ---------------------------------------------------------------------------
// Image URL helpers
// R2 bucket layout: {folder}/ at root — NO /images/ prefix in CDN URLs
// Dev  → 'assets/images/hero/loutsa01.jpg'   (local Angular assets)
// Prod → 'https://assets.loutsacamping.gr/hero/loutsa01.jpg'  (R2)
// ---------------------------------------------------------------------------
const pad = (n: number) => String(n).padStart(2, '0');
const img = (folder: string, n: number): string =>
  environment.cdnBase
    ? `${environment.cdnBase}/${folder}/loutsa${pad(n)}.jpg`
    : `assets/images/${folder}/loutsa${pad(n)}.jpg`;

const namedImg = (folder: string, name: string): string =>
  environment.cdnBase
    ? `${environment.cdnBase}/${folder}/${name}.jpg`
    : `assets/images/${folder}/${name}.jpg`;

export const IMAGES = {
  hero:   (n: number) => img('hero',   n),
  large:  (n: number) => img('large',  n),
  medium: (n: number) => img('medium', n),
  thumb:  (n: number) => img('thumb',  n),
} as const;

/** Named (non-numbered) image references */
export const NAMED_IMAGES = {
  panas_parking: {
    medium: namedImg('medium', 'panas_parking'),
    large:  namedImg('large',  'panas_parking'),
  },
} as const;

// ---------------------------------------------------------------------------
// Image alt-text catalog (SEO labels)
// Add descriptive entries here; slots without an entry get a sensible default.
// ---------------------------------------------------------------------------
const ALT_CATALOG: Record<string, Record<number, string>> = {
  hero: {
    1: 'Aerial view of Camping Loutsa beachfront in Finikounda, Messinia',
    2: 'Camping Loutsa sunset over the Ionian Sea',
    3: 'Shaded tent pitches at Camping Loutsa surrounded by olive trees',
  },
  large: {
    17: 'Lush greenery and swimming area at Camping Loutsa, Finikounda',
  },
  medium: {
    1: 'Camping Loutsa main entrance and reception area',
    2: 'Crystal-clear beach at Finikounda near Camping Loutsa',
    3: 'Cosy tent site at Camping Loutsa with sea view',
    5: 'On-site facilities and services at Camping Loutsa',
    6: 'Local taverna and dining near Camping Loutsa',
    8: 'Affordable camping rates at Camping Loutsa Finikounda',
    9: 'Water sports and activities near Camping Loutsa',
    11: 'Gallery view of Camping Loutsa beach and grounds',
    14: 'Hiking and outdoor activities around Finikounda',
    17: 'Scenic panorama of Loutsa coastline in Messinia',
    20: 'Camping rules board at the Loutsa campsite entrance',
    23: 'Frequently asked questions about Camping Loutsa',
    26: 'Contact and booking information for Camping Loutsa',
  },
  thumb: {},
};

const defaultAlt = (folder: string, n: number) =>
  `Camping Loutsa – ${folder} photo ${pad(n)}, Finikounda Messinia Greece`;

export const IMAGE_ALT = {
  hero:   (n: number) => ALT_CATALOG['hero']?.[n]   ?? defaultAlt('hero',   n),
  large:  (n: number) => ALT_CATALOG['large']?.[n]  ?? defaultAlt('large',  n),
  medium: (n: number) => ALT_CATALOG['medium']?.[n] ?? defaultAlt('medium', n),
  thumb:  (n: number) => ALT_CATALOG['thumb']?.[n]  ?? defaultAlt('thumb',  n),
} as const;

/** Convenience: combined URL + alt text for a single image slot */
export interface ImageAsset {
  url: string;
  alt: string;
}

export const IMAGE_ASSET = {
  hero:   (n: number): ImageAsset => ({ url: IMAGES.hero(n),   alt: IMAGE_ALT.hero(n)   }),
  large:  (n: number): ImageAsset => ({ url: IMAGES.large(n),  alt: IMAGE_ALT.large(n)  }),
  medium: (n: number): ImageAsset => ({ url: IMAGES.medium(n), alt: IMAGE_ALT.medium(n) }),
  thumb:  (n: number): ImageAsset => ({ url: IMAGES.thumb(n),  alt: IMAGE_ALT.thumb(n)  }),
} as const;

// ---------------------------------------------------------------------------
// Social media links
// Update URLs here when profiles change — referenced by footer, SEO, etc.
// ---------------------------------------------------------------------------
export interface SocialLink {
  id: 'facebook' | 'instagram' | 'tripadvisor' | 'google';
  url: string;
  label: string;
  /** Icon identifier — matches svg-icon names or inline SVG branches */
  icon: string;
  ariaLabel: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'facebook',
    url: 'https://www.facebook.com/profile.php?id=100047802797401',
    label: 'Facebook',
    icon: 'facebook',
    ariaLabel: 'Visit Camping Loutsa on Facebook',
  },
  {
    id: 'instagram',
    url: 'https://www.instagram.com/loutsacamping/',
    label: 'Instagram',
    icon: 'instagram',
    ariaLabel: 'Follow Camping Loutsa on Instagram',
  },
  {
    id: 'tripadvisor',
    url: 'https://www.tripadvisor.com.gr/Hotel_Review-g667238-d17592513-Reviews-Camping_Loutsa-Finikounda_Pylos_Nestor_Messenia_Region_Peloponnese.html',
    label: 'TripAdvisor',
    icon: 'tripadvisor',
    ariaLabel: 'Read Camping Loutsa reviews on TripAdvisor',
  },
  {
    id: 'google',
    url: 'https://www.google.com/travel/search?gsas=1&ts=CAESCAoCCAMKAggDGiAKABIcEhQKBwjqDxADGAkSBwjqDxADGAoYATIECAAQAA&qs=MhRDZ3NJajdmRGlwaUFrZlAzQVJBQjgCSAA&ap=MAC6AQdyZXZpZXdz',
    label: 'Google',
    icon: 'google',
    ariaLabel: 'Read Camping Loutsa reviews on Google',
  },
];

// ---------------------------------------------------------------------------
// Google Places configuration
// ---------------------------------------------------------------------------
export const GOOGLE_CONFIG = {
  /** Google Place ID for Camping Loutsa — used for reviews & Maps embed */
  placeId: 'ChIJNafOuo13YRMRj9tQgQFE5vc',
  /** Direct link to write a Google review */
  reviewLink: 'https://search.google.com/local/writereview?placeid=ChIJNafOuo13YRMRj9tQgQFE5vc',
  /** Max number of reviews to display */
  maxReviews: 6,
} as const;

// ---------------------------------------------------------------------------
// Site-wide configuration
// ---------------------------------------------------------------------------
export const SITE_CONFIG = {
  title: 'Camping Loutsa',
  logo: '⛺',
  url: 'https://loutsacamping.gr',
  contact: {
    phone: '+30 27230 71200',
    email: 'loutsacamping@gmail.com',
    location: 'Finikounda, Messinia, Greece',
  },
  translationPath: './assets/i18n/',
} as const;
