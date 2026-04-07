import { Component } from '@angular/core';
import { DrawDisplayComponent } from '../draw-display/draw-display';
import { PokedexLogComponent } from '../pokedex-log/pokedex-log';
@Component({
  selector: 'app-host-hub',
  standalone: true,
  imports: [DrawDisplayComponent, PokedexLogComponent],
  templateUrl: './host-hub.html',
  styles: [`:host { display: flex; flex: 1; min-height: 0; overflow: hidden; }`],
})
export class HostHubComponent {}
