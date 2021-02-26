import {Component, EventEmitter, OnInit} from '@angular/core';
import {LoginService} from '../services/login.service';
import {environment} from '../../../environments/environment';
import {LoginFormat} from '../models/LoginFormat';

@Component({
  selector: 'pkx-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  pokemonIdReceived?: string;

  constructor() { }

  ngOnInit(): void {
  }

  onGetPokemonId($event: string): void {
    this.pokemonIdReceived = $event;
  }
}
