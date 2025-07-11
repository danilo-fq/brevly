import { defineConfig } from 'drizzle-kit'
import { env } from './src/env'

if (!env.DATABASE_URL_LOCALHOST_MIGRATIONS) {
	throw new Error('DATABASE_URL_LOCALHOST_MIGRATIONS is not defined in the environment variables.')
}

export default defineConfig({
	out: './src/infra/db/migrations',
	schema: './src/infra/db/schemas/*',
	dialect: 'postgresql',
	dbCredentials: {
		url: env.DATABASE_URL_LOCALHOST_MIGRATIONS,
	},
})
