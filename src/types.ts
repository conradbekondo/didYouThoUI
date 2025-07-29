import { AuthStateSchema, LoginResponseSchema, PrincipalSchema, ThemeModeSchema, WeatherDataSchema } from './schemas';
import { z } from 'zod';

export type ThemeMode = z.infer<typeof ThemeModeSchema>;
export type AuthStateModel = z.infer<typeof AuthStateSchema>;
export type Principal = z.infer<typeof PrincipalSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type WeatherData = z.infer<typeof WeatherDataSchema>;
