import { z } from 'zod';

export const SessionAuthSchemeSchema = z.enum(['GITHUB', 'CREDENTIAL', 'GOOGLE', 'PASSKEY']);
export const ThemeModeSchema = z.enum(['light', 'dark', 'system']);
export const PrincipalSchema = z.object({
  avatar: z.string().nullable(),
  email: z.email(),
  roles: z.string().array().optional(),
  name: z.string(),
  id: z.number()
})
export const AuthStateSchema = z.object({
  token: z.jwt().optional(),
  provider: SessionAuthSchemeSchema.optional(),
  userInfo: PrincipalSchema.optional(),
  sessionExpiresAt: z.coerce.date().optional()
});
export const LoginResponseSchema = z.object({
  expiresAt: z.coerce.date(),
  userInfo: PrincipalSchema,
  provider: SessionAuthSchemeSchema,
});

export const ConditionSchema = z.object({
  "text": z.string(),
  "icon": z.string(),
  "code": z.number(),
});
export type Condition = z.infer<typeof ConditionSchema>;

export const LocationSchema = z.object({
  "name": z.string(),
  "region": z.string(),
  "country": z.string(),
  "lat": z.number(),
  "lon": z.number(),
  "tz_id": z.string(),
  "localtime_epoch": z.number(),
  "localtime": z.string(),
});
export type Location = z.infer<typeof LocationSchema>;

export const CurrentSchema = z.object({
  "last_updated_epoch": z.number(),
  "last_updated": z.string(),
  "temp_c": z.number(),
  "temp_f": z.number(),
  "is_day": z.number(),
  "condition": ConditionSchema,
  "wind_mph": z.number(),
  "wind_kph": z.number(),
  "wind_degree": z.number(),
  "wind_dir": z.string(),
  "pressure_mb": z.number(),
  "humidity": z.number(),
  "cloud": z.number(),
  "feelslike_c": z.number(),
  "feelslike_f": z.number(),
  "windchill_c": z.number(),
  "windchill_f": z.number(),
  "heatindex_c": z.number(),
  "heatindex_f": z.number(),
  "dewpoint_c": z.number(),
  "dewpoint_f": z.number(),
  "vis_km": z.number(),
  "vis_miles": z.number(),
  "uv": z.number(),
  "gust_mph": z.number(),
  "gust_kph": z.number(),
});
export type Current = z.infer<typeof CurrentSchema>;

export const WeatherDataSchema = z.object({
  "location": LocationSchema,
  "current": CurrentSchema,
});
