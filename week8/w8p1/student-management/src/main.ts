import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';

bootstrapApplication(App, {
  providers: [
    // No providers needed for this simple app
  ]
}).catch(err => console.error(err));