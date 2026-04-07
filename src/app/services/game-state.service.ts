import { Injectable, signal, computed } from '@angular/core';
import { Player, PlayerTile, Pokemon } from '../models/pokemon.model';
import { POKEMON_DATA, PARTY_NAMES, WIN_LINES, TEO_TILES } from '../data/pokemon.data';
@Injectable({ providedIn: 'root' })
export class GameStateService {
  readonly drawnHistory = signal<Pokemon[]>([]);
  readonly players = signal<Player[]>([]);
  readonly isDrawing = signal(false);
  readonly shufflePreview = signal<Pokemon | null>(null);
  readonly availablePokemon = computed(() =>
    POKEMON_DATA.filter(p => !this.drawnHistory().some(d => d.id === p.id))
  );
  constructor() {
    this.initGame();
  }
  initGame(): void {
    const newPlayers: Player[] = PARTY_NAMES.map((name, i) => {
      const isTeo = name === 'Teo';
      const tiles: PlayerTile[] = isTeo
        ? TEO_TILES.map(p => ({ ...p, marked: false }))
        : [...POKEMON_DATA].sort(() => 0.5 - Math.random()).slice(0, 9).map(p => ({ ...p, marked: false }));
      return { id: i, name, won: false, tiles };
    });
    this.players.set(newPlayers);
    this.drawnHistory.set([]);
    this.isDrawing.set(false);
    this.shufflePreview.set(null);
  }
  toggleTile(playerId: number, tileIndex: number): void {
    this.players.update(players =>
      players.map(player => {
        if (player.id !== playerId) return player;
        const tile = player.tiles[tileIndex];
        if (!this.drawnHistory().some(d => d.id === tile.id)) return player;
        const newTiles: PlayerTile[] = player.tiles.map((t, i) =>
          i === tileIndex ? { ...t, marked: !t.marked } : t
        );
        const hasWon = !player.won && WIN_LINES.some(line =>
          line.every(i => newTiles[i].marked)
        );
        return { ...player, tiles: newTiles, won: hasWon ? true : player.won };
      })
    );
  }
  async drawWithExcitement(): Promise<Pokemon> {
    return new Promise((resolve) => {
      this.isDrawing.set(true);
      let count = 0;
      const interval = setInterval(() => {
        const rnd = POKEMON_DATA[Math.floor(Math.random() * POKEMON_DATA.length)];
        this.shufflePreview.set(rnd);
        count++;
        if (count > 25) {
          clearInterval(interval);
          const available = this.availablePokemon();
          const picked = available[Math.floor(Math.random() * available.length)];
          this.shufflePreview.set(null);
          this.isDrawing.set(false);
          resolve(picked);
        }
      }, 100);
    });
  }
  commitDraw(picked: Pokemon): void {
    this.drawnHistory.update(h => [picked, ...h]);
  }

  resetGame(): void {
    this.initGame();
  }
}
