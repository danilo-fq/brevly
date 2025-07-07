import { randomUUID } from 'node:crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { ZodError } from 'zod/v4'
import { db } from '../../infra/db'
import { schema } from '../../infra/db/schemas'
import { ShortenedUrlAlreadyExistsError } from '../errors/shortened-url-already-exists-error'
import { createShortenedUrl } from './create-shortened-url'

const INVALID_NAME_PATTERN = 'Inv@lId_13'

describe('create shortened url', () => {
	beforeEach(async () => {
		await db.delete(schema.urls)
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

	it('should not allow short code with upercase letters and specials characters', async () => {
		await expect(() =>
			createShortenedUrl({
				originalUrl: 'https://google.com',
				shortCodeUrl: INVALID_NAME_PATTERN,
			})
		).rejects.toThrow(ZodError)
	})

	it('should not duplicate short code', async () => {
		const namePattern = 'same-name'

		await createShortenedUrl({
			originalUrl: 'https://google.com',
			shortCodeUrl: namePattern,
		})

		await expect(
			createShortenedUrl({
				originalUrl: 'https://google.com',
				shortCodeUrl: namePattern,
			})
		).rejects.toThrow(ShortenedUrlAlreadyExistsError)
	})
})
