import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CdnService } from '@app/core/services/cdn/cdn.service';
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
  private readonly cdn = inject(CdnService);

  readonly heroImage = this.cdn.imageSignal('hero', 2);
  readonly heroImageMobile = this.cdn.imageSignal('medium', 2);

  whyCards = signal<WhyCard[]>([
    { 
      icon: '🏖️', 
      titleKey: 'about.why_location', 
      descKey: 'about.why_location_desc' 
    },
    { 
      icon: '⚙️', 
      titleKey: 'about.why_facilities', 
      descKey: 'about.why_facilities_desc' 
    },
    { 
      icon: '👨‍👩‍👧‍👦', 
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
    { value: '44+', labelKey: 'about.stat_years' },
    { value: '1000s', labelKey: 'about.stat_guests' },
    { value: '70', labelKey: 'about.stat_sites' },
    { value: '24/7', labelKey: 'about.stat_support' }
  ]);
}
