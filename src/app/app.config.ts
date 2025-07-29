import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { NavigationActionTiming, withNgxsRouterPlugin } from '@ngxs/router-plugin';
import { LOCAL_STORAGE_ENGINE, withNgxsStoragePlugin } from '@ngxs/storage-plugin';
import { provideStore } from '@ngxs/store';
import { routes } from './app.routes';
import { credentialInterceptor } from './interceptors/credential-interceptor';
import { AUTH_STATE, AuthState } from './state/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(withInterceptors([credentialInterceptor])),
    provideStore([AuthState], withNgxsStoragePlugin({
      keys: [{
        key: AUTH_STATE,
        engine: LOCAL_STORAGE_ENGINE
      }]
    }),
      withNgxsLoggerPlugin({ disabled: !isDevMode() }),
      withNgxsRouterPlugin({ navigationActionTiming: NavigationActionTiming.PreActivation })
    )
  ]
};
