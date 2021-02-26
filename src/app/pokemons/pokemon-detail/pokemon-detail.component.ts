import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';

import {PokemonService} from '../services/pokemon.service';
import {Pokemon} from '../models/Pokemon';

@Component({
  selector: 'pkx-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit, OnChanges {

  @Input() idPokemonReceived?: string;
  pokemon: Pokemon;

  constructor(private route: ActivatedRoute,
              private pokemonService: PokemonService,
              private location: Location) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null && id !== '0') {
      this.pokemonService.getPokemon(+id).subscribe(pokemon => this.pokemon = pokemon);
    }
  }

  goBack(): void {
    this.location.back();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.idPokemonReceived.currentValue) {
      if (changes.idPokemonReceived.previousValue !== changes.idPokemonReceived.currentValue) {
        this.pokemonService.getPokemon(changes.idPokemonReceived.currentValue).subscribe(pokemon => {
          this.pokemon = pokemon;
        });
      }
    }
  }
}
