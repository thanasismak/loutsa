import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
import { MetaService } from './meta.service';
import { StructuredDataService } from './structured-data.service';
import { SeoMeta, SeoLocale, LocalBusinessSchema } from './seo.config';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private baseUrl = 'https://loutsa.gr';
  
  // Site-wide organization schema (inject once at app start)
  private siteOrganization = {
    name: 'Camping Loutsa',
    description: 'Family-run camping in Finikounda, Messinia, Greece',
    url: this.baseUrl,
    logo: `${this.baseUrl}/assets/logo.png`,
    email: 'info@loutsa.gr',
    phone: '+30 27350 77600',
    address: {
      streetAddress: 'Finikounda',
      addressLocality: 'Messinia',
      addressRegion: 'Peloponnese',
      postalCode: '24400',
      addressCountry: 'GR'
    },
    sameAs: [
      'https://www.facebook.com/campingloutsa',
      'https://www.instagram.com/camploutsa'
    ]
  };

  constructor(
    private metaService: MetaService,
    private structuredDataService: StructuredDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService
  ) {
    this.initSEO();
  }

  /**
   * Initialize SEO on app startup
   */
  private initSEO(): void {
    // Inject organization schema once
    this.structuredDataService.injectOrganizationSchema(this.siteOrganization);

    // Inject local business schema with hours
    const localBusiness: LocalBusinessSchema = {
      ...this.siteOrganization,
      image: `${this.baseUrl}/assets/camping-image.jpg`,
      priceRange: '€30-€80',
      areaServed: ['Messinia', 'Peloponnese', 'Greece'],
      openingHoursSpecification: [
        {
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '08:00',
          closes: '22:00'
        }
      ]
    };
    this.structuredDataService.injectLocalBusinessSchema(localBusiness);

    // Listen to route changes and update meta tags
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updatePageMeta(event.url);
      });

    // Listen to language changes
    this.translateService.onLangChange.subscribe(() => {
      this.updateForLanguage(this.getCurrentLocale());
    });
  }

  /**
   * Update meta tags based on current route
   */
  private updatePageMeta(url: string): void {
    const data = this.activatedRoute.snapshot.data as any;

    if (data?.seo) {
      const seoConfig: SeoMeta = {
        ...data.seo,
        canonical: `${this.baseUrl}${url.split('#')[0]}`,
        locale: this.getCurrentLocale()
      };

      this.metaService.updateMeta(seoConfig);
      
      // Update breadcrumbs if needed
      if (data.seo.breadcrumbs) {
        this.structuredDataService.injectBreadcrumbSchema(data.seo.breadcrumbs);
      }
    }
  }

  /**
   * Update locale in meta tags
   */
  private updateForLanguage(locale: SeoLocale): void {
    const currentMeta = this.metaService.meta();
    this.metaService.updateMeta({ ...currentMeta, locale });
  }

  /**
   * Get current locale from translate service
   */
  private getCurrentLocale(): SeoLocale {
    const lang = this.translateService.currentLang || this.translateService.defaultLang;
    return lang === 'el' ? 'el_GR' : 'en_US';
  }

  /**
   * Utility: Set page meta and breadcrumbs together
   */
  setPageMeta(config: SeoMeta, breadcrumbs?: any[]): void {
    this.metaService.updateMeta({
      ...config,
      locale: this.getCurrentLocale()
    });

    if (breadcrumbs?.length) {
      this.structuredDataService.injectBreadcrumbSchema(breadcrumbs);
    }
  }
}
