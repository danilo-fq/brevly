export class ShortenedUrlAlreadyExistsError extends Error {
	statusCode = 409
	error = 'ShortenedUrlAlreadyExistsError'
	constructor(message = 'Shortened URL already exists') {
		super(message)
	}
}
