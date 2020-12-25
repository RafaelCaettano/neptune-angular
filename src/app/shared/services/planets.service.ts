import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Planet } from "../models/planet.model";
import { URL_API } from "./app.api";
import { retry, map, take } from 'rxjs/operators';

@Injectable()
export class PlanetService {

    constructor(private http: HttpClient){}

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    public getPlanets(): Observable<Planet[]> {
        return this.http.get<Planet[]>(`${URL_API}/planets`)
            .pipe(
                retry(3)
            );
    }

}