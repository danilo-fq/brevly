import axios, { AxiosError } from 'axios'

export async function deleteShortenedUrl(shortCodeUrl: string) {
	try {
		await axios.delete(`${import.meta.env.VITE_API_URL}/urls/${shortCodeUrl}`)
	} catch (error) {
		console.error(error)
		if (error instanceof AxiosError) {
			throw new Error(error.code)
		}
	}
}
