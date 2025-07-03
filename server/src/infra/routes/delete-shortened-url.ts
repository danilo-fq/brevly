import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { NotFoundShortenedUrlError } from '../../app/errors/not-found-shortened-url-error'
import { ShortenedUrlAlreadyExistsError } from '../../app/errors/shortened-url-already-exists-error'
import { deleteShortenedUrl } from '../../app/functions/delete-shortened-url'

export const deleteShortenedUrlRoute: FastifyPluginAsyncZod = async app => {
	app.delete(
		'/urls/:shortCodeUrl',
		{
			schema: {
				summary: 'Delete a shortened URL',
				params: z.object({
					shortCodeUrl: z
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
					204: {
						description: 'Shortened URL deleted successfully',
					},

					404: z.object({
						message: z.string().describe('No shortened URL was found for the provided short code'),
					}),
				},
			},
		},
		async (req, reply) => {
			try {
				const { shortCodeUrl } = req.params

				await deleteShortenedUrl(shortCodeUrl)

				return reply.status(204).send()
			} catch (error) {
				if (error instanceof NotFoundShortenedUrlError) {
					return reply.status(error.statusCode).send({ message: error.message })
				}
			}
		}
	)
}
