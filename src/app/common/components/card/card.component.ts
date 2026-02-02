import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

export interface CardConfig {
  title: string;
  description: string;
  icon?: string;
  link?: string;
  image?: string;
  arrow?: boolean;
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() config!: CardConfig;

  onHover(): void {
    // Add custom hover logic if needed
  }

  onLeave(): void {
    // Add custom leave logic if needed
  }
}
