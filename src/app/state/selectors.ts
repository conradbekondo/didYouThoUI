import { createPropertySelectors, createSelector } from "@ngxs/store";
import { z } from "zod";
import { AUTH_STATE } from "./auth";

const authSlices = createPropertySelectors(AUTH_STATE);

export const isUserSignedIn = createSelector([authSlices.token,  authSlices.sessionExpiresAt], (token, expiration) => {
  if (!token) return false;
  const { success: tokenIsValid } = z.jwt().safeParse(token);
  const now = Date.now();
  return tokenIsValid && now < expiration.valueOf();
});
