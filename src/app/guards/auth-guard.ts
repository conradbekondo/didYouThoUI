import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: (redirect: string) => CanActivateFn = redirect => (route, state) => {
  const isUserSignedIn = true; // TODO: perform an actual check later.
  const router = inject(Router);

  if (isUserSignedIn) return true;
  return router.createUrlTree([redirect], { queryParams: { 'continue': encodeURIComponent(state.url) } });
};
