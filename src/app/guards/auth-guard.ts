import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { isUserSignedIn } from '@state/selectors';

export const authGuard: (redirect: string) => CanActivateFn = redirect => (_, state) => {
  const router = inject(Router);
  const store = inject(Store);
  const signedIn = store.selectSnapshot(isUserSignedIn);

  if (signedIn) return true;
  return router.createUrlTree([redirect], { queryParams: { 'continue': encodeURIComponent(state.url) } });
};
