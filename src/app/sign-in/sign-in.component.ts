import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../shared/auth/auth.service';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	providers: [AuthService, UserService],
	styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

	form: FormGroup;
	authService: AuthService
	userService: UserService

	constructor(private fb: FormBuilder, authService: AuthService, userService: UserService) { 
		this.authService = authService;
		this.userService = userService;
	}

	ngOnInit(): void {

		this.form = this.fb.group({
			email: new FormControl(null, [Validators.required]),
			password: new FormControl(null, [Validators.required]),
		})

	}

	signIn() {
		this.authService.signIn(this.email.value, this.password.value);
		this.userService.emailRegistered(this.email.value).subscribe(
			(user: User[]) => {
				this.userService.addToLocalStorage(user[0]);
			}
		)
	}

	get email() { return this.form.get('email') }
	get password() { return this.form.get('password') }

}
