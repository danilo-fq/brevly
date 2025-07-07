import { beforeEach, describe, expect, it } from 'vitest'
import { db } from '../../infra/db'
import { schema } from '../../infra/db/schemas'
import { createShortenedUrl } from './create-shortened-url'
import { getAllShortenedUrls } from './get-all-shortened-urls'

describe('Get all shortened URLs', () => {
	beforeEach(async () => {
		await db.delete(schema.urls)
	})

	it('should be able to get a list of shortened urls', async () => {
		for (let i = 1; i <= 5; i += 1) {
			await createShortenedUrl({
				originalUrl: 'https://example.com',
				shortCodeUrl: `short-${i}`,
			})
		}

		const sut = await getAllShortenedUrls()

		expect(sut).toHaveLength(5)
		expect(sut).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					id: expect.any(String),
					originalUrl: expect.any(String),
					shortCodeUrl: expect.any(String),
					countViews: 0,
					createdAt: expect.any(Date),
				}),
			])
		)
	})
})
