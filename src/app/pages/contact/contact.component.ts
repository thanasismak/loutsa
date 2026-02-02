import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  template: `
    <section class="card">
      <h2>{{ 'contact.title' | translate }}</h2>
      <div class="contact-grid">
        <div class="contact-info">
          <h3>{{ 'contact.info' | translate }}</h3>
          <p><strong>{{ 'contact.phone' | translate }}:</strong> +30 123 456 789</p>
          <p><strong>Email:</strong> loutsa.gr</p>
          <p><strong>{{ 'contact.hours' | translate }}:</strong> 9:00 AM - 6:00 PM</p>
        </div>
        <form class="contact-form" name="contact" netlify>
          <div class="form-group">
            <label for="name">{{ 'contact.name' | translate }}</label>
            <input id="name" name="name" type="text" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" required />
          </div>
          <div class="form-group">
            <label for="message">{{ 'contact.message' | translate }}</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <button type="submit">{{ 'contact.send' | translate }}</button>
        </form>
      </div>
    </section>
  `,
  styles: [`
    .card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 1px 8px rgba(2, 6, 23, 0.06);
    }

    h2 {
      color: var(--accent, #0ea5a4);
    }

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin-top: 1.5rem;
    }

    .contact-info p {
      color: #334155;
      line-height: 1.8;
    }

    .contact-form {
      background: #f8fafc;
      padding: 1.5rem;
      border-radius: 6px;
    }

    .form-group {
      margin-bottom: 1rem;
      display: flex;
      flex-direction: column;
    }

    .form-group label {
      font-weight: 500;
      color: #0f172a;
      margin-bottom: 0.5rem;
    }

    .form-group input,
    .form-group textarea {
      padding: 0.75rem;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      font-family: inherit;
    }

    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: var(--accent, #0ea5a4);
      box-shadow: 0 0 0 3px rgba(14, 165, 164, 0.1);
    }

    button {
      background: var(--accent, #0ea5a4);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: opacity 0.2s;
    }

    button:hover {
      opacity: 0.9;
    }

    @media (max-width: 768px) {
      .contact-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ContactComponent {}
