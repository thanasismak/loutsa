import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SectionComponent, TilesComponent } from '@app/common/components';

interface FacilityItem {
  icon: string;
  titleKey: string;
  descKey: string;
}

@Component({
  selector: 'app-facilities',
  standalone: true,
  imports: [CommonModule, TranslateModule, SectionComponent, TilesComponent],
  templateUrl: './facilities.component.html',
  styleUrl: './facilities.component.scss'
})
export class FacilitiesComponent {

  pitches = signal<FacilityItem[]>([
    { icon: '🏕️', titleKey: 'facilities.pitch_count',  descKey: 'facilities.pitch_count_desc' },
    { icon: '⚡',  titleKey: 'facilities.pitch_elec',   descKey: 'facilities.pitch_elec_desc' },
    { icon: '💧',  titleKey: 'facilities.pitch_water',  descKey: 'facilities.pitch_water_desc' },
  ]);

  dining = signal<FacilityItem[]>([
    { icon: '🍽️', titleKey: 'facilities.restaurant',  descKey: 'facilities.restaurant_desc' },
    { icon: '☕',  titleKey: 'facilities.cafe_bar',    descKey: 'facilities.cafe_bar_desc' },
    { icon: '🛒',  titleKey: 'facilities.mini_market', descKey: 'facilities.mini_market_desc' },
    { icon: '🔥',  titleKey: 'facilities.bbq',         descKey: 'facilities.bbq_desc' },
  ]);

  kitchen = signal<FacilityItem[]>([
    { icon: '🍳',  titleKey: 'facilities.kitchen',     descKey: 'facilities.kitchen_desc' },
    { icon: '🧊',  titleKey: 'facilities.fridges',     descKey: 'facilities.fridges_desc' },
    { icon: '❄️',  titleKey: 'facilities.freezers',    descKey: 'facilities.freezers_desc' },
    { icon: '🥤',  titleKey: 'facilities.ice_water',   descKey: 'facilities.ice_water_desc' },
  ]);

  laundry = signal<FacilityItem[]>([
    { icon: '🫧',  titleKey: 'facilities.laundry',       descKey: 'facilities.laundry_desc' },
    { icon: '👚',  titleKey: 'facilities.laundry_areas', descKey: 'facilities.laundry_areas_desc' },
    { icon: '🚽',  titleKey: 'facilities.chemical_dump', descKey: 'facilities.chemical_dump_desc' },
  ]);

  vehicles = signal<FacilityItem[]>([
    { icon: '🔧',  titleKey: 'facilities.vehicle_service', descKey: 'facilities.vehicle_service_desc' },
    { icon: '🚿',  titleKey: 'facilities.boat_wash',       descKey: 'facilities.boat_wash_desc' },
    { icon: '⛵',  titleKey: 'facilities.boat_ramp',       descKey: 'facilities.boat_ramp_desc' },
  ]);
}

