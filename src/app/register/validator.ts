import { AbstractControl } from "@angular/forms";

export class MyValidators {

    static passConference(control: AbstractControl) {
		let pass1 = control.get('password').value;
		let pass2 = control.get('passwordConference').value;

        if (pass1 === pass2) {
            return null;
        }
        else if (!control.get('passwordConference').touched || !control.get('password').touched) {
            return null;
        }
        else {
            control.get('passwordConference').setErrors({ passConference: true });
        }
	}

}