import { eq, sql } from 'drizzle-orm'
import { db } from '../../infra/db'
import { schema } from '../../infra/db/schemas'
import { NotFoundShortenedUrlError } from '../errors/not-found-shortened-url-error'
import type { CreateShortenedUrlOutput as ShortenedUrl } from './create-shortened-url'

type GetAllShortenedUrlsOutput = ShortenedUrl[]

export async function getAllShortenedUrls(): Promise<GetAllShortenedUrlsOutput> {
	const shortenedUrls = await db.select().from(schema.urls)

	return shortenedUrls
}
