import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	providers: [AuthService]
})
export class HomeComponent implements OnInit {

	authService: AuthService;

	constructor(authService: AuthService) {
		this.authService = authService;
	}

	ngOnInit(): void {

	}

}
