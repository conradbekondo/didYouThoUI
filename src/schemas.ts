import { z } from 'zod';

export const ThemeModeSchema = z.enum(['light', 'dark', 'system']);
export const PrincipalSchema = z.object({
  username: z.string(),
  email: z.email(),
  roles: z.string().array().optional()
})
export const AuthStateSchema = z.object({
  token: z.jwt().optional(),
  provider: z.enum(['github', 'credential', 'google', 'passkey']),
  userInfo: PrincipalSchema.optional(),
  sessionExpiresAt: z.date()
});
