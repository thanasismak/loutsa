import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SectionComponent } from '@app/common/components';

@Component({
  selector: 'app-how-to-reach',
  standalone: true,
  imports: [TranslateModule, SectionComponent],
  template: `
    <app-section [title]="'contact.reach_title' | translate">

      <!-- Location & distances -->
      <p class="htr-location">📍 {{ 'contact.reach_location' | translate }}</p>

      <div class="htr-distances">
        <div class="htr-dist-card">
          <span class="htr-km">280 km</span>
          <span class="htr-label">{{ 'contact.reach_from_athens' | translate }}</span>
        </div>
        <div class="htr-dist-card">
          <span class="htr-km">230 km</span>
          <span class="htr-label">{{ 'contact.reach_from_patras' | translate }}</span>
        </div>
      </div>

      <!-- Routes -->
      <div class="htr-routes">
        <p class="htr-routes-title">{{ 'contact.reach_route_title' | translate }}</p>
        <div class="htr-route">🚗 {{ 'contact.reach_route_1' | translate }}</div>
        <div class="htr-route">🚗 {{ 'contact.reach_route_2' | translate }}</div>
      </div>

      <!-- Address & coordinates -->
      <div class="htr-meta">
        <div class="htr-meta-item">
          <span class="htr-meta-label">Address</span>
          <p>Loutsa, Finikounda<br>240 06 Messinia, Greece</p>
        </div>
        <div class="htr-meta-item">
          <span class="htr-meta-label">Coordinates</span>
          <p>36.8041° N, 21.8220° E</p>
        </div>
      </div>

      <!-- Map -->
      <div class="htr-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3169.5!2d21.822036!3d36.804143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135e8e8e8e8e8e8d%3A0xc0ffee!2sLoutsa%20Camping%2C%20Finikounda%2C%20Messinia!5e0!3m2!1sen!2sgr!4v1707315600000"
          width="100%"
          height="420"
          style="border:0; display:block;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
        <a href="https://maps.app.goo.gl/RX6hGP5irgyaSkp7A" target="_blank" class="htr-directions-btn">
          🧭 {{ 'contact.get_directions' | translate }}
        </a>
      </div>

    </app-section>
  `,
  styles: [`
    .htr-location {
      font-size: 1rem;
      color: #64748b;
      margin: 0 0 2rem;
      line-height: 1.6;
    }

    .htr-distances {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .htr-dist-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1.25rem 2.5rem;
      background: rgba(14, 165, 164, 0.05);
      border: 1.5px solid rgba(14, 165, 164, 0.2);
      border-radius: 16px;
      text-align: center;
      gap: 0.35rem;
      flex: 1;
      min-width: 160px;
    }

    .htr-km {
      font-size: 2rem;
      font-weight: 800;
      color: #0ea5a4;
      line-height: 1;
    }

    .htr-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #64748b;
    }

    .htr-routes {
      margin-bottom: 2rem;
    }

    .htr-routes-title {
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #64748b;
      margin: 0 0 0.75rem;
    }

    .htr-route {
      font-size: 0.95rem;
      color: #1f2937;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      line-height: 1.5;

      & + .htr-route { margin-top: 0.4rem; }
    }

    .htr-meta {
      display: flex;
      gap: 3rem;
      flex-wrap: wrap;
      margin-bottom: 2.5rem;
      padding: 1.5rem;
      background: #f8fafc;
      border-radius: 12px;
    }

    .htr-meta-label {
      display: block;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      color: #64748b;
      margin-bottom: 0.25rem;
    }

    .htr-meta-item p {
      margin: 0;
      color: #1f2937;
      font-size: 0.95rem;
      line-height: 1.6;
    }

    .htr-map {
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .htr-directions-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 1rem;
      background: #0ea5a4;
      color: white;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.95rem;
      transition: background 0.2s ease;

      &:hover { background: #0d9488; }
    }

    @media (max-width: 768px) {
      .htr-distances { flex-direction: column; }
      .htr-meta { flex-direction: column; gap: 1.5rem; }
    }
  `]
})
export class HowToReachComponent {}
