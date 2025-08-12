import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { catchError, EMPTY, throwError } from 'rxjs';
import { isUserSignedIn } from '@state/selectors';
import { SignedOut } from '@state/auth/actions';

export const credentialInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith(environment.apiBaseUrl)) {
    const store = inject(Store);
    const signedIn = store.selectSnapshot(isUserSignedIn);
    return next(req.clone({ withCredentials: true })).pipe(
      catchError((e: HttpErrorResponse) => {
        if (e.status == 401 && signedIn) {
          store.dispatch(SignedOut);
          return EMPTY;
        }
        return throwError(() => e.error ?? e);
      })
    );
  }
  return next(req);
};
