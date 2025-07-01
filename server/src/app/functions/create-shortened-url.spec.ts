import { randomUUID } from 'node:crypto'
import { eq } from 'drizzle-orm'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { ZodError } from 'zod/v4'
import { db } from '../../infra/db'
import { schema } from '../../infra/db/schemas'
import { ShortenedUrlAlreadyExistsError } from '../errors/shortened-url-already-exists-error'
import { createShortenedUrl } from './create-shortened-url'

const INVALID_NAME_PATTERN = 'Inv@lId_13'

describe('create shortened url', () => {
	afterAll(async () => {
		await db.delete(schema.urls).where(eq(schema.urls.shortCodeUrl, INVALID_NAME_PATTERN))
	})
	it('should be able to create a shortened url', async () => {
		const namePattern = randomUUID().slice(0, 10)

		const sut = await createShortenedUrl({
			originalUrl: 'https://google.com',
			shortCodeUrl: namePattern,
		})

		expect(sut).toEqual(
			expect.objectContaining({
				id: expect.any(String),
				originalUrl: 'https://google.com',
				shortCodeUrl: namePattern,
				countViews: expect.any(Number),
				createdAt: expect.any(Date),
			})
		)
	})

	it.only('should not allow short code with upercase letters and specials characters', async () => {
		await expect(() =>
			createShortenedUrl({
				originalUrl: 'https://google.com',
				shortCodeUrl: INVALID_NAME_PATTERN,
			})
		).rejects.toThrow(ZodError)
	})

	it('should not duplicate short code', async () => {
		const namePattern = randomUUID().slice(0, 10)

		await createShortenedUrl({
			originalUrl: 'https://google.com',
			shortCodeUrl: namePattern,
		})

		await expect(() =>
			createShortenedUrl({
				originalUrl: 'https://google.com',
				shortCodeUrl: namePattern,
			})
		).rejects.toThrow(ShortenedUrlAlreadyExistsError)
	})
})
