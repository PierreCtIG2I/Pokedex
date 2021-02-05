import {Component, Input, OnInit} from '@angular/core';
import { Pokemon } from '../models/Pokemon';
import { PokemonService } from '../pokemon.service';
import { InfiniteScrollModule} from 'ngx-infinite-scroll';

@Component({
  selector: 'pkx-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  list: [];
  pokemons: Pokemon[];
  @Input() infiniteScroll: InfiniteScrollModule;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonService.getPokemons().subscribe(res => this.pokemons = res['data']);
  }

  onScroll(): void {
    console.log('J\'ai scrollé !');
  }
}
