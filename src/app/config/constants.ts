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
