import { envSchema } from './schema'

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
	console.error('Environment validation failed', _env.error.format())
	throw new Error('Environment validation failed')
}

export const env = _env.data
