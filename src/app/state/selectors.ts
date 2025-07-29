import { createPropertySelectors, createSelector } from "@ngxs/store";
import { z } from "zod";
import { AUTH_STATE } from "./auth";

const authSlices = createPropertySelectors(AUTH_STATE);

export const isUserSignedIn = createSelector([authSlices.token,  authSlices.sessionExpiresAt], (token, expiration) => {
  const now = Date.now();
  return now < expiration.valueOf();
});
