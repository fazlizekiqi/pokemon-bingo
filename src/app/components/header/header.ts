import { Component, inject, OnInit, signal } from '@angular/core';
import { GameStateService } from '../../services/game-state.service';
import { PdfExportService } from '../../services/pdf-export.service';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  private readonly gameState = inject(GameStateService);
  private readonly pdfExport = inject(PdfExportService);
  readonly audio = inject(AudioService);

  isExporting = signal(false);
  isFullscreen = signal(!!document.fullscreenElement);

  async onExportPdf(): Promise<void> {
    this.isExporting.set(true);
    try {
      await this.pdfExport.exportCards(this.gameState.players());
    } finally {
      this.isExporting.set(false);
    }
  }

  onReset(): void {
    if (confirm('Reset the game? All progress will be lost.')) {
      window.location.reload();
    }
  }

  onToggleFullscreen(): void {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => this.isFullscreen.set(true))
        .catch(() => {});
    } else {
      document
        .exitFullscreen()
        .then(() => this.isFullscreen.set(false))
        .catch(() => {});
    }
  }

  onToggleMusic(): void {
    this.audio.startBackgroundMusic();
    this.audio.toggleMute();
  }
}
