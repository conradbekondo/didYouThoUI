import { AuthStateSchema, PrincipalSchema, ThemeModeSchema } from './schemas';
import { z } from 'zod';

export type ThemeMode = z.infer<typeof ThemeModeSchema>;
export type AuthStateModel = z.infer<typeof AuthStateSchema>;
export type Principal = z.infer<typeof PrincipalSchema>;
