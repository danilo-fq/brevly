import { eq, sql } from 'drizzle-orm'
import { db } from '../../infra/db'
import { schema } from '../../infra/db/schemas'
import { NotFoundShortenedUrlError } from '../errors/not-found-shortened-url-error'

type GetOriginalUrlOutput = {
	originalUrl: string
}

export async function getOriginalUrl(shortCode: string): Promise<GetOriginalUrlOutput> {
	const [url] = await db
		.update(schema.urls)
		.set({ countViews: sql`${schema.urls.countViews} + 1` })
		.where(eq(schema.urls.shortCodeUrl, shortCode))
		.returning({ originalUrl: schema.urls.originalUrl })

	if (!url) {
		throw new NotFoundShortenedUrlError()
	}

	return url
}
