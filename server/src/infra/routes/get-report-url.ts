import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { GenerateReportError } from '../../app/errors/generate-report-error'
import { exportReportCsvToR2 } from '../../app/functions/export-report-csv-to-r2'

export const getReportUrlRoute: FastifyPluginAsyncZod = async app => {
	app.get(
		'/urls/report',
		{
			schema: {
				summary: 'Get report URL',
				description: 'Generates a report of all shortened URLs and returns the URL to download it',
				response: {
					200: z.object({
						url: z.url().describe('URL to download the report CSV file'),
					}),
					500: z.object({
						message: z.string().describe('Error report csv file creation'),
					}),
				},
			},
		},
		async (_req, reply) => {
			try {
				const { url } = await exportReportCsvToR2()
				return reply.status(200).send({ url })
			} catch (error) {
				if (error instanceof GenerateReportError) {
					console.error('Error generating report:', error.name)
					return reply.status(error.statusCode).send({ message: error.message })
				}
				console.error('Unexpected error generating report:', error)
				return reply.status(500).send({ message: 'Internal Server Error' })
			}
		}
	)
}
