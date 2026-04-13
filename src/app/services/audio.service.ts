import { Injectable, signal } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Injectable({ providedIn: 'root' })
export class AudioService {
  readonly muted = signal(true);

  private activeCry: HTMLAudioElement | null = null;

  private bgMusic: HTMLAudioElement | null = null;

  startBackgroundMusic(): void {
    if (this.bgMusic) return; // already initialised
    const audio = new Audio('assets/svenska-pokemon-låt.mp3');
    audio.loop = true;
    audio.volume = 0.75;
    this.bgMusic = audio;
  }

  stopBackgroundMusic(): void {
    if (this.bgMusic) {
      this.bgMusic.pause();
      this.bgMusic.currentTime = 0;
      this.bgMusic = null;
    }
  }

  /** Extract national pokédex number from the img path, e.g. "assets/pokemon/25.png" → 25 */
  private pokeIdFromImg(img: string): number | null {
    const match = img.match(/(\d+)\.png$/);
    return match ? parseInt(match[1], 10) : null;
  }

  toggleMute(): void {
    this.muted.update(m => !m);
    if (this.bgMusic) {
      if (this.muted()) {
        this.bgMusic.pause();
      } else {
        this.bgMusic.play().catch(() => {});
      }
    }
  }

  playCry(pokemon: Pokemon): void {
    if (this.muted()) return;

    // Stop any previous cry still playing
    if (this.activeCry) {
      this.activeCry.pause();
      this.activeCry.currentTime = 0;
    }

    // Prefer anime voice clip; fall back to retro game cry
    const slug = pokemon.name.toLowerCase();
    const pokeId = this.pokeIdFromImg(pokemon.img);
    const voice = new Audio(`assets/audio/voice-${slug}.mp3`);
    voice.volume = 1.0;
    this.activeCry = voice;

    voice.play().catch(() => {
      // Voice file missing or blocked — fall back to game cry
      if (pokeId === null) return;
      const cry = new Audio(`assets/audio/cry-${pokeId}.ogg`);
      cry.volume = 0.8;
      this.activeCry = cry;
      cry.play().catch(() => {});
    });
  }
}

