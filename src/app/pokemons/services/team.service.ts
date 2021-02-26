import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginService} from './login.service';
import {forkJoin, Observable} from 'rxjs';
import {LoginFormat} from '../models/LoginFormat';
import {tap} from 'rxjs/operators';
import {Pokemon} from '../models/Pokemon';
import {PokemonService} from './pokemon.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  urlTeam = 'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/trainers/me/team';
  team: number[] = [];
  loginResponse?: LoginFormat;

  constructor(private httpClient: HttpClient, private loginService: LoginService, private pokemonService: PokemonService) { }

  getMyTeam(): Observable<number[]> {
    if (!this.loginService.isConnected()) {
      this.loginService.login(environment.id, environment.password).subscribe((response) => this.loginResponse = response);
      this.loginService.loginResponse = this.loginResponse;
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.loginResponse.access_token);
    return this.httpClient.get<number[]>(this.urlTeam, {headers}).pipe(tap(
      response => this.team = response as any[]));
  }

  setTeam(team: number[], accessToken: string): void {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
    this.httpClient.put<LoginFormat>(this.urlTeam, team, {headers}).subscribe(response => {
      if (response.statusCode === '401') {
        if (this.loginService.refresh()) {
          this.setTeam(team, accessToken);
        }
      }
    });
  }

  teamAsPokemon(): Observable<Pokemon[]> {
    const team = this.team.map((id => this.pokemonService.getPokemon(id)));
    return forkJoin(team as unknown as Pokemon[]).pipe(tap(res => console.log(res)));
  }
}
