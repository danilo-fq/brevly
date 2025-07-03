import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import scalarUi from '@scalar/fastify-api-reference'
import { fastify } from 'fastify'
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod'
import { createUrlRoute } from '../routes/create-shortened-url'
import { deleteShortenedUrlRoute } from '../routes/delete-shortened-url'
import { getOriginalUrlRoute } from '../routes/get-original-url'

export const app = fastify()

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

app.get('/openapi.json', () => app.swagger())

app.register(scalarUi, {
	routePrefix: '/docs',
	configuration: {
		url: '/openapi.json',
	},
})
