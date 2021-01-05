import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	form: FormGroup = new FormGroup({
		name: new FormControl(null, [ Validators.required, Validators.minLength(4), Validators.maxLength(120) ]),
		email: new FormControl(null, [ Validators.required, Validators.minLength(4), Validators.maxLength(120) ]),
		phone: new FormControl(null, [ Validators.required, Validators.minLength(11), Validators.maxLength(11) ]),
		nick: new FormControl(null, [ Validators.required, Validators.minLength(4), Validators.maxLength(120) ]),
		cep: new FormControl(null, [ Validators.required, Validators.minLength(8), Validators.maxLength(8) ]),
		date: new FormControl(null, [ Validators.required ]),
		address: new FormControl({ value: null, disabled: true }),
		neighborhood: new FormControl({ value: null, disabled: true }),
		uf: new FormControl({ value: null, disabled: true }),
		number: new FormControl(null, [ Validators.required, Validators.maxLength(8) ]),
		complement: new FormControl(null, [ Validators.maxLength(120) ]),
	});

	constructor() { }

	ngOnInit(): void {
	}

	register() : void {

		console.log(this.form)

	}

}
