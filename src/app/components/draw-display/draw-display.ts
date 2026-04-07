import { Component, inject, signal } from '@angular/core';
import { GameStateService } from '../../services/game-state.service';
import { Pokemon } from '../../models/pokemon.model';

export type BallPhase = 'idle' | 'shaking' | 'opening' | 'done';

@Component({
  selector: 'app-draw-display',
  standalone: true,
  templateUrl: './draw-display.html',
  styleUrl: './draw-display.scss',
})
export class DrawDisplayComponent {
  private readonly gameState = inject(GameStateService);
  isDrawing = this.gameState.isDrawing;
  availablePokemon = this.gameState.availablePokemon;
  lastDrawn = signal<Pokemon | null>(null);
  ballPhase = signal<BallPhase>('idle');

  async onDraw(): Promise<void> {
    if (this.isDrawing() || !this.availablePokemon().length) return;

    this.lastDrawn.set(null);
    this.ballPhase.set('shaking');

    const picked = await this.gameState.drawWithExcitement();

    // Open the ball
    this.ballPhase.set('opening');

    // After opening animation, reveal the pokemon
    setTimeout(() => {
      this.lastDrawn.set(picked);
      this.ballPhase.set('done');
    }, 1100);
  }
}
