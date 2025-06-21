import { z } from 'zod/v4'
import { db } from '../../infra/db'
import { schema } from '../../infra/db/schemas'
import { ShortenedUrlAlreadyExistsError } from '../errors/shortened-url-already-exists-error'
import { getShortenedUrlByName } from './get-shortened-url-by-name'

const createShortenedUrlInputSchema = z.object({
	originalUrl: z.url(),
	shortCodeUrl: z.string().min(4).max(10),
})

type CreateShortenedUrlParams = z.input<typeof createShortenedUrlInputSchema>

type CreateShortenedUrlOutput = {
	id: string
	originalUrl: string
	shortCodeUrl: string
	countViews: number
	createdAt: Date
}

export async function createShortenedUrl(
	input: CreateShortenedUrlParams
): Promise<CreateShortenedUrlOutput | ShortenedUrlAlreadyExistsError> {
	const { originalUrl, shortCodeUrl } = createShortenedUrlInputSchema.parse(input)

	const getShortenedUrl = await getShortenedUrlByName(shortCodeUrl)

	if (getShortenedUrl) {
		throw new ShortenedUrlAlreadyExistsError()
	}

	const [newShortenedUrl] = await db
		.insert(schema.urls)
		.values({
			originalUrl,
			shortCodeUrl,
		})
		.returning()

	return newShortenedUrl
}
