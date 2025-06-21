import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'

export const urlRoutes: FastifyPluginAsyncZod = async app => {
	app.post(
		'/urls',
		{
			schema: {
				summary: 'Create a shortened URL',
				body: z.object({
					originalUrl: z
						.url('URL original deve ser uma URL válida.')
						.describe('The original URL to be shortened'),
					shortCode: z
						.string()
						.min(4, 'URL encurtada deve ter no mínimo 4 caracteres.')
						.max(10, 'URL encurtada deve ter no máximo 10 caracteres.')
						.regex(
							/^[a-z0-9-]+$/,
							'URL encurtada deve conter apenas letras minúsculas, números e hífen.'
						)
						.describe('The unique short code for the shortened URL'),
				}),
				response: {
					201: z
						.object({
							id: z.uuid().describe('The unique identifier for the shortened URL'),
							shortCode: z.string().describe('Short code used to create the shortened URL'),
							originalUrl: z.url().describe('The original URL that was shortened'),
							countViews: z
								.number()
								.int()
								.nonnegative()
								.default(0)
								.describe('Number of times the shortened URL has been accessed'),
							createdAt: z.iso.datetime().describe('Timestamp when the shortened URL was created'),
						})
						.describe('Shortened URL created.'),

					409: z.object({
						message: z
							.string()
							.describe('Error message indicating the short code is already in use.'),
					}),
				},
			},
		},
		async (req, reply) => {
			return {
				id: '123e4567-e89b-12d3-a456-426614174000',
				shortCode: 'abc123',
				originalUrl: 'https://example.com',
				countViews: 0,
				createdAt: new Date().toISOString(),
			}
		}
	)
}
