import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
	providers: [AuthService, UserService],
})
export class HeaderComponent implements OnInit {

	authService: AuthService;
	userService: UserService;
	user: User;

	constructor(authService: AuthService, userService: UserService) { 
		this.authService = authService;
		this.userService = userService;
	}

	ngOnInit(): void {

		this.user = new User;
		this.userService.emailRegistered(this.authService.getEmail).subscribe(
			(user: User[]) => {
				this.user = user[0];
			}
		)

	}

}
