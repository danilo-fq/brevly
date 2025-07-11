import { desc } from 'drizzle-orm'
import { db } from '../../infra/db'
import { schema } from '../../infra/db/schemas'
import type { CreateShortenedUrlOutput as ShortenedUrl } from './create-shortened-url'

type GetAllShortenedUrlsOutput = ShortenedUrl[]

export async function getAllShortenedUrls(): Promise<GetAllShortenedUrlsOutput> {
	return db.select().from(schema.urls).orderBy(desc(schema.urls.countViews))
}
