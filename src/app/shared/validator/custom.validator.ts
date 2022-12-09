import {AbstractControl} from "@angular/forms";

export function ConfirmPwd(control: AbstractControl) {
  if (control.get('password')?.value !== control.get('confirm_password')?.value) {
    return {'error': true};
  }
  return null;
  // control.get('confirm-password')?.setErrors({
  //   'match': false
  // });
}

export function DateValidator(control: AbstractControl) {
  if (!control.value) {
    return null;
  }
  return new Date(control.value).getTime() > new Date().getTime() ? {error: true} : null;
}
