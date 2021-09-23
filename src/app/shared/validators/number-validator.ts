import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/*
  Custom validators to check if user input is a number, in case the input is left empty.
*/
export function isNumber(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const notANumber = isNaN(parseInt(control.value));
    return notANumber ? { NaN: true } : null;
  };
}
