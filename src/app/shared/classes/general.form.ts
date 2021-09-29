import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms'

export class GeneralForm {
  
  mform!: FormGroup;

  get f() {
    return this.mform.controls;
  }

  invalid(s: string) {
    const m = this.mform.controls[s];
    return m.invalid && (m.dirty || m.touched);
  }
}
