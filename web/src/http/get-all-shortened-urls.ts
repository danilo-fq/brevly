import axios, { AxiosError } from 'axios'
import type { ShortenedUrl } from '../pages/Homepage'

interface GetAllShortenedUrlsOutput {
	shortenedUrls: ShortenedUrl[] | []
}

export async function getAllShortenedUrl(): Promise<GetAllShortenedUrlsOutput> {
	try {
		const response = await axios.get<GetAllShortenedUrlsOutput>(
			`${import.meta.env.VITE_API_URL}/urls`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)

		return response.data
	} catch (error) {
		console.error(error)
		if (error instanceof AxiosError) {
			throw new Error(error.code)
		}
		throw new Error('Server Internal Error')
	}
}
