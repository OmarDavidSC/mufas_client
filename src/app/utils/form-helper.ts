import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

export class FormHelper {

  public static ValidarFormGroup(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      this.ValidarAbstractControl(control);
    });
  }

  public static ValidarAbstractControl(control: AbstractControl | null): void {
    if (control instanceof FormControl) {
      control.markAsDirty({ onlySelf: true });
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      FormHelper.ValidarFormGroup(control);
    } else if (control instanceof FormArray) {
      const array = control as FormArray;
      array.controls.forEach(x => this.ValidarAbstractControl(x));
    }
  }

}
