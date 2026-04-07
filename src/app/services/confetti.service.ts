import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class ConfettiService {
  private readonly colors = ['#ef4444', '#3b82f6', '#fbbf24', '#10b981', '#a855f7'];
  trigger(count = 50): void {
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.style.cssText = `
        position:fixed;width:10px;height:10px;z-index:9999;pointer-events:none;
        border-radius:50%;background-color:${this.colors[Math.floor(Math.random() * this.colors.length)]};
        left:${Math.random() * 100}vw;top:-10px;
      `;
      document.body.appendChild(el);
      el.animate(
        [
          { transform: 'translateY(0)', opacity: '1' },
          { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
        ],
        { duration: 3000 }
      ).onfinish = () => el.remove();
    }
  }
}
