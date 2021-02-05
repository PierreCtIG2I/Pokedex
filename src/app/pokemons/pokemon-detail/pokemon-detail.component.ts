import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';

import {PokemonService} from '../pokemon.service';
import {Pokemon} from '../models/Pokemon';

@Component({
  selector: 'pkx-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  @Input() pokemon: Pokemon;

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService, private location: Location) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pokemonService.getPokemon(+id).subscribe(pokemon => this.pokemon = pokemon);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
