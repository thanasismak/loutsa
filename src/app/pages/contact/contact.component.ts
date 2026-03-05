import { Component, inject, signal, effect, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SectionComponent } from '@app/common/components';
import { ViewportService } from '@app/core/services/viewport.service';
import { ContactService, ContactFormData } from '@app/core/services/contact/contact.service';
import { SITE_CONFIG } from '@app/config/constants';

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

  readonly form = this.fb.group({
    name:    ['', [Validators.required, Validators.minLength(2)]],
    email:   ['', [Validators.required, Validators.email]],
    phone:   [''],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor() {
    // React to success signal — reset form without triggering further effects
    effect(() => {
      if (this.contactService.isSuccess()) {
        untracked(() => this.form.reset());
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.contactService.submit(this.form.getRawValue() as ContactFormData);
  }

  resetForm(): void {
    this.contactService.reset();
    this.form.reset();
  }

  hasError(field: string, error: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.touched && ctrl.hasError(error));
  }
}
