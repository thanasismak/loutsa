import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SectionComponent, TilesComponent, DataTableComponent } from '@app/common/components';

interface Beach {
  emoji: string;
  nameKey: string;
  charKey: string;
  forKey: string;
  distance: string;
}

interface Monument {
  icon: string;
  titleKey: string;
  descKey: string;
}

@Component({
  selector: 'app-things-to-do',
  standalone: true,
  imports: [CommonModule, TranslateModule, SectionComponent, TilesComponent, DataTableComponent],
  templateUrl: './things-to-do.component.html',
  styleUrl: './things-to-do.component.scss'
})
export class ThingsToDoComponent {

  beaches = signal<Beach[]>([
    { emoji: '🏖️', nameKey: 'activities.beach_loutsa',         charKey: 'activities.beach_loutsa_char',         forKey: 'activities.beach_loutsa_for',         distance: '0 km' },
    { emoji: '🌊', nameKey: 'activities.beach_ligonamos',       charKey: 'activities.beach_ligonamos_char',       forKey: 'activities.beach_ligonamos_for',       distance: '1 km' },
    { emoji: '🚢', nameKey: 'activities.beach_finikounda_main', charKey: 'activities.beach_finikounda_char',      forKey: 'activities.beach_finikounda_for',      distance: '1.5 km' },
    { emoji: '⭐', nameKey: 'activities.beach_makryammos',      charKey: 'activities.beach_makryammos_char',      forKey: 'activities.beach_makryammos_for',      distance: '3 km' },
    { emoji: '🍽️', nameKey: 'activities.beach_lampes',          charKey: 'activities.beach_lampes_char',          forKey: 'activities.beach_lampes_for',          distance: '8 km' },
    { emoji: '🕊️', nameKey: 'activities.beach_romanou',         charKey: 'activities.beach_romanou_char',         forKey: 'activities.beach_romanou_for',         distance: '15 km' },
    { emoji: '📸', nameKey: 'activities.beach_voidokoilia',     charKey: 'activities.beach_voidokoilia_char',     forKey: 'activities.beach_voidokoilia_for',     distance: '18 km' },
    { emoji: '🎉', nameKey: 'activities.beach_zanga',           charKey: 'activities.beach_zanga_char',           forKey: 'activities.beach_zanga_for',           distance: '20 km' },
    { emoji: '🌅', nameKey: 'activities.beach_memi',            charKey: 'activities.beach_memi_char',            forKey: 'activities.beach_memi_for',            distance: '22 km' },
  ]);

  monuments = signal<Monument[]>([
    { icon: '🏰', titleKey: 'activities.monument_methoni',    descKey: 'activities.monument_methoni_desc' },
    { icon: '🗺️', titleKey: 'activities.monument_pylos',      descKey: 'activities.monument_pylos_desc' },
    { icon: '🏯', titleKey: 'activities.monument_koroni',     descKey: 'activities.monument_koroni_desc' },
    { icon: '🏛️', titleKey: 'activities.monument_nestor',     descKey: 'activities.monument_nestor_desc' },
    { icon: '⛪', titleKey: 'activities.monument_artemis',    descKey: 'activities.monument_artemis_desc' },
    { icon: '💧', titleKey: 'activities.monument_polylimnio', descKey: 'activities.monument_polylimnio_desc' },
    { icon: '🌿', titleKey: 'activities.monument_wetland',    descKey: 'activities.monument_wetland_desc' },
  ]);
}

