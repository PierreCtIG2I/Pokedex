import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './pokemons/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pokemons/pokemon-detail/pokemon-detail.component';
import {PokedexComponent} from './pokemons/pokedex/pokedex.component';
import {PokemonsTeamComponent} from './pokemons/pokemons-team/pokemons-team.component';

const routes: Routes = [
  { path: '', redirectTo: '/pokedex', pathMatch: 'full'},
  { path: 'pokemonList', component: PokemonListComponent},
  { path: 'pokemon/:id', component: PokemonDetailComponent},
  { path: 'pokedex', component: PokedexComponent},
  { path: 'team', component: PokemonsTeamComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
