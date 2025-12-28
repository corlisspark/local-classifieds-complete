// /Users/thiagotavares/Projects/Services/apps/api/src/config/validation.config.ts

import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default('3000'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  API_PREFIX: z.string().default('api'),
  CORS_ORIGIN: z.string().optional(),
  CORS_CREDENTIALS: z
    .string()
    .transform((val) => val === 'true')
    .default('false'),
  DATABASE_MAX_CONNECTIONS: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default('10'),
  DATABASE_CONNECTION_TIMEOUT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default('10000'),
  DATABASE_QUERY_TIMEOUT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default('30000'),
});

export type EnvConfig = z.infer<typeof envSchema>;

export function validateEnv(): EnvConfig {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(
        (err) => `${err.path.join('.')}: ${err.message}`,
      );
      throw new Error(
        `Environment validation failed:\n${errorMessages.join('\n')}`,
      );
    }
    throw error;
  }
}

export const env = validateEnv();
