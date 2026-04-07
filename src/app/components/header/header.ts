import { Component, inject, signal } from '@angular/core';
import { GameStateService, ActiveTab } from '../../services/game-state.service';
import { PdfExportService } from '../../services/pdf-export.service';
@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  private readonly gameState = inject(GameStateService);
  private readonly pdfExport = inject(PdfExportService);
  activeTab = this.gameState.activeTab;
  isExporting = signal(false);
  switchTab(tab: ActiveTab): void {
    this.gameState.switchTab(tab);
  }
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
      this.gameState.resetGame();
    }
  }
}
