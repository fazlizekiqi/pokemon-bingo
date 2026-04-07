import { Component, inject } from '@angular/core';
import { HeaderComponent } from './components/header/header';
import { HostHubComponent } from './components/host-hub/host-hub';
import { PlayerBoardsComponent } from './components/player-boards/player-boards';
import { GameStateService } from './services/game-state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, HostHubComponent, PlayerBoardsComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly gameState = inject(GameStateService);
  protected readonly activeTab = this.gameState.activeTab;
}
