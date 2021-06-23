import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  page = 1;
  totalPokemons: number | undefined;

  pokemonDetails: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  // Get Pokemons
  getPokemons() {
    this.dataService
      .getPokemons(30, this.page + 0)
      .subscribe((response: any) => {
        this.totalPokemons = response.count;

        response.results.forEach((result: any) => {
          this.dataService
            .getMoreData(result.name)
            .subscribe((multiResponse: any) => {
              this.pokemons.push(multiResponse);
              console.log(this.pokemons);
            });
        });
      });
  }

  status: boolean = false;
  viewPokemon(event: any) {
    this.status = false;
    let chosenPoke = event.target.innerHTML;
    console.log(chosenPoke);

    if (chosenPoke !== '') {
      this.pokemonDetails = [];
      this.dataService.getMoreData(chosenPoke).subscribe((details: any) => {
        this.status = true;
        this.pokemonDetails.push(details);
        console.log(this.pokemonDetails, this.status);
      });
    }
  }
}
