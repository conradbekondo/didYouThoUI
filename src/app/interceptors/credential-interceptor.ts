import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

export const credentialInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith(environment.apiOrigin)) {
    return next(req.clone({ withCredentials: true }));
  }
  return next(req);
};
