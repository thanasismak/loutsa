/**
 * Application-wide constants and configuration
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

// Dev  → 'assets/images/hero/loutsa01.jpg'              (relative Angular asset)
// Prod → 'https://assets.camping-loutsa.gr/images/hero/loutsa01.jpg'  (CDN)
const pad = (n: number) => String(n).padStart(2, '0');
const img = (folder: string, n: number): string =>
  environment.cdnBase
    ? `${environment.cdnBase}/images/${folder}/loutsa${pad(n)}.jpg`
    : `assets/images/${folder}/loutsa${pad(n)}.jpg`;

export const IMAGES = {
  hero:   (n: number) => img('hero',   n),
  large:  (n: number) => img('large',  n),
  medium: (n: number) => img('medium', n),
  thumb:  (n: number) => img('thumb',  n),
} as const;

export const SITE_CONFIG = {
  title: 'Camping Loutsa',
  logo: '⛺',
  contact: {
    phone: '+30 27230 71200',
    email: 'loutsa@otenet.gr',
    location: 'Finikounda, Messinia, Greece'
  },
  translationPath: './assets/i18n/'
} as const;
