import { GalleryItem } from '@app/common/components/gallery/gallery.component';
import { FeaturedContent } from '@app/common/components/featured/featured.component';
import { IMAGES } from '@app/config/constants';

export const HOME_FEATURED_CONTENT: FeaturedContent = {
  titleKey: 'home.feature_nature',
  descriptionKey: 'home.feature_nature_desc',
  imageUrl: IMAGES.large(17),
  imageAlt: 'Camping View',
  variant: 'grid-animated'
};

export const HOME_NAVIGATION_CARDS = [
  { title: 'app.nav.about',       description: 'home.about_desc',        link: '/about',        arrow: true, backgroundImage: IMAGES.medium(3) },
  { title: 'app.nav.facilities',  description: 'home.facilities_desc',   link: '/facilities',   arrow: true, backgroundImage: IMAGES.medium(5) },
  { title: 'app.nav.pricing',     description: 'home.pricing_desc',      link: '/pricing',      arrow: true, backgroundImage: IMAGES.medium(23) },
  { title: 'app.nav.gallery',     description: 'home.gallery_desc',      link: '/gallery',      arrow: true, backgroundImage: IMAGES.medium(11) },
  { title: 'app.nav.activities',  description: 'home.activities_desc',   link: '/things-to-do', arrow: true, backgroundImage: IMAGES.medium(14) },
  { title: 'app.nav.how_to_reach',description: 'home.how_to_reach_desc', link: '/how-to-reach', arrow: true, backgroundImage: IMAGES.medium(17) },
  { title: 'app.nav.rules',       description: 'home.rules_desc',        link: '/rules',        arrow: true, backgroundImage: IMAGES.medium(20) },
  { title: 'app.nav.faq',         description: 'home.faq_desc',          link: '/faq',          arrow: true, backgroundImage: IMAGES.medium(8) },
  { title: 'app.nav.contact',     description: 'home.contact_desc',      link: '/contact',      arrow: true, backgroundImage: IMAGES.medium(26) },
];

export const HOME_FEATURE_ITEMS: GalleryItem[] = [
  {
    title: 'home.nearby_beaches',
    description: 'home.nearby_beaches_desc',
    image: IMAGES.medium(2)
  },
  {
    title: 'home.nearby_dining',
    description: 'home.nearby_dining_desc',
    image: IMAGES.medium(6)
  },
  {
    title: 'home.nearby_activities',
    description: 'home.nearby_activities_desc',
    image: IMAGES.medium(9)
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
