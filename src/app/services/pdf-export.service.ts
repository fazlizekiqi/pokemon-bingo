import { Injectable } from '@angular/core';
import { Player } from '../models/pokemon.model';
import { POKEMON_DATA } from '../data/pokemon.data';

declare const html2canvas: (el: HTMLElement, opts?: any) => Promise<HTMLCanvasElement>;

/** One unique visual identity per card */
interface CardTheme {
  bgGradient: string;       // CSS gradient for the page
  accentColor: string;      // main accent (header bar, borders)
  accentDark: string;       // darker shadow of accent
  textOnAccent: string;     // text on the accent bar
  badgeColor: string;       // small subtitle badge
  tileAccent: string;       // tile border colour
  tileShadow: string;       // tile drop-shadow colour
  titleColor: string;       // "POKÉMON BINGO" headline
  cornerImg: string;        // decorative corner Pokémon image
  patternImg: string;       // watermark repeat image
  borderStyle: string;      // outer page border style
}

const THEMES: CardTheme[] = [
  // 0 – Fiery Red (Charmander vibe)
  {
    bgGradient: 'linear-gradient(145deg,#fff5f5 0%,#ffe0cc 50%,#ffd6e0 100%)',
    accentColor: '#ef4444', accentDark: '#991b1b', textOnAccent: '#fff',
    badgeColor: '#fca5a5', tileAccent: '#ef4444', tileShadow: '#fca5a5',
    titleColor: '#7f1d1d',
    cornerImg: 'assets/pokemon/4.png',   // Charmander
    patternImg: 'assets/pokemon/ultra-ball.png',
    borderStyle: '6px solid #ef4444',
  },
  // 1 – Ocean Blue (Squirtle vibe)
  {
    bgGradient: 'linear-gradient(145deg,#eff6ff 0%,#bfdbfe 50%,#dbeafe 100%)',
    accentColor: '#2563eb', accentDark: '#1e3a8a', textOnAccent: '#fff',
    badgeColor: '#93c5fd', tileAccent: '#2563eb', tileShadow: '#93c5fd',
    titleColor: '#1e3a8a',
    cornerImg: 'assets/pokemon/7.png',   // Squirtle
    patternImg: 'assets/pokemon/poke-ball.png',
    borderStyle: '6px solid #2563eb',
  },
  // 2 – Leaf Green (Bulbasaur vibe)
  {
    bgGradient: 'linear-gradient(145deg,#f0fdf4 0%,#bbf7d0 50%,#d1fae5 100%)',
    accentColor: '#16a34a', accentDark: '#14532d', textOnAccent: '#fff',
    badgeColor: '#86efac', tileAccent: '#16a34a', tileShadow: '#86efac',
    titleColor: '#14532d',
    cornerImg: 'assets/pokemon/1.png',   // Bulbasaur
    patternImg: 'assets/pokemon/poke-ball.png',
    borderStyle: '6px solid #16a34a',
  },
  // 3 – Golden Yellow (Pikachu vibe)
  {
    bgGradient: 'linear-gradient(145deg,#fffde7 0%,#fef08a 50%,#fde68a 100%)',
    accentColor: '#ca8a04', accentDark: '#713f12', textOnAccent: '#fff',
    badgeColor: '#fde047', tileAccent: '#ca8a04', tileShadow: '#fde047',
    titleColor: '#713f12',
    cornerImg: 'assets/pokemon/25.png',  // Pikachu
    patternImg: 'assets/pokemon/ultra-ball.png',
    borderStyle: '6px solid #ca8a04',
  },
  // 4 – Deep Purple (Gengar vibe)
  {
    bgGradient: 'linear-gradient(145deg,#faf5ff 0%,#e9d5ff 50%,#ede9fe 100%)',
    accentColor: '#7c3aed', accentDark: '#4c1d95', textOnAccent: '#fff',
    badgeColor: '#c4b5fd', tileAccent: '#7c3aed', tileShadow: '#c4b5fd',
    titleColor: '#4c1d95',
    cornerImg: 'assets/pokemon/94.png',  // Gengar
    patternImg: 'assets/pokemon/poke-ball.png',
    borderStyle: '6px solid #7c3aed',
  },
  // 5 – Cotton Candy Pink (Jigglypuff vibe)
  {
    bgGradient: 'linear-gradient(145deg,#fff0f6 0%,#fbcfe8 50%,#fce7f3 100%)',
    accentColor: '#db2777', accentDark: '#831843', textOnAccent: '#fff',
    badgeColor: '#f9a8d4', tileAccent: '#db2777', tileShadow: '#f9a8d4',
    titleColor: '#831843',
    cornerImg: 'assets/pokemon/39.png',  // Jigglypuff
    patternImg: 'assets/pokemon/ultra-ball.png',
    borderStyle: '6px solid #db2777',
  },
  // 6 – Sky Teal (Lapras vibe)
  {
    bgGradient: 'linear-gradient(145deg,#ecfeff 0%,#a5f3fc 50%,#cffafe 100%)',
    accentColor: '#0891b2', accentDark: '#164e63', textOnAccent: '#fff',
    badgeColor: '#67e8f9', tileAccent: '#0891b2', tileShadow: '#67e8f9',
    titleColor: '#164e63',
    cornerImg: 'assets/pokemon/131.png', // Lapras
    patternImg: 'assets/pokemon/poke-ball.png',
    borderStyle: '6px solid #0891b2',
  },
  // 7 – Warm Amber (Eevee vibe)
  {
    bgGradient: 'linear-gradient(145deg,#fffbeb 0%,#fde68a 50%,#fed7aa 100%)',
    accentColor: '#d97706', accentDark: '#78350f', textOnAccent: '#fff',
    badgeColor: '#fcd34d', tileAccent: '#d97706', tileShadow: '#fcd34d',
    titleColor: '#78350f',
    cornerImg: 'assets/pokemon/133.png', // Eevee
    patternImg: 'assets/pokemon/ultra-ball.png',
    borderStyle: '6px solid #d97706',
  },
  // 8 – Mystic Indigo (Mewtwo vibe)
  {
    bgGradient: 'linear-gradient(145deg,#eef2ff 0%,#c7d2fe 50%,#ddd6fe 100%)',
    accentColor: '#4338ca', accentDark: '#1e1b4b', textOnAccent: '#fff',
    badgeColor: '#a5b4fc', tileAccent: '#4338ca', tileShadow: '#a5b4fc',
    titleColor: '#1e1b4b',
    cornerImg: 'assets/pokemon/150.png', // Mewtwo
    patternImg: 'assets/pokemon/poke-ball.png',
    borderStyle: '6px solid #4338ca',
  },
  // 9 – Minty Fresh (Mudkip vibe)
  {
    bgGradient: 'linear-gradient(145deg,#f0fdfa 0%,#99f6e4 50%,#a7f3d0 100%)',
    accentColor: '#0d9488', accentDark: '#134e4a', textOnAccent: '#fff',
    badgeColor: '#5eead4', tileAccent: '#0d9488', tileShadow: '#5eead4',
    titleColor: '#134e4a',
    cornerImg: 'assets/pokemon/258.png', // Mudkip
    patternImg: 'assets/pokemon/ultra-ball.png',
    borderStyle: '6px solid #0d9488',
  },
  // 10 – Sunset Orange (Scorbunny vibe)
  {
    bgGradient: 'linear-gradient(145deg,#fff7ed 0%,#fed7aa 50%,#fecaca 100%)',
    accentColor: '#ea580c', accentDark: '#7c2d12', textOnAccent: '#fff',
    badgeColor: '#fdba74', tileAccent: '#ea580c', tileShadow: '#fdba74',
    titleColor: '#7c2d12',
    cornerImg: 'assets/pokemon/813.png', // Scorbunny
    patternImg: 'assets/pokemon/poke-ball.png',
    borderStyle: '6px solid #ea580c',
  },
  // 11 – Forest Lime (Grookey vibe)
  {
    bgGradient: 'linear-gradient(145deg,#f7fee7 0%,#d9f99d 50%,#bbf7d0 100%)',
    accentColor: '#65a30d', accentDark: '#365314', textOnAccent: '#fff',
    badgeColor: '#a3e635', tileAccent: '#65a30d', tileShadow: '#a3e635',
    titleColor: '#365314',
    cornerImg: 'assets/pokemon/810.png', // Grookey
    patternImg: 'assets/pokemon/ultra-ball.png',
    borderStyle: '6px solid #65a30d',
  },
  // 12 – Ghost Silver (Mimikyu vibe)
  {
    bgGradient: 'linear-gradient(145deg,#fefce8 0%,#e7e5e4 50%,#fef9c3 100%)',
    accentColor: '#78716c', accentDark: '#292524', textOnAccent: '#fff',
    badgeColor: '#d6d3d1', tileAccent: '#78716c', tileShadow: '#d6d3d1',
    titleColor: '#292524',
    cornerImg: 'assets/pokemon/778.png', // Mimikyu
    patternImg: 'assets/pokemon/poke-ball.png',
    borderStyle: '6px solid #78716c',
  },
  // 13 – Legendary Green (Rayquaza vibe) — for GUEST cards
  {
    bgGradient: 'linear-gradient(145deg,#ecfdf5 0%,#6ee7b7 50%,#d1fae5 100%)',
    accentColor: '#059669', accentDark: '#064e3b', textOnAccent: '#fff',
    badgeColor: '#34d399', tileAccent: '#059669', tileShadow: '#34d399',
    titleColor: '#064e3b',
    cornerImg: 'assets/pokemon/384.png', // Rayquaza
    patternImg: 'assets/pokemon/ultra-ball.png',
    borderStyle: '6px dashed #059669',
  },
];

