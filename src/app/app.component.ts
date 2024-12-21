import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { routes } from './app.routes';
import { PerformanceMonitoringService } from './performance-monitoring.service';
import { OnInit } from '@angular/core';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
    
    `
  ],
})
export class AppComponent implements OnInit {
  constructor(private performanceMonitoringService: PerformanceMonitoringService) {}

  ngOnInit() {
    // The service starts tracking on initialization
  }
}