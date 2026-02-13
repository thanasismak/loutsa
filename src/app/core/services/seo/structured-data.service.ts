import { Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import {
  OrganizationSchema,
  LocalBusinessSchema,
  BreadcrumbSchema,
  WebPageSchema,
  AggregateOfferSchema
} from './seo.config';

@Injectable({
  providedIn: 'root'
})
export class StructuredDataService {
  private structuredDataId = 'structured-data-schema';

  constructor(@Inject(DOCUMENT) private document: Document) {}

  /**
   * Inject Organization schema (company info)
   * Google uses this for knowledge panels, featured snippets
   */
  injectOrganizationSchema(org: OrganizationSchema): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: org.name,
      description: org.description,
      url: org.url,
      logo: org.logo,
      email: org.email,
      telephone: org.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: org.address.streetAddress,
        addressLocality: org.address.addressLocality,
        addressRegion: org.address.addressRegion,
        postalCode: org.address.postalCode,
        addressCountry: org.address.addressCountry
      },
      sameAs: org.sameAs
    };

    this.injectSchema(schema);
  }

  /**
   * Inject LocalBusiness schema
   * Essential for local SEO, appears in local pack
   */
  injectLocalBusinessSchema(business: LocalBusinessSchema): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: business.name,
      description: business.description,
      url: business.url,
      logo: business.logo,
      image: business.image,
      email: business.email,
      telephone: business.phone,
      priceRange: business.priceRange,
      address: {
        '@type': 'PostalAddress',
        streetAddress: business.address.streetAddress,
        addressLocality: business.address.addressLocality,
        addressRegion: business.address.addressRegion,
        postalCode: business.address.postalCode,
        addressCountry: business.address.addressCountry
      },
      areaServed: business.areaServed,
      openingHoursSpecification: business.openingHoursSpecification.map(hours => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: hours.dayOfWeek,
        opens: hours.opens,
        closes: hours.closes
      })),
      sameAs: business.sameAs
    };

    this.injectSchema(schema);
  }

  /**
   * Inject BreadcrumbList schema
   * Improves navigation visibility, clickable breadcrumbs in search results
   */
  injectBreadcrumbSchema(breadcrumbs: BreadcrumbSchema[]): void {
    const itemListElement = breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }));

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement
    };

    this.injectSchema(schema);
  }

  /**
   * Inject WebPage schema
   * Basic page metadata for search engines
   */
  injectWebPageSchema(page: WebPageSchema): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': page.url,
      url: page.url,
      name: page.title,
      description: page.description,
      ...(page.image && { image: page.image }),
      ...(page.datePublished && { datePublished: page.datePublished }),
      ...(page.dateModified && { dateModified: page.dateModified }),
      ...(page.author && {
        author: {
          '@type': 'Organization',
          name: page.author
        }
      }),
      ...(page.breadcrumbs && {
        breadcrumbs: {
          '@type': 'BreadcrumbList',
          itemListElement: page.breadcrumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: crumb.url
          }))
        }
      })
    };

    this.injectSchema(schema);
  }

  /**
   * Inject AggregateOffer schema
   * For pricing pages - displays price ranges in search results
   */
  injectAggregateOfferSchema(offer: AggregateOfferSchema): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'AggregateOffer',
      priceCurrency: offer.priceCurrency,
      offers: offer.offers.map(o => ({
        '@type': 'Offer',
        name: o.name,
        price: o.price,
        availability: `https://schema.org/${o.availability}`
      }))
    };

    this.injectSchema(schema);
  }

  /**
   * Inject FAQ schema
   * Enables FAQ rich snippets in search results
   */
  injectFAQSchema(faqs: Array<{ question: string; answer: string }>): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };

    this.injectSchema(schema);
  }

  /**
   * Inject Event schema
   * For campfire events, activities, etc.
   */
  injectEventSchema(event: {
    name: string;
    description: string;
    startDate: string;
    endDate?: string;
    location: string;
    image?: string;
  }): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: event.name,
      description: event.description,
      startDate: event.startDate,
      ...(event.endDate && { endDate: event.endDate }),
      location: {
        '@type': 'Place',
        name: event.location
      },
      ...(event.image && { image: event.image })
    };

    this.injectSchema(schema);
  }

  /**
   * Clear all structured data
   */
  clearStructuredData(): void {
    const existing = this.document.getElementById(this.structuredDataId);
    if (existing) {
      existing.remove();
    }
  }

  /**
   * Private helper to inject schema into document head
   */
  private injectSchema(schema: any): void {
    // Remove existing schema
    this.clearStructuredData();

    // Create and inject new schema
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = this.structuredDataId;
    script.textContent = JSON.stringify(schema);

    this.document.head.appendChild(script);
  }
}
