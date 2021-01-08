import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { retry, take } from 'rxjs/operators';
import { User } from "../models/user.model";
import { URL_API } from "./app.api";

@Injectable()
export class UserService {

    constructor(private http: HttpClient){}

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    createUser(user: User): Observable<User> {
        return this.http.post<User>(`${URL_API}/users`, user, this.httpOptions)
            .pipe(
                take(1)
            );
    }

    emailRegistered(email: string): Observable<User[]> {
        return this.http.get<User[]>(`${URL_API}/users?email=${email}`, this.httpOptions)
            .pipe(
                take(1)
            );
    }

    nickRegistered(nick: string): Observable<User[]> {
        return this.http.get<User[]>(`${URL_API}/users?nickname=${nick}`, this.httpOptions)
            .pipe(
                take(1)
            );
    }

}