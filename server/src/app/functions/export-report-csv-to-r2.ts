import { uploadFileToStorage } from '../../infra/storage/upload-file-to-storage'
import { getAllShortenedUrls } from './get-all-shortened-urls'

export async function exportReportCsvToR2(): Promise<{ url: string }> {
	const headers = '"ID","Original URL","Short Code","Views","Created At"'

	const urls = await getAllShortenedUrls()

	const rows = urls
		.map(
			url =>
				`"${url.id}","${url.originalUrl}","${url.shortCodeUrl}","${url.countViews}","${url.createdAt.toISOString()}"`
		)
		.join('\n')

	const csvContent = headers.concat('\n', rows)

	const fileName = `${Date.now()}-report.csv`

	const { url } = await uploadFileToStorage({
		folder: 'reports',
		mimeType: 'text/csv',
		fileName,
		csvContent,
	})

	return { url }
}
