import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import LogRocket from 'logrocket';

// Initialize LogRocket
LogRocket.init('4pijm6/minesweeper');

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    ...appConfig.providers,
  ]
})
.catch((err) => console.error(err));