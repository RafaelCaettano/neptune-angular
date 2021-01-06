import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { retry, take } from 'rxjs/operators';
import { Address } from "../models/address.model";

@Injectable()
export class AddressService {

    constructor(private http: HttpClient){}

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    public getAddress(cep: string): Observable<Address> {
        return this.http.get<Address>(`https://viacep.com.br/ws/${cep}/json`)
            .pipe(
                retry(3),
                take(1)
            );
    }

}