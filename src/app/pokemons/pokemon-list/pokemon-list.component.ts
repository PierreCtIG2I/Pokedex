import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { Pokemon } from '../models/Pokemon';
import { PokemonService } from '../services/pokemon.service';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'pkx-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  @Output() selectedPokemonId = new EventEmitter<string>();
  list: [];
  limit = 20;
  limitMax = 151;
  pokemons: Pokemon[];
  input!: string;
  params: HttpParams = new HttpParams();

  @ViewChild('searchInput')
  private searchInput!: ElementRef;

  constructor(private pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    this.params = this.params.set('limit', `${this.limit}`);
    this.getPokemonsParams(this.params);
  }

  getPokemons(offset: number, limit: number, search: string): void {
    this.pokemonService.getPokemons(offset, limit, search).subscribe(result => this.pokemons = result['data']);
  }

  getPokemonsParams(params: HttpParams): void {
    this.pokemonService.getPokemonsParam(params).subscribe(result => this.pokemons = result['data']);
  }

  onScroll(): void {
    if (this.limit < this.limitMax) {
      this.limit += 20;
      this.params = this.params.set('limit', `${this.limit}`);
      this.getPokemonsParams(this.params);
    }
  }

  sendPokemonId(pokemonId: string): void {
    this.selectedPokemonId.emit(pokemonId);
  }

  searchPokemonInList(input: string): void {
    if (input !== '') {
      this.params = this.params.set('search', input);
      this.getPokemonsParams(this.params);
    } else {
      this.params = this.params.delete('search');
      this.getPokemonsParams(this.params);
    }
  }
}
