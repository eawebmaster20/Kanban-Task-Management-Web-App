import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';

export function atLeastOneColumnValidator(): ValidatorFn {
  return (formArray: AbstractControl): ValidationErrors | null => {
    const array = formArray as FormArray;
    return array && array.length > 0 ? null : { minColumns: true };
  };
}
