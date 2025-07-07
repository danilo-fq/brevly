export class GenerateReportError extends Error {
	statusCode: number
	name: string

	constructor(
		message = 'Failed to generate CSV report.',
		name = 'GenerateReportError',
		statusCode = 500
	) {
		super(message)
		this.name = name
		this.statusCode = statusCode
	}
}
