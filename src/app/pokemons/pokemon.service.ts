import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pokemon } from './models/Pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = 'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io';
  private pokemonsUrl: string = this.apiUrl + '/pokemons';

  constructor(private httpClient: HttpClient) {}

  getPokemons(): Observable<[]> {
    const res = this.httpClient.get<[]>(this.pokemonsUrl)
    .pipe(
      catchError(this.handleError<[]>('getPokemons', []))
    );
    return res;
  }

  getPokemon(id: number): Observable<Pokemon> {
    const url = this.pokemonsUrl + '/' + id;
    return this.httpClient.get<Pokemon>(url);
  }

  // getPokemons(offset: number, limit: number {
  // let params = new httpParams();
  // if(offset) { params = params.set('offset', '${offset}');
  // if(limit) { params = params.set('limit', '${limit}');
  // return this.httpClient.get(this.pokemonsUrl, option: {params});
  // }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
