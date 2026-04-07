import { Component, input, inject } from '@angular/core';
import { Player } from '../../models/pokemon.model';
import { GameStateService } from '../../services/game-state.service';
import { ConfettiService } from '../../services/confetti.service';
import { PokemonTileComponent } from '../pokemon-tile/pokemon-tile';
@Component({
  selector: 'app-player-board',
  standalone: true,
  imports: [PokemonTileComponent],
  templateUrl: './player-board.html',
  styleUrl: './player-board.scss',
})
export class PlayerBoardComponent {
  player = input.required<Player>();
  private readonly gameState = inject(GameStateService);
  private readonly confetti = inject(ConfettiService);
  drawnHistory = this.gameState.drawnHistory;
  isDrawn(pokemonId: number): boolean {
    return this.drawnHistory().some(d => d.id === pokemonId);
  }
  onTileClick(tileIndex: number): void {
    const wasWon = this.player().won;
    this.gameState.toggleTile(this.player().id, tileIndex);
    const isNowWon = this.gameState.players().find(p => p.id === this.player().id)?.won;
    if (!wasWon && isNowWon) {
      this.confetti.trigger();
    }
  }
}
