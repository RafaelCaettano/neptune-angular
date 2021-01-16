import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Address } from '../shared/models/address.model';
import { AddressService } from '../shared/services/address.service';
import { UserService } from '../shared/services/user.service';
import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { MyValidators } from './myValidators';
import { User } from '../shared/models/user.model';
import { CustomAdapter } from './datePickerAdapter/customAdapter';
import { CustomDateParserFormatter } from './datePickerAdapter/customDateParserFormatter';
import { AuthService } from '../shared/auth/auth.service';

@Component({ 
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.css'],
	providers: [ AddressService, UserService, AuthService,
		{ provide: NgbDateAdapter, useClass: CustomAdapter },
		{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
	]
})
export class SignUpComponent implements OnInit {

	addressService: AddressService;
	userService: UserService;
	authService: AuthService;
	signUpForm: FormGroup;
	registered: boolean;

	constructor(addressService: AddressService, userService: UserService, authService: AuthService, private fb: FormBuilder) { 
		this.addressService = addressService;
		this.userService = userService;
		this.authService = authService;
	}

	ngOnInit(): void {

		this.registered = false;
		this.newSignUpForm();

	}

	signUp(): void {

		const formData = this.signUpForm.value;
		this.userService.emailRegistered(formData.email).subscribe( 

			(user) => { 
				
				if(user.length === 0 ) {

					let user = new User();
					user = {
						name: formData.name,
						email: formData.email,
						nickname: formData.nick,
						phone: formData.phone,
						date: formData.date,
						admin: false,
						id: 0,
						address: { 
							bairro: formData.neighborhood,
							uf: formData.uf,
							logradouro: formData.address,
							number: formData.number,
							cep: formData.cep,
							complemento: formData.complement,
							localidade: undefined,
						}
					}
					
					this.userService.createUser(user).subscribe(

						() => {
							this.authService.signUp(formData.email, formData.password);
							this.registered = true;
							this.newSignUpForm();
						},
		
						(error) => {
							
						}
						
					)

				}
				else {
					this.email.setErrors({ emailRegistered: true })
				}
		
			}

		);

	}

	newSignUpForm(): void {

		this.signUpForm = this.fb.group({
			name: new FormControl(null, [ Validators.required, Validators.minLength(4), Validators.maxLength(120) ]),
			email: new FormControl(null, [ Validators.required, Validators.minLength(4), Validators.maxLength(120), Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$') ]),
			phone: new FormControl(null, [ Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]*') ]),
			nick: new FormControl(null, [ Validators.required, Validators.minLength(4), Validators.maxLength(120) ]),
			cep: new FormControl(null, [ Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('[0-9]*') ]),
			date: new FormControl(null, [ Validators.required ]),
			password: new FormControl(null, [ Validators.required, Validators.minLength(8)]),
			passwordConference: new FormControl(null, [ Validators.required ]),
			address: new FormControl(null),
			neighborhood: new FormControl(null),
			uf: new FormControl(null),
			number: new FormControl(null, [ Validators.required, Validators.maxLength(8), Validators.pattern('[0-9]*') ]),
			complement: new FormControl(null, [ Validators.maxLength(120) ]),
		},
		{
		  	validator: MyValidators.passConference
		});

	}

	searchCEP(cep: string): void {
	
		if(cep.length === 8) {
			this.addressService.getAddress(cep).subscribe( (address: Address) => {

				if(address.bairro != null) {
					this.signUpForm.patchValue({ 'neighborhood': address.bairro })
					this.signUpForm.patchValue({ 'address': `${address.logradouro}, ${address.localidade}` })
					this.signUpForm.patchValue({ 'uf': address.uf })
				}
				else {
					this.cep.setErrors({ cepError: true });
				}

			})
		}

	}

	searchNick(nick: string) {
		this.userService.nickRegistered(nick).subscribe( (user: User[]) => {
			if(user.length > 0) {
				this.nick.setErrors({ nickRegistered: true });
			}
		})
	}

	get name() { return this.signUpForm.get('name'); }
	get nick() { return this.signUpForm.get('nick'); }
	get email() { return this.signUpForm.get('email'); }
	get passwordConference() { return this.signUpForm.get('passwordConference'); }
	get password() { return this.signUpForm.get('password'); }
	get phone() { return this.signUpForm.get('phone'); }
	get date() { return this.signUpForm.get('date'); }
	get cep() { return this.signUpForm.get('cep'); }
	get complement() { return this.signUpForm.get('complement'); }
	get number() { return this.signUpForm.get('number'); }

}
