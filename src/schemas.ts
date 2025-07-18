import { z } from 'zod';

export const ThemeModeSchema = z.enum(['light', 'dark', 'system']);
