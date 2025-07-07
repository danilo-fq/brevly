import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { NotFoundShortenedUrlError } from '../../app/errors/not-found-shortened-url-error'
import { getOriginalUrl } from '../../app/functions/get-original-url'

export const getOriginalUrlRoute: FastifyPluginAsyncZod = async app => {
	app.get(
		'/urls/:shortCodeUrl',
		{
			schema: {
				summary: 'Get an original URL',
				params: z.object({
					shortCodeUrl: z
						.string()
						.min(4, { error: 'URL encurtada deve ter no mínimo 4 caracteres.' })
						.max(10, { error: 'URL encurtada deve ter no máximo 10 caracteres.' })
						.regex(/^[a-z0-9-]+$/, {
							error: 'URL encurtada deve conter apenas letras minúsculas, números e hífen.',
						})
						.describe('The unique short code for the shortened URL'),
				}),

				response: {
					200: z
						.object({
							originalUrl: z
								.url()
								.describe('The original URL that corresponds to the provided short code'),
						})
						.describe('The original URL that corresponds to the provided short code'),

					404: z.object({
						message: z.string().describe('No shortened URL was found for the provided short code'),
					}),
				},
			},
		},
		async (req, reply) => {
			try {
				const { shortCodeUrl } = req.params

				const originalUrl = await getOriginalUrl(shortCodeUrl)

				return reply.status(200).send(originalUrl)
			} catch (error) {
				if (error instanceof NotFoundShortenedUrlError) {
					return reply.status(error.statusCode).send({ message: error.message })
				}
			}
		}
	)
}
