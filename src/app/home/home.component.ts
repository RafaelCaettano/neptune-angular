import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { Planet } from '../shared/models/planet.model';
import { PlanetService } from '../shared/services/planets.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	providers: [PlanetService, AuthService]
})
export class HomeComponent implements OnInit {

	planets: Planet[];
	planetService: PlanetService;
	authService: AuthService;

	constructor(planetService: PlanetService, authService: AuthService) {
		this.planetService = planetService;
		this.authService = authService;
	}

	ngOnInit(): void {

		this.planetService.getPlanets().subscribe((planets: Planet[]) => {
		this.planets = planets
		})

	}

}
