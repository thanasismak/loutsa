import { Component, inject, signal, effect, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SectionComponent } from '@app/common/components';
import { ViewportService } from '@app/core/services/viewport.service';
import { ContactService, ContactFormData } from '@app/core/services/contact/contact.service';
import { SITE_CONFIG } from '@app/config/constants';

export type ActiveForm = 'contact' | 'booking';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, SectionComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  readonly viewportService = inject(ViewportService);
  private readonly fb      = inject(FormBuilder);
  readonly contactService  = inject(ContactService);

  readonly siteContact = signal(SITE_CONFIG.contact);
  readonly activeForm  = signal<ActiveForm>('contact');

  readonly form = this.fb.group({
    name:    ['', [Validators.required, Validators.minLength(2)]],
    email:   ['', [Validators.required, Validators.email]],
    phone:   [''],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  readonly bookingForm = this.fb.group({
    name:              ['', [Validators.required, Validators.minLength(2)]],
    email:             ['', [Validators.required, Validators.email]],
    phone:             [''],
    checkIn:           ['', Validators.required],
    checkOut:          ['', Validators.required],
    adults:            [1, [Validators.required, Validators.min(1), Validators.max(20)]],
    children:          [0, [Validators.min(0), Validators.max(20)]],
    accommodationType: ['', Validators.required],
    notes:             [''],
  });

  constructor() {
    effect(() => {
      if (this.contactService.isSuccess()) {
        untracked(() => {
          this.form.reset();
          this.bookingForm.reset({ adults: 1, children: 0 });
        });
      }
    });
  }

  toggleForm(type: ActiveForm): void {
    if (this.activeForm() === type) return;
    this.contactService.reset();
    this.activeForm.set(type);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.contactService.submit(this.form.getRawValue() as ContactFormData);
  }

  onBookingSubmit(): void {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }
    const v = this.bookingForm.getRawValue();
    const message = [
      '[BOOKING REQUEST]',
      `Check-in:  ${v.checkIn}`,
      `Check-out: ${v.checkOut}`,
      `Guests:    ${v.adults} adult(s), ${v.children} child(ren)`,
      `Type:      ${v.accommodationType}`,
      v.notes ? `Notes:     ${v.notes}` : null,
    ].filter(Boolean).join('\n');

    this.contactService.submit({
      name:    v.name!,
      email:   v.email!,
      phone:   v.phone ?? '',
      message,
    });
  }

  resetForm(): void {
    this.contactService.reset();
    this.form.reset();
    this.bookingForm.reset({ adults: 1, children: 0 });
  }

  hasError(field: string, error: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.touched && ctrl.hasError(error));
  }

  hasBookingError(field: string, error: string): boolean {
    const ctrl = this.bookingForm.get(field);
    return !!(ctrl?.touched && ctrl.hasError(error));
  }

  get today(): string {
    return new Date().toISOString().split('T')[0];
  }
}
