import axios, { AxiosError } from 'axios'

export async function getOriginalUrl(shortCodeUrl: string): Promise<{ originalUrl: string }> {
	try {
		const response = await axios.get(`${import.meta.env.VITE_API_URL}/urls/${shortCodeUrl}`)
		return response.data
	} catch (error) {
		console.error(error)
		if (error instanceof AxiosError) {
			throw new Error(error.code)
		}
		throw new Error('Server Internal Error')
	}
}
