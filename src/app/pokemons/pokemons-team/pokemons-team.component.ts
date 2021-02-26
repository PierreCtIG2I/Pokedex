import {Component, OnInit, ViewChild} from '@angular/core';
import {TeamService} from '../services/team.service';
import {Observable} from 'rxjs';
import {Pokemon} from '../models/Pokemon';

@Component({
  selector: 'pkx-pokemons-team',
  templateUrl: './pokemons-team.component.html',
  styleUrls: ['./pokemons-team.component.scss']
})
export class PokemonsTeamComponent implements OnInit {

  @ViewChild('drawer')
  private drawer: any;
  team!: Observable<Pokemon[]>;
  // selectionToRemove: Pokemon[] = [];

  constructor(private teamService: TeamService) {
  }

  ngOnInit(): void {
    this.teamService.getMyTeam().subscribe((ids) => {
      this.team = this.teamService.teamAsPokemon();
    });
  }

  isTeamEmpty(): boolean {
    return this.teamService.team.length > 0;
  }

  /*deleteSelection(newTeam: any[]): void {
    newTeam = this.teamService.team.filter((id) => this.selectionToRemove.find(pokemon => pokemon.id === id.toString()) === undefined);
    this.teamService.team = newTeam;
    this.teamService.setTeam(newTeam, this.loginService.getAccessToken());
    this.selectionToRemove = [];
    this.team = this.teamService.teamAsPokemon();
  }

  placeToDelete(pokemon: any): void {
    if (this.selectionToRemove.length === 0) {
      this.drawer.toggle();
    }
    if (!this.selectionToRemove.find(p => p === pokemon)) {
      this.selectionToRemove.push(pokemon as Pokemon);
    }
  }*/
}
