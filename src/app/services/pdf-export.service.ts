import { Injectable } from '@angular/core';
import { Player } from '../models/pokemon.model';
declare const html2canvas: (el: HTMLElement, opts?: any) => Promise<HTMLCanvasElement>;
@Injectable({ providedIn: 'root' })
export class PdfExportService {
  async exportCards(players: Player[]): Promise<void> {
    const { jsPDF } = (window as any).jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;left:-5000px;top:0;width:794px;height:1123px;';
    document.body.appendChild(container);
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      container.innerHTML = '';
      const pageEl = document.createElement('div');
      pageEl.style.cssText = `
        width:794px;height:1123px;background-color:${player.tiles[0].color};
        display:flex;flex-direction:column;align-items:center;justify-content:center;
        position:relative;box-sizing:border-box;padding:40px;overflow:hidden;
        font-family:'Plus Jakarta Sans',sans-serif;
      `;
      pageEl.innerHTML = `
        <div style="position:absolute;inset:0;opacity:0.1;display:flex;flex-wrap:wrap;justify-content:center;align-items:center;pointer-events:none;">
          ${Array(12).fill(0).map(() =>
            `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="poke-ball"
              style="width:150px;margin:40px;transform:rotate(${Math.random() * 360}deg);" crossorigin="anonymous">`
          ).join('')}
        </div>
        <div style="position:relative;z-index:10;width:680px;display:flex;flex-direction:column;align-items:center;">
          <h1 style="font-size:48px;font-weight:900;color:#1e293b;margin:0;font-style:italic;letter-spacing:-1px;">POKEMON BINGO</h1>
          <div style="background:#2563eb;width:600px;padding:25px 0;border-radius:40px;margin:30px 0;border:8px solid white;box-shadow:0 15px 0 #1e3a8a;display:flex;justify-content:center;align-items:center;">
            <h2 style="font-size:72px;font-weight:900;color:white;margin:0;text-transform:uppercase;letter-spacing:4px;">${player.name}</h2>
          </div>
          <p style="font-weight:900;color:#64748b;font-size:20px;letter-spacing:5px;margin-bottom:40px;">TEO'S PARTY</p>
          <div style="display:grid;grid-template-columns:repeat(3,210px);gap:20px;justify-content:center;">
            ${player.tiles.map(tile => `
              <div style="background:white;border:6px solid #1e293b;border-radius:45px;padding:25px;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 12px 0 #cbd5e1;height:210px;">
                <img src="${tile.img}" alt="${tile.name}" style="width:140px;height:140px;object-fit:contain;" crossorigin="anonymous">
                <span style="font-size:20px;font-weight:900;color:#1e293b;margin-top:10px;text-transform:uppercase;">${tile.name}</span>
              </div>
            `).join('')}
          </div>
          <div style="margin-top:60px;padding-top:30px;border-top:8px dashed #cbd5e1;width:100%;text-align:center;">
            <p style="font-size:16px;font-weight:800;color:#94a3b8;letter-spacing:3px;">GOTTA CATCH 'EM ALL!</p>
          </div>
        </div>
      `;
      container.appendChild(pageEl);
      const canvas = await html2canvas(pageEl, { scale: 2, useCORS: true });
      if (i > 0) pdf.addPage();
      pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, 210, 297);
    }
    document.body.removeChild(container);
    pdf.save('Teos_Pokemon_Bingo.pdf');
  }
}
