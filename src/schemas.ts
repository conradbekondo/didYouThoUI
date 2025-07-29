import { z } from 'zod';

export const SessionAuthSchemeSchema = z.enum(['GITHUB', 'CREDENTIAL', 'GOOGLE', 'PASSKEY']);
export const ThemeModeSchema = z.enum(['light', 'dark', 'system']);
export const PrincipalSchema = z.object({
  avatar: z.string().nullable(),
  email: z.email(),
  roles: z.string().array().optional(),
  id: z.number()
})
export const AuthStateSchema = z.object({
  token: z.jwt().optional(),
  provider: SessionAuthSchemeSchema,
  userInfo: PrincipalSchema.optional(),
  sessionExpiresAt: z.date()
});
export const LoginResponseSchema = z.object({
  expiresAt: z.coerce.date(),
  userInfo: PrincipalSchema,
  provider: SessionAuthSchemeSchema,
});
