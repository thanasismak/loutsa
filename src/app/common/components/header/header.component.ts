import { Component, signal, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SelectComponent, SelectOption } from '../index';
import { 
  Language, 
  LANGUAGES, 
  SITE_CONFIG 
} from '../../../config/constants';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, SelectComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private readonly translate = inject(TranslateService);

  title = signal(SITE_CONFIG.title);
  currentLang = signal<Language>('el');
  menuOpen = signal(false);
  languageOptions = signal<SelectOption[]>([
    { value: 'el', label: LANGUAGES.el.label, icon: LANGUAGES.el.flag },
    { value: 'en', label: LANGUAGES.en.label, icon: LANGUAGES.en.flag }
  ]);

  constructor() {
    // Watch for language changes and apply them
    effect(() => {
      const lang = this.currentLang();
      this.translate.use(lang);
    });
  }

  switchLang(lang: string | number): void {
    const langStr = String(lang);
    if (Object.keys(LANGUAGES).includes(langStr)) {
      this.currentLang.set(langStr as Language);
    }
  }

  toggleMenu(): void {
    this.menuOpen.set(!this.menuOpen());
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
