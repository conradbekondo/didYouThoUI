import { createPropertySelectors, createSelector } from "@ngxs/store";
import { AUTH_STATE } from "./auth";

const authSlices = createPropertySelectors(AUTH_STATE);

export const principal = authSlices.userInfo;

export const isUserSignedIn = createSelector([authSlices.token, authSlices.sessionExpiresAt], (token, expiration) => {
  if (!expiration) return false;
  const now = Date.now();
  return now < new Date(expiration).valueOf();
});
