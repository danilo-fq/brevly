import { z } from 'zod'

export const envSchema = z.object({
	PORT: z.coerce.number().default(3333),
	NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),

	DATABASE_URL: z.string().url().startsWith('postgresql://'),
	DATABASE_URL_LOCALHOST_MIGRATIONS: z.string().url().startsWith('postgresql://').optional(),

	POSTGRESQL_PORT: z.coerce.number().default(5432),
	POSTGRESQL_DATABASE: z.string(),
	POSTGRESQL_USERNAME: z.string(),
	POSTGRESQL_PASSWORD: z.string(),

	CLOUDFLARE_ACCOUNT_ID: z.string(),
	CLOUDFLARE_ACCESS_KEY_ID: z.string(),
	CLOUDFLARE_SECRET_ACCESS_KEY: z.string(),
	CLOUDFLARE_BUCKET: z.string(),
	CLOUDFLARE_PUBLIC_URL: z.string().url(),
})
