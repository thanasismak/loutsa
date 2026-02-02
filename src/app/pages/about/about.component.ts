import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {
  HeroComponent,
  CardsGridComponent,
  StoryComponent,
  MissionValuesComponent,
  StatsComponent
} from '@app/common/components';

interface WhyCard {
  icon: string;
  titleKey: string;
  descKey: string;
}

interface StatItem {
  value: string;
  labelKey: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    HeroComponent,
    CardsGridComponent,
    StoryComponent,
    MissionValuesComponent,
    StatsComponent
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  whyCards = signal<WhyCard[]>([
    { 
      icon: '🌍', 
      titleKey: 'about.why_location', 
      descKey: 'about.why_location_desc' 
    },
    { 
      icon: '⭐', 
      titleKey: 'about.why_facilities', 
      descKey: 'about.why_facilities_desc' 
    },
    { 
      icon: '🏕️', 
      titleKey: 'about.why_experience', 
      descKey: 'about.why_experience_desc' 
    },
    { 
      icon: '❤️', 
      titleKey: 'about.why_community', 
      descKey: 'about.why_community_desc' 
    }
  ]);

  stats = signal<StatItem[]>([
    { value: '15+', labelKey: 'about.stat_years' },
    { value: '10K+', labelKey: 'about.stat_guests' },
    { value: '50+', labelKey: 'about.stat_sites' },
    { value: '24/7', labelKey: 'about.stat_support' }
  ]);
}
