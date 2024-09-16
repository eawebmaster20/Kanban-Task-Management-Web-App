import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { BoardEffects } from './shared/state/board.effects';
import { boardReducer } from './shared/state/board.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideStore(),
    provideHttpClient(withFetch()),
    provideState({
      name: 'boards',
      reducer: boardReducer,
    }),
    provideEffects(BoardEffects),
    provideStoreDevtools({maxAge:25, logOnly: false}),
    provideAnimationsAsync()
  ]
};
