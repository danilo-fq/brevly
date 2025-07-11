import axios, { AxiosError } from 'axios'

export async function createReport(): Promise<{ url: string }> {
	try {
		const response = await axios.get<{ url: string }>(
			`${import.meta.env.VITE_API_URL}/urls/report`,
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
