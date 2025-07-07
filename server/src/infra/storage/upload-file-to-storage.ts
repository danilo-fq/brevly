import path from 'node:path'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { z } from 'zod/v4'
import { GenerateReportError } from '../../app/errors/generate-report-error'
import { env } from '../../env'
import { r2 } from './client'

const uploadDataSchema = z.object({
	folder: z.enum(['reports']),
	fileName: z.string(),
	mimeType: z.string(),
	csvContent: z.string(),
})

type UploadDataSchema = z.input<typeof uploadDataSchema>

export async function uploadFileToStorage(input: UploadDataSchema) {
	const { folder, fileName, mimeType, csvContent } = uploadDataSchema.parse(input)

	const uniqueFileName = `${folder}/${fileName}`

	const response = await r2.send(
		new PutObjectCommand({
			Bucket: env.CLOUDFLARE_BUCKET,
			Key: uniqueFileName,
			Body: Buffer.from(csvContent, 'utf-8'),
			ContentType: mimeType,
		})
	)

	const httpCode = response.$metadata.httpStatusCode

	if (typeof httpCode === 'number' && [200, 204].includes(httpCode)) {
		const url = new URL(uniqueFileName, env.CLOUDFLARE_PUBLIC_URL).toString()

		return {
			url,
		}
	}

	throw new GenerateReportError(`Falha no upload do relatório ${fileName}`)
}