@Injectable({ providedIn: 'root' })
export class PdfExportService {

  async exportCards(players: Player[]): Promise<void> {
    const { jsPDF } = (window as any).jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');

    // Build the list: all named players + 4 guest cards
    const guestCards: Player[] = [1, 2, 3, 4].map((n, i) => {
      const shuffled = [...POKEMON_DATA].sort(() => 0.5 - Math.random());
      return {
        id: players.length + i,
        name: '',
        won: false,
        tiles: shuffled.slice(0, 9).map(p => ({ ...p, marked: false })),
      };
    });
    const allCards: Player[] = [...players, ...guestCards];

    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;left:-6000px;top:0;width:794px;height:1123px;overflow:hidden;';
    document.body.appendChild(container);

    for (let i = 0; i < allCards.length; i++) {
      const player = allCards[i];
      const isTeo = player.name === 'Teo';
      const isGuest = player.name === '';
      // Teo always gets Golden Yellow; guests always get Legendary Green; others cycle
      const theme: CardTheme = isTeo ? THEMES[3] : isGuest ? THEMES[13] : THEMES[i % (THEMES.length - 1)];

      container.innerHTML = '';
      const pageEl = this.buildCardElement(player, theme, isGuest);
      container.appendChild(pageEl);

      // Wait for images to load
      await this.waitForImages(pageEl);

      const canvas = await html2canvas(pageEl, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false,
        width: 794,
        height: 1123,
      });

      if (i > 0) pdf.addPage();
      pdf.addImage(canvas.toDataURL('image/jpeg', 0.96), 'JPEG', 0, 0, 210, 297);
    }

