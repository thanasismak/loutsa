import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialLink, SOCIAL_LINKS } from '../../../config/constants';

@Component({
  selector: 'app-social-links',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.scss'],
})
export class SocialLinksComponent {
  /** Override the default SOCIAL_LINKS if needed */
  links = input<SocialLink[]>(SOCIAL_LINKS);

  /** Visual variant */
  variant = input<'default' | 'compact' | 'labeled'>('default');
}
