import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GameStateService } from '../../services/game-state.service';
import { POKEMON_DATA } from '../../data/pokemon.data';

@Component({
  selector: 'app-pokedex-log',
  standalone: true,
  templateUrl: './pokedex-log.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`:host { display: block; position: relative; z-index: 10001; flex-shrink: 0; }`],
})
export class PokedexLogComponent {
  private readonly gameState = inject(GameStateService);
  drawnHistory = this.gameState.drawnHistory;
  total = POKEMON_DATA.length;
}
