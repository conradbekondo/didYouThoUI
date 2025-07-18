import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export function extractHttpError(error: HttpErrorResponse) {
  return throwError(() => error.error ?? error);
}
