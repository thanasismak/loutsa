import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

export interface HeroUsp {
  icon: 'beach' | 'star' | 'calendar';
  textKey: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  titleKey = input<string>('');
  subtitleKey = input<string>('');
  backgroundImage = input<string | undefined>();
  mobileImage = input<string | undefined>();
  variant = input<'default' | 'split'>('default');
  eyebrow = input<string>('');
  usps = input<HeroUsp[]>([]);
  primaryCtaKey = input<string>('');
  primaryCtaLink = input<string>('');
  secondaryCtaKey = input<string>('');
  secondaryCtaLink = input<string>('');

  bgDesktop = computed(() =>
    this.backgroundImage() ? `url(${this.backgroundImage()})` : 'none'
  );
  bgMobile = computed(() =>
    `url(${this.mobileImage() ?? this.backgroundImage() ?? ''})`
  );
}
