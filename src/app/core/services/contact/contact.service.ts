import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EMPTY, timer } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export type ContactStatus = 'idle' | 'submitting' | 'success' | 'error';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);

  readonly status       = signal<ContactStatus>('idle');
  readonly errorMessage = signal<string | null>(null);

  readonly isSubmitting = computed(() => this.status() === 'submitting');
  readonly isSuccess    = computed(() => this.status() === 'success');
  readonly isError      = computed(() => this.status() === 'error');

  reset(): void {
    this.status.set('idle');
    this.errorMessage.set(null);
  }

  submit(data: ContactFormData): void {
    this.status.set('submitting');
    this.errorMessage.set(null);

    // Dev fallback — no endpoint configured, simulate success after 600ms
    if (!environment.emailEndpoint) {
      console.group('[ContactService] Dev submit (no endpoint configured)');
      console.log(data);
      console.groupEnd();
      timer(600).pipe(
        tap(() => this.status.set('success'))
      ).subscribe();
      return;
    }

    this.http.post(environment.emailEndpoint, data).pipe(
      tap(() => this.status.set('success')),
      catchError((err: HttpErrorResponse) => {
        const msg = err.error?.message ?? err.message ?? 'An unexpected error occurred. Please try again.';
        this.errorMessage.set(msg);
        this.status.set('error');
        return EMPTY;
      })
    ).subscribe();
  }
}
