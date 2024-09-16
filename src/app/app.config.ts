import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { invoiceReducer } from './shared/state/board.reducer';
import { InvoiceEffects } from './shared/state/board.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideStore(),
    provideHttpClient(withFetch()),
    provideState({
      name: 'invoices',
      reducer: invoiceReducer,
    }),
    provideEffects(InvoiceEffects),
    provideStoreDevtools({maxAge:25, logOnly: false}),
    provideAnimationsAsync()
  ]
};
