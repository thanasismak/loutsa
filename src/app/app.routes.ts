import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    data: {
      seo: {
        title: 'Camping Loutsa',
        description: 'Family-run camping in Finikounda, Messinia, Greece. Modern facilities, beach access, authentic Greek hospitality.'
      }
    }
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'gallery',
    loadComponent: () => import('./pages/gallery/gallery.component').then(m => m.GalleryComponent)
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing/pricing.component').then(m => m.PricingComponent)
  },
  {
    path: 'things-to-do',
    loadComponent: () => import('./pages/things-to-do/things-to-do.component').then(m => m.ThingsToDoComponent)
  },
  {
    path: 'facilities',
    loadComponent: () => import('./pages/facilities/facilities.component').then(m => m.FacilitiesComponent)
  },
  {
    path: 'how-to-reach',
    loadComponent: () => import('./pages/how-to-reach/how-to-reach.component').then(m => m.HowToReachComponent)
  },
  {
    path: 'rules',
    loadComponent: () => import('./pages/rules/rules.component').then(m => m.RulesComponent)
  },
  {
    path: 'faq',
    loadComponent: () => import('./pages/faq/faq.component').then(m => m.FaqComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
