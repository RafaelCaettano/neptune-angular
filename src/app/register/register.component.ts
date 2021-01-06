import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from '../shared/models/address.model';
import { AddressService } from '../shared/services/address.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css'],
	providers: [AddressService]
})
export class RegisterComponent implements OnInit {

	addressService: AddressService;
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

	constructor(addressService: AddressService) { 
		this.addressService = addressService;
	}

	ngOnInit(): void {
	}

	register() : void {

		console.log(this.form)

	}

	searchCEP(cep: string) {
	
		if(cep.length === 8) {
			this.addressService.getAddress(cep).subscribe( (address: Address) => {
				this.form.patchValue({ 'neighborhood': address.bairro })
				this.form.patchValue({ 'address': `${address.logradouro}, ${address.localidade}` })
				this.form.patchValue({ 'uf': address.uf })
			} )
		}

	}

}
