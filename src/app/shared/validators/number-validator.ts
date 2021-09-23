import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function isNumber(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const notANumber = isNaN(parseInt(control.value));
    return notANumber ? { NaN: true } : null;
  };
}
