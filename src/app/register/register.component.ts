import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Address } from '../shared/models/address.model';
import { AddressService } from '../shared/services/address.service';
import { UserService } from '../shared/services/user.service';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { MyValidators } from './myValidators';
import { User } from '../shared/models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { RegisterErrorComponent } from './register-error/register-error.component';
import { CustomAdapter } from './datePickerAdapter/customAdapter';
import { CustomDateParserFormatter } from './datePickerAdapter/customDateParserFormatter';
import { AuthService } from '../shared/auth/auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css'],
	providers: [ AddressService, UserService, AuthService,
		{ provide: NgbDateAdapter, useClass: CustomAdapter },
		{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
	]
})
export class RegisterComponent implements OnInit {

	addressService: AddressService;
	userService: UserService;
	authService: AuthService;
	success: User[];
	form: FormGroup;
	model: NgbDateStruct;
	model1: string;
  	model2: string;


	constructor(addressService: AddressService, userService: UserService, authService: AuthService, private fb: FormBuilder, private modalService: NgbModal) { 
		this.addressService = addressService;
		this.userService = userService;
		this.authService = authService;
	}

	ngOnInit(): void {

		this.form = this.fb.group({
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
		})

	}

	openModalError(message: string) {
		const modalRef = this.modalService.open(RegisterErrorComponent, {
			size: 'sm'
		});
    	modalRef.componentInstance.message = message;
	}

	openModalSuccess() {
		this.modalService.open(RegisterSuccessComponent, {
			size: 'sm'
		});
	}

	async register() {

		console.log(this.form)
		const formData = this.form.value;
		let emailSuccess: boolean = await this.searchEmail(formData.email);

		if(!emailSuccess) {

			let user = new User();
			user.name = formData.name;
			user.email = formData.email;
			user.nickname = formData.nick;
			user.phone = formData.phone;
			user.date = formData.date;
			user.address = new Address();
			user.address.bairro = formData.neighborhood;
			user.address.uf = formData.uf;
			user.address.logradouro = formData.address;
			user.address.number = formData.number;
			user.address.cep = formData.cep;
			user.address.complemento = formData.complement;

			this.userService.createUser(user).subscribe(

				(res) => {
					this.openModalSuccess();
					this.authService.signUp(formData.email, formData.password)
				},

				(error) => {
					this.openModalError(error);
				}
				
			)

		}
		else {
			this.openModalError('E-mail já cadastrado.');
		}
			

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
	
	searchCEP(cep: string): void {
	
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

	searchNick(nick: string) {

		this.userService.nickRegistered(nick).subscribe( (user: User[]) => {

			if(user.length > 0) {
				this.nick.setErrors({ nickRegistered: true });
			}

		})

	}

	async searchEmail(email: string): Promise<boolean> {

		let success: boolean = false;

		this.userService.emailRegistered(email).subscribe( (user) => {
			
			if(user.length > 0) {
				success = true
			}

		})

		console.log(success)

		return success;

	}

}
