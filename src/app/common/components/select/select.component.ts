import { Component, input, output, signal, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SelectOption {
  value: string | number;
  label: string;
  icon?: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="select-wrapper">
      <button 
        class="select-trigger" 
        [class.open]="isOpen()"
        (click)="toggleOpen()"
        [disabled]="disabled()"
        [attr.aria-label]="ariaLabel()">
        <span class="select-value">
          <span *ngIf="selectedOption()?.icon" class="select-icon">{{ selectedOption()?.icon }}</span>
          <span class="select-text">{{ selectedOption()?.label || placeholder() }}</span>
        </span>
        <span class="select-arrow" [class.rotated]="isOpen()">▼</span>
      </button>

      <div class="select-dropdown" [class.open]="isOpen()" *ngIf="isOpen()">
        <button 
          *ngFor="let option of options()"
          class="select-option"
          [class.selected]="option.value === value()"
          [class.disabled]="option.disabled"
          [disabled]="option.disabled"
          (click)="selectOption(option.value)">
          <span *ngIf="option.icon" class="option-icon">{{ option.icon }}</span>
          <span class="option-text">{{ option.label }}</span>
        </button>
      </div>
    </div>
  `,
  styles: `
    .select-wrapper {
      position: relative;
      display: inline-block;
    }

    .select-trigger {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: clamp(6px, 1.5vw, 12px) clamp(8px, 2vw, 16px);
      border: 2px solid #0ea5a4;
      background-color: transparent;
      color: #0ea5a4;
      cursor: pointer;
      font-size: clamp(12px, 1.5vw, 14px);
      font-weight: 600;
      border-radius: 6px;
      transition: all 0.3s ease;
      min-width: 120px;

      &:hover:not(:disabled) {
        background-color: #0ea5a4;
        color: white;
        box-shadow: 0 4px 12px rgba(14, 165, 164, 0.3);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      &.open {
        background-color: #0ea5a4;
        color: white;
        border-radius: 6px 6px 0 0;
        box-shadow: 0 4px 12px rgba(14, 165, 164, 0.3);
      }
    }

    .select-value {
      display: flex;
      align-items: center;
      gap: 6px;
      flex: 1;
    }

    .select-icon,
    .option-icon {
      font-size: 18px;
      display: inline-block;
    }

    .select-text,
    .option-text {
      white-space: nowrap;
    }

    .select-arrow {
      font-size: 12px;
      transition: transform 0.3s ease;
      display: inline-flex;
      align-items: center;
    }

    .select-arrow.rotated {
      transform: rotate(180deg);
    }

    .select-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 2px solid #0ea5a4;
      border-top: none;
      border-radius: 0 0 6px 6px;
      box-shadow: 0 8px 16px rgba(14, 165, 164, 0.15);
      max-height: 0;
      overflow: hidden;
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 100;

      &.open {
        max-height: 400px;
        opacity: 1;
        pointer-events: auto;
      }
    }

    .select-option {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 12px 16px;
      background: none;
      border: none;
      color: #334155;
      cursor: pointer;
      text-align: left;
      font-size: 14px;
      transition: all 0.2s ease;

      &:hover:not(:disabled) {
        background-color: rgba(14, 165, 164, 0.08);
        color: #0ea5a4;
      }

      &.selected {
        background-color: rgba(14, 165, 164, 0.1);
        color: #0ea5a4;
        font-weight: 600;
      }

      &.disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  `
})
export class SelectComponent {
  // Inputs
  options = input<SelectOption[]>([]);
  value = input<string | number>('');
  placeholder = input<string>('Select...');
  disabled = input<boolean>(false);
  ariaLabel = input<string>('Select');

  // Output
  valueChange = output<string | number>();

  // Internal state
  isOpen = signal(false);

  // Computed value
  selectedOption = computed(() => {
    const selectedVal = this.value();
    return this.options().find(opt => opt.value === selectedVal);
  });

  constructor() {
    // Close dropdown when clicking outside (handled by parent)
    effect(() => {
      const open = this.isOpen();
      if (open) {
        const handleClickOutside = () => {
          this.isOpen.set(false);
        };
        // In a real scenario, you'd add a global click listener
        // For now, this effect just tracks the state
      }
    });
  }

  toggleOpen(): void {
    if (!this.disabled()) {
      this.isOpen.set(!this.isOpen());
    }
  }

  selectOption(value: string | number): void {
    this.valueChange.emit(value);
    this.isOpen.set(false);
  }
}
