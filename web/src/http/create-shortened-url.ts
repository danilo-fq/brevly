import axios, { AxiosError } from 'axios'
import type { ShortenedUrl } from '../pages/Homepage'

interface CreateShortenedUrlParams {
	originalUrl: string
	shortCodeUrl: string
}

export async function createShortenedUrl(data: CreateShortenedUrlParams) {
	try {
		const response = await axios.post<ShortenedUrl>(`${import.meta.env.VITE_API_URL}/urls`, data, {
			headers: {
				'Content-Type': 'application/json',
			},
		})

		return response.data
	} catch (error) {
		console.error(error)
		if (error instanceof AxiosError) {
			throw new Error(error.code)
		}
	}
}
