import { eq } from 'drizzle-orm'
import { db } from '../../infra/db'
import { schema } from '../../infra/db/schemas'
import { NotFoundShortenedUrlError } from '../errors/not-found-shortened-url-error'
import { getShortenedUrlByName } from './get-shortened-url-by-name'

export async function deleteShortenedUrl(shortCodeUrl: string): Promise<void> {
	const shortenedUrl = await getShortenedUrlByName(shortCodeUrl)

	if (!shortenedUrl) {
		throw new NotFoundShortenedUrlError()
	}

	await db.delete(schema.urls).where(eq(schema.urls.shortCodeUrl, shortCodeUrl))
}
