import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {IonicModule} from '@ionic/angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom(IonicModule.forRoot({
      mode: 'md',
      rippleEffect: false
    })),
    provideRouter(routes),
  ]
};
