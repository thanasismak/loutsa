import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './common/components';
import { I18N_LANGUAGES, DEFAULT_LANGUAGE, SITE_CONFIG } from './config/constants';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  readonly translate = inject(TranslateService);

  ngOnInit(): void {
    console.log('AppComponent initializing...');
    this.translate.addLangs(I18N_LANGUAGES);
    this.translate.setDefaultLang(DEFAULT_LANGUAGE);
    console.log('Added languages:', I18N_LANGUAGES);
    console.log('Default language set to:', DEFAULT_LANGUAGE);
  }
}
