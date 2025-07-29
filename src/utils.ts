import { HttpErrorResponse } from '@angular/common/http';
import { map, merge, throwError } from 'rxjs';
import { Actions, ActionType, ofActionCompleted, ofActionDispatched } from '@ngxs/store';
import { DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export function extractHttpError(error: HttpErrorResponse) {
  return throwError(() => error.error ?? error);
}

/**
 * This function creates a signal that indicates whether an action of the specified type is currently loading.
 * It listens for the action being dispatched and completed, updating the signal accordingly.
 *
 * @param type - The type of action to monitor for loading state.
 * @returns A readonly signal that emits true when the action is loading and false when it is completed.
 */
export function isActionLoading(type: ActionType) {
  const action$ = inject(Actions);
  const destroy = inject(DestroyRef);
  const ret = signal<boolean>(false);
  merge(
    action$.pipe(
      ofActionDispatched(type),
      map(() => true)
    ),
    action$.pipe(
      ofActionCompleted(type),
      map(() => false)
    )
  ).pipe(
    takeUntilDestroyed(destroy)
  ).subscribe((v) => ret.set(v));

  return ret.asReadonly();
}
