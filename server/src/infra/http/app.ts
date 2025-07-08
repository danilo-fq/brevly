import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import scalarUi from '@scalar/fastify-api-reference'
import { fastify } from 'fastify'
import {
	hasZodFastifySchemaValidationErrors,
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod'
import { createUrlRoute } from '../routes/create-shortened-url'
import { deleteShortenedUrlRoute } from '../routes/delete-shortened-url'
import { getAllShortenedUrlRoute } from '../routes/get-all-shortened-urls'
import { getOriginalUrlRoute } from '../routes/get-original-url'
import { getReportUrlRoute } from '../routes/get-report-url'

export const app = fastify({
	logger: true,
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, {
	origin: '*',
})

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: 'Brev.ly API',
			description: 'Brev.ly API documentation',
			version: '1.0.0',
		},
	},

	transform: jsonSchemaTransform,
})

app.register(createUrlRoute)
app.register(deleteShortenedUrlRoute)
app.register(getOriginalUrlRoute)
app.register(getAllShortenedUrlRoute)
app.register(getReportUrlRoute)

app.get('/openapi.json', () => app.swagger())

app.register(scalarUi, {
	routePrefix: '/docs',
	configuration: {
		url: '/openapi.json',
	},
})

app.setErrorHandler((error, _request, reply) => {
	if (hasZodFastifySchemaValidationErrors(error)) {
		return reply.status(400).send({
			message: 'Validation errror',
			issues: error.message,
		})
	}

	console.error(error)
	return reply.status(500).send({ message: 'Server Internal Error' })
})
