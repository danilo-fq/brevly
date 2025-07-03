import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { NotFoundShortenedUrlError } from '../errors/not-found-shortened-url-error'
import { createShortenedUrl } from './create-shortened-url'
import { deleteShortenedUrl } from './delete-shortened-url'
import { getShortenedUrlByName } from './get-shortened-url-by-name'

describe('delete shortened url', () => {
	it('should be able to delete an existing shortened URL', async () => {
		const namePattern = randomUUID().slice(0, 10)

		await createShortenedUrl({
			originalUrl: 'https://google.com',
			shortCodeUrl: namePattern,
		})

		const sut = await deleteShortenedUrl(namePattern)
		const getShortenedUrl = await getShortenedUrlByName(namePattern)

		expect(sut).toBeUndefined()
		expect(getShortenedUrl).toBeUndefined()
	})

	it('should not allow delete an inexisting shortened URL', async () => {
		const INEXISTING_SHORTCODE = 'inexist-sc'

		await expect(() => deleteShortenedUrl(INEXISTING_SHORTCODE)).rejects.toThrow(
			NotFoundShortenedUrlError
		)
	})
})
