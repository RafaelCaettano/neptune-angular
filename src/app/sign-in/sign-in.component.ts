import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../shared/auth/auth.service';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	providers: [AuthService],
	styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

	form: FormGroup;
	authService: AuthService

	constructor(private fb: FormBuilder, authService: AuthService) { 
		this.authService = authService;
	}

	ngOnInit(): void {

		this.form = this.fb.group({
			email: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(120), Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')]),
			password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
		})

	}

}
