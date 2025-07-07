import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest'
import { db } from '../../infra/db'
import { schema } from '../../infra/db/schemas'
import { uploadFileToStorage } from '../../infra/storage/upload-file-to-storage'
import { createShortenedUrl } from './create-shortened-url'
import { exportReportCsvToR2 } from './export-report-csv-to-r2'

describe('Export Report CSV', () => {
	beforeEach(async () => {
		await db.delete(schema.urls)

		vi.mock('../../infra/storage/upload-file-to-storage', () => {
			return {
				uploadFileToStorage: vi.fn().mockImplementation(async () => {
					return {
						url: new URL('https://fake-cloudflare.com/brevly/reports/fake-report.csv').toString(),
					}
				}),
			}
		})
	})

	it('should generate a URL report CSV file with correct content', async () => {
		for (let i = 1; i <= 3; i += 1) {
			await createShortenedUrl({
				originalUrl: 'https://google.com',
				shortCodeUrl: `shortcsv-${i}`,
			})
		}

		const result = await exportReportCsvToR2()

		const [[args]] = (uploadFileToStorage as Mock).mock.calls

		const headers = '"ID","Original URL","Short Code","Views","Created At"'

		expect(uploadFileToStorage).toHaveBeenCalled()
		expect(args.folder).toEqual('reports')
		expect(args.mimeType).toEqual('text/csv')
		expect(args.fileName).toEqual(expect.any(String))
		expect(args.csvContent.split('\n')).toHaveLength(4)
		expect(args.csvContent.split('\n')[0]).toEqual(headers)
		expect(result.url).toEqual('https://fake-cloudflare.com/brevly/reports/fake-report.csv')
	})
})
