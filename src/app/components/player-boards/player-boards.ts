import { Component, inject } from '@angular/core';
import { GameStateService } from '../../services/game-state.service';
import { PlayerBoardComponent } from '../player-board/player-board';
@Component({
  selector: 'app-player-boards',
  standalone: true,
  imports: [PlayerBoardComponent],
  templateUrl: './player-boards.html',
})
export class PlayerBoardsComponent {
  private readonly gameState = inject(GameStateService);
  players = this.gameState.players;
}
