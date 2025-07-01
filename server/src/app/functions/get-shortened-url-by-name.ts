import { eq } from 'drizzle-orm'
import { db } from '../../infra/db'
import { schema } from '../../infra/db/schemas'

type GetUrlOutput = {
	id: string
	originalUrl: string
	shortCodeUrl: string
	countViews: number
	createdAt: Date
}

export async function getShortenedUrlByName(shortCode: string): Promise<GetUrlOutput | undefined> {
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

	return shortenedUrl
}
