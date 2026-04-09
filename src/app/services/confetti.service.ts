import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class ConfettiService {
  private readonly colors = ['#ef4444', '#3b82f6', '#fbbf24', '#10b981', '#a855f7'];

  trigger(count = 25): void {
    // Batch all DOM inserts into a fragment to avoid forced reflow per element
    const fragment = document.createDocumentFragment();
    const els: HTMLDivElement[] = [];

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.style.cssText = [
        'position:fixed',
        'width:8px',
        'height:8px',
        'z-index:9999',
        'pointer-events:none',
        'border-radius:50%',
        `background-color:${this.colors[Math.floor(Math.random() * this.colors.length)]}`,
        `left:${Math.random() * 100}vw`,
        'top:-10px',
        // Promote to own layer up-front so subsequent transforms are composited
        'will-change:transform,opacity',
      ].join(';');
      fragment.appendChild(el);
      els.push(el);
    }

    document.body.appendChild(fragment);

    // Start animations after a single rAF so the browser can batch style calc
    requestAnimationFrame(() => {
      for (const el of els) {
        el.animate(
          [
            { transform: 'translateY(0)',       opacity: '1' },
            { transform: 'translateY(100vh)',   opacity: '0' }, // no rotate — cheaper
          ],
          { duration: 1800, easing: 'ease-in' }
        ).onfinish = () => el.remove();
      }
    });
  }
}
