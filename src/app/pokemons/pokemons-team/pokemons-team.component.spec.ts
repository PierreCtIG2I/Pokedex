import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonsTeamComponent } from './pokemons-team.component';

describe('PokemonsTeamComponent', () => {
  let component: PokemonsTeamComponent;
  let fixture: ComponentFixture<PokemonsTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonsTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonsTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
