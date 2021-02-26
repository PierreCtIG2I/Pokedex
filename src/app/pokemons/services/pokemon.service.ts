import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pokemon } from '../models/Pokemon';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = 'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io';
  private pokemonsUrl: string = this.apiUrl + '/pokemons';

  constructor(private httpClient: HttpClient) {}

  getPokemon(id: number): Observable<Pokemon> {
    const url = this.pokemonsUrl + '/' + id;
    return this.httpClient.get<Pokemon>(url);
  }

  getPokemons(offset?: number, limit?: number, search?: string): Observable<[any]> {
    let params = new HttpParams();
    if (offset) {
      params = params.set('offset', `${offset}`);
    }
    if (limit) {
      params = params.set('limit', `${limit}`);
    }
    if (search) {
      params = params.set('search', `${search}`);
    }
    return this.httpClient.get<[any]>(this.pokemonsUrl, {params});
  }

  getPokemonsParam(params: HttpParams): Observable<[any]> {
    return this.httpClient.get<[any]>(this.pokemonsUrl, {params});
  }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
