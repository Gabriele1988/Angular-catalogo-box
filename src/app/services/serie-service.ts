import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Attore, RisultatoRicerca, Serie } from '../models/serie';

@Injectable({providedIn: 'root'})
export class SerieService {

    private http = inject(HttpClient);
    private base = 'https://api.tvmaze.com';

    cerca(query: string): Observable<Serie[]>{
        return this.http
                .get<RisultatoRicerca[]>(`${this.base}/search/shows?q=${query}`)
                .pipe(map(risultati => risultati.map(r => r.show )));
    }

    popolari(): Observable<Serie[]>{
        return this.http
                .get<Serie[]>(`${this.base}/shows?page=0`)
                .pipe(map(serie => serie.slice(0,12)));
    }

    dettaglio(id:number) : Observable<Serie>{
        return this.http
                .get<Serie>(`${this.base}/shows/${id}`);
    }

    cast(id:number) : Observable<Attore[]>{
        return this.http
                .get<Attore[]>(`${this.base}/shows/${id}/cast`); 
    }
}