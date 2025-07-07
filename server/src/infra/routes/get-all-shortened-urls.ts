import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { getAllShortenedUrls } from '../../app/functions/get-all-shortened-urls'

export const getAllShortenedUrlRoute: FastifyPluginAsyncZod = async app => {
	app.get(
		'/urls',
		{
			schema: {
				summary: 'Get all shortened URLs',
				response: {
					200: z
						.object({
							shortenedUrls: z.array(
								z.object({
									id: z.uuid().describe('The unique identifier for the shortened URL'),
									originalUrl: z.url().describe('The original URL that was shortened'),
									shortCodeUrl: z
										.string()
										.regex(/^[a-z0-9-]+$/)
										.describe('The unique short code for the shortened URL'),
									countViews: z
										.number()
										.nonnegative()
										.default(0)
										.describe('Number of times the shortened URL has been accessed'),
									createdAt: z.date().describe('Timestamp when the shortened URL was created'),
								})
							),
						})
						.describe('List of all shortened URLs'),
				},
			},
		},
		async (_req, reply) => {
			const shortenedUrls = await getAllShortenedUrls()

			return reply.status(200).send({ shortenedUrls })
		}
	)
}
