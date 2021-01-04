import { Component, OnInit } from '@angular/core';
import { Planet } from '../shared/models/planet.model';
import { PlanetService } from '../shared/services/planets.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	providers: [PlanetService]
})
export class HomeComponent implements OnInit {

	planets: Planet[];
	private planetService: PlanetService;

	constructor(planetService: PlanetService) {
		this.planetService = planetService;
	}

	ngOnInit(): void {

		// this.planetService.getPlanets().subscribe((planets: Planet[]) => {
		// 	this.planets = planets
		// })

	}

}