    document.body.removeChild(container);
    pdf.save('Teos_Pokemon_Bingo.pdf');
  }

  // ─── Card builder ────────────────────────────────────────────────────────────

  private buildCardElement(player: Player, theme: CardTheme, isGuest: boolean): HTMLElement {
    const page = document.createElement('div');
    page.style.cssText = `
      width:794px;height:1123px;
      background:${theme.bgGradient};
      border:${theme.borderStyle};
      box-sizing:border-box;
      position:relative;overflow:hidden;
      font-family:'Plus Jakarta Sans',Nunito,sans-serif;
    `;

    // ── Watermark layer ───────────────────────────────────────────────────────
    const wm = document.createElement('div');
    wm.style.cssText = `
      position:absolute;inset:0;display:flex;flex-wrap:wrap;
      align-content:flex-start;gap:0;pointer-events:none;opacity:0.07;z-index:0;
    `;
    wm.innerHTML = Array(30).fill(0).map(() =>
      `<img src="${theme.patternImg}" alt="" style="width:80px;height:80px;object-fit:contain;margin:14px;" crossorigin="anonymous">`
    ).join('');
    page.appendChild(wm);

    // ── Corner decoration (themed Pokémon) ────────────────────────────────────
    const cornerTR = document.createElement('img');
    cornerTR.src = theme.cornerImg;
    cornerTR.style.cssText = `
      position:absolute;top:12px;right:12px;width:110px;height:110px;
      object-fit:contain;opacity:0.35;z-index:1;
      filter:drop-shadow(0 4px 8px rgba(0,0,0,0.15));
      transform:scaleX(-1);
    `;
    cornerTR.crossOrigin = 'anonymous';

    const cornerBL = document.createElement('img');
    cornerBL.src = theme.cornerImg;
    cornerBL.style.cssText = `
      position:absolute;bottom:12px;left:12px;width:110px;height:110px;
      object-fit:contain;opacity:0.35;z-index:1;
      filter:drop-shadow(0 4px 8px rgba(0,0,0,0.15));
    `;
    cornerBL.crossOrigin = 'anonymous';

    page.appendChild(cornerTR);
    page.appendChild(cornerBL);

    // ── Inner content wrapper ─────────────────────────────────────────────────
    const inner = document.createElement('div');
    inner.style.cssText = `
      position:relative;z-index:10;
      width:100%;height:100%;
      display:flex;flex-direction:column;
      align-items:center;justify-content:flex-start;
      padding:36px 52px 28px;
      box-sizing:border-box;
    `;

    // ── Headline ──────────────────────────────────────────────────────────────
    const headline = document.createElement('div');
    headline.style.cssText = `
      text-align:center;margin-bottom:18px;width:100%;
    `;
    headline.innerHTML = `
      <div style="
        display:inline-block;
        background:${theme.accentColor};
        color:${theme.textOnAccent};
        font-size:13px;font-weight:800;
        letter-spacing:6px;text-transform:uppercase;
        padding:5px 22px;border-radius:100px;
        box-shadow:0 4px 0 ${theme.accentDark};
        margin-bottom:12px;
      ">✦ TEO'S BIRTHDAY PARTY ✦</div>
      <h1 style="
        font-size:52px;font-weight:900;font-style:italic;
        color:${theme.titleColor};
        margin:0;
        letter-spacing:-1px;
        text-shadow:3px 3px 0 rgba(0,0,0,0.08);
        line-height:1;
      ">POKÉMON BINGO</h1>
    `;
    inner.appendChild(headline);

    // ── Name banner ───────────────────────────────────────────────────────────
    const nameBanner = document.createElement('div');
    if (isGuest) {
      nameBanner.style.cssText = `
        width:620px;
        padding:18px 30px;
        background:${theme.accentColor};
        border-radius:20px;
        border:5px dashed ${theme.textOnAccent};
        box-shadow:0 10px 0 ${theme.accentDark};
        margin-bottom:22px;
        text-align:center;
      `;
      nameBanner.innerHTML = `
        <div style="height:3px;background:rgba(255,255,255,0.6);border-radius:2px;width:340px;margin:6px auto;"></div>
        <div style="height:3px;background:rgba(255,255,255,0.3);border-radius:2px;width:240px;margin:6px auto;"></div>
      `;
    } else {
      nameBanner.style.cssText = `
        width:620px;
        padding:20px 40px;
        background:${theme.accentColor};
        border-radius:20px;
        border:5px solid ${theme.textOnAccent};
        box-shadow:0 10px 0 ${theme.accentDark};
        margin-bottom:22px;
        text-align:center;
      `;
      nameBanner.innerHTML = `
        <span style="font-size:68px;font-weight:900;color:${theme.textOnAccent};text-transform:uppercase;letter-spacing:3px;
          text-shadow:3px 3px 0 ${theme.accentDark};line-height:1;">${player.name}</span>
      `;
    }
    inner.appendChild(nameBanner);

    // ── 3×3 grid ──────────────────────────────────────────────────────────────
    const grid = document.createElement('div');
    grid.style.cssText = `
      display:grid;
      grid-template-columns:repeat(3,200px);
      gap:16px;
      justify-content:center;
    `;

    player.tiles.forEach((tile, idx) => {
      // Alternate slight rotation for a playful hand-placed feel
      const rotations = [-1.5, 0.8, -0.6, 1.2, 0, -0.9, 0.7, -1.1, 0.5];
      const rot = rotations[idx % rotations.length];

      const cell = document.createElement('div');
      cell.style.cssText = `
        width:200px;height:200px;
        background:white;
        border:5px solid ${theme.tileAccent};
        border-radius:24px;
        padding:16px;
        display:flex;flex-direction:column;
        align-items:center;justify-content:center;
        box-shadow:0 8px 0 ${theme.tileShadow},0 12px 24px rgba(0,0,0,0.08);
        transform:rotate(${rot}deg);
        box-sizing:border-box;
      `;
      cell.innerHTML = `
        <img src="${tile.img}" alt="${tile.name}"
          style="width:126px;height:126px;object-fit:contain;"
          crossorigin="anonymous">
        <span style="
          font-size:17px;font-weight:900;
          color:${theme.tileAccent};
          margin-top:8px;
          text-transform:uppercase;
          letter-spacing:1px;
          text-align:center;
          line-height:1.1;
        ">${tile.name}</span>
      `;
      grid.appendChild(cell);
    });
    inner.appendChild(grid);

    // ── Footer ────────────────────────────────────────────────────────────────
    const footer = document.createElement('div');
    footer.style.cssText = `
      margin-top:auto;padding-top:20px;width:100%;
      display:flex;flex-direction:column;align-items:center;justify-content:center;
    `;
    footer.innerHTML = `
      <img src="assets/teo-logo.png" alt="Teo's Party Logo"
        style="height:120px;object-fit:contain;display:block;margin:0 auto 10px;opacity:0.9;"
        crossorigin="anonymous">
      <div style="display:flex;align-items:center;justify-content:center;gap:16px;width:100%;">
        <img src="assets/pokemon/poke-ball.png" alt="" style="width:36px;height:36px;opacity:0.4;" crossorigin="anonymous">
        <p style="font-size:13px;font-weight:800;color:${theme.accentColor};letter-spacing:4px;margin:0;text-transform:uppercase;opacity:0.8;">
          ✦ GOTTA MARK 'EM ALL! ✦
        </p>
        <img src="assets/pokemon/poke-ball.png" alt="" style="width:36px;height:36px;opacity:0.4;transform:scaleX(-1);" crossorigin="anonymous">
      </div>
    `;
    inner.appendChild(footer);

    page.appendChild(inner);
    return page;
  }

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  private waitForImages(el: HTMLElement): Promise<void> {
    const imgs = Array.from(el.querySelectorAll('img'));
    if (!imgs.length) return Promise.resolve();
    return Promise.all(
      imgs.map(img =>
        img.complete
          ? Promise.resolve()
          : new Promise<void>(res => {
              img.onload = () => res();
              img.onerror = () => res();
            })
      )
    ).then(() => new Promise(res => setTimeout(res, 60)));
  }
}
