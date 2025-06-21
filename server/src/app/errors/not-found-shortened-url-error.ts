export class NotFoundShortenedUrlError extends Error {
	statusCode = 404
	error = 'NotFoundShortenedUrlError'
	constructor(message = 'Shortened URL not found') {
		super(message)
	}
}
