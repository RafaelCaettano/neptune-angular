import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Address } from '../shared/models/address.model';
import { AddressService } from '../shared/services/address.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { MyValidators } from './validator';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css'],
	providers: [AddressService]
})
export class RegisterComponent implements OnInit {

	addressService: AddressService;
	form: FormGroup;
	model: NgbDateStruct;

	constructor(addressService: AddressService, private fb: FormBuilder) { 
		this.addressService = addressService;
	}

	ngOnInit(): void {

		this.form = this.fb.group({
			name: new FormControl(null, [ Validators.required, Validators.minLength(4), Validators.maxLength(120) ]),
			email: new FormControl(null, [ Validators.required, Validators.minLength(4), Validators.maxLength(120), Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$') ]),
			phone: new FormControl(null, [ Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]*') ]),
			nick: new FormControl(null, [ Validators.required, Validators.minLength(4), Validators.maxLength(120) ]),
			cep: new FormControl(null, [ Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('[0-9]*') ]),
			date: new FormControl(null, [ Validators.required ]),
			password: new FormControl(null, [ Validators.required, Validators.minLength(8) ]),
			passwordConference: new FormControl(null, [ Validators.required ]),
			address: new FormControl({ value: null, disabled: true }),
			neighborhood: new FormControl({ value: null, disabled: true }),
			uf: new FormControl({ value: null, disabled: true }),
			number: new FormControl(null, [ Validators.required, Validators.maxLength(8), Validators.pattern('[0-9]*') ]),
			complement: new FormControl(null, [ Validators.maxLength(120) ]),
		},
		{
		  	validator: MyValidators.passConference
		})

	}

		

	register() : void {

		console.log(this.form.get('phone'))

	}

	get name() { return this.form.get('name'); }
	get nick() { return this.form.get('nick'); }
	get email() { return this.form.get('email'); }
	get passwordConference() { return this.form.get('passwordConference'); }
	get password() { return this.form.get('password'); }
	get phone() { return this.form.get('phone'); }
	get date() { return this.form.get('date'); }
	get cep() { return this.form.get('cep'); }
	get complement() { return this.form.get('complement'); }
	get number() { return this.form.get('number'); }
	
	searchCEP(cep: string) {
	
		if(cep.length === 8) {
			this.addressService.getAddress(cep).subscribe( (address: Address) => {

				if(address.bairro != null) {
					this.form.patchValue({ 'neighborhood': address.bairro })
					this.form.patchValue({ 'address': `${address.logradouro}, ${address.localidade}` })
					this.form.patchValue({ 'uf': address.uf })
				}
				else {
					this.cep.setErrors({ cepError: true });
				}
			})
		}

	}

}
