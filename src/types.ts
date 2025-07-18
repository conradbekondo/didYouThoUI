import { ThemeModeSchema } from './schemas';
import { z } from 'zod';

export type ThemeMode = z.infer<typeof ThemeModeSchema>;
