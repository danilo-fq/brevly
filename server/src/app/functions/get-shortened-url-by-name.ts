import { eq } from 'drizzle-orm'
import { db } from '../../infra/db'
import { schema } from '../../infra/db/schemas'
import { NotFoundShortenedUrlError } from '../errors/not-found-shortened-url-error'

type GetUrlOutput = {
	id: string
	originalUrl: string
	shortCodeUrl: string
	countViews: number
	createdAt: Date
}

export async function getShortenedUrlByName(
	shortCode: string
): Promise<GetUrlOutput | NotFoundShortenedUrlError> {
	const shortenedUrl = await db.query.urls.findFirst({
		where: eq(schema.urls.shortCodeUrl, shortCode),
		columns: {
			id: true,
			originalUrl: true,
			shortCodeUrl: true,
			countViews: true,
			createdAt: true,
		},
	})

	if (!shortenedUrl) {
		throw new NotFoundShortenedUrlError()
	}

	return shortenedUrl
}
