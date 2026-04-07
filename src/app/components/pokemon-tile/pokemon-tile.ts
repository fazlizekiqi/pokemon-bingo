import { Component, input, output } from '@angular/core';
import { PlayerTile } from '../../models/pokemon.model';
@Component({
  selector: 'app-pokemon-tile',
  standalone: true,
  templateUrl: './pokemon-tile.html',
  styleUrl: './pokemon-tile.scss',
})
export class PokemonTileComponent {
  tile = input.required<PlayerTile>();
  isDrawn = input.required<boolean>();
  tileClick = output<void>();
  onClick(): void {
    if (this.isDrawn()) {
      this.tileClick.emit();
    }
  }
}
