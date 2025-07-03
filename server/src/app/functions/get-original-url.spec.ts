import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { NotFoundShortenedUrlError } from '../errors/not-found-shortened-url-error'
import { createShortenedUrl } from './create-shortened-url'
import { getOriginalUrl } from './get-original-url'

describe('Get Original URL', () => {
	it('should be able to get an existing original URL', async () => {
		const namePattern = randomUUID().slice(0, 10)

		await createShortenedUrl({
			originalUrl: 'https://google.com',
			shortCodeUrl: namePattern,
		})

		const sut = await getOriginalUrl(namePattern)

		expect(sut).toHaveProperty('originalUrl')
		expect(sut).toEqual(
			expect.objectContaining({
				originalUrl: 'https://google.com',
			})
		)
	})

	it('should not allow get an inexisting URL', async () => {
		const INEXISTING_SHORTCODE = 'inexist-sc'

		await expect(() => getOriginalUrl(INEXISTING_SHORTCODE)).rejects.toThrow(
			NotFoundShortenedUrlError
		)
	})
})
