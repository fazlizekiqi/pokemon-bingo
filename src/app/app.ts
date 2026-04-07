import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header';
import { HostHubComponent } from './components/host-hub/host-hub';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, HostHubComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
