import { GalleryItem } from '@app/common/components/gallery/gallery.component';
import { FeaturedContent } from '@app/common/components/featured/featured.component';

export const HOME_FEATURED_CONTENT: FeaturedContent = {
  titleKey: 'home.feature_nature',
  descriptionKey: 'home.feature_nature_desc',
  imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=500&fit=crop',
  imageAlt: 'Camping View',
  variant: 'grid-animated'
};

export const HOME_NAVIGATION_CARDS = [
  { title: 'app.nav.about', description: 'home.about_desc', link: '/about', arrow: true },
  { title: 'app.nav.facilities', description: 'home.facilities_desc', link: '/facilities', arrow: true },
  { title: 'app.nav.pricing', description: 'home.pricing_desc', link: '/pricing', arrow: true },
  { title: 'app.nav.gallery', description: 'home.gallery_desc', link: '/gallery', arrow: true },
  { title: 'app.nav.activities', description: 'home.activities_desc', link: '/things-to-do', arrow: true },
  { title: 'app.nav.how_to_reach', description: 'home.how_to_reach_desc', link: '/how-to-reach', arrow: true },
  { title: 'app.nav.rules', description: 'home.rules_desc', link: '/rules', arrow: true },
  { title: 'app.nav.faq', description: 'home.faq_desc', link: '/faq', arrow: true },
  { title: 'app.nav.contact', description: 'home.contact_desc', link: '/contact', arrow: true }
];

export const HOME_FEATURE_ITEMS: GalleryItem[] = [
  {
    title: 'home.nearby_beaches',
    description: 'home.nearby_beaches_desc',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop'
  },
  {
    title: 'home.nearby_dining',
    description: 'home.nearby_dining_desc',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'
  },
  {
    title: 'home.nearby_activities',
    description: 'home.nearby_activities_desc',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop'
  }
];

export const HOME_TESTIMONIALS = [
  {
    name: 'home.testimonial_name_1',
    title: 'home.testimonial_title_1',
    text: 'home.testimonial_text_1',
    rating: 5
  },
  {
    name: 'home.testimonial_name_2',
    title: 'home.testimonial_title_2',
    text: 'home.testimonial_text_2',
    rating: 5
  },
  {
    name: 'home.testimonial_name_3',
    title: 'home.testimonial_title_3',
    text: 'home.testimonial_text_3',
    rating: 4
  },
  {
    name: 'home.testimonial_name_4',
    title: 'home.testimonial_title_4',
    text: 'home.testimonial_text_4',
    rating: 5
  },
  {
    name: 'home.testimonial_name_5',
    title: 'home.testimonial_title_5',
    text: 'home.testimonial_text_5',
    rating: 5
  },
  {
    name: 'home.testimonial_name_6',
    title: 'home.testimonial_title_6',
    text: 'home.testimonial_text_6',
    rating: 4
  }
];
