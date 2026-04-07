import { Component, inject } from '@angular/core';
import { GameStateService } from '../../services/game-state.service';
@Component({
  selector: 'app-pokedex-log',
  standalone: true,
  templateUrl: './pokedex-log.html',
})
export class PokedexLogComponent {
  private readonly gameState = inject(GameStateService);
  drawnHistory = this.gameState.drawnHistory;
}
