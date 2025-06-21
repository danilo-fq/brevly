import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import scalarUi from '@scalar/fastify-api-reference'
import { fastify } from 'fastify'
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod'
import { urlRoutes } from '../routes/create-shortened-url'

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

app.register(urlRoutes)

app.get('/openapi.json', () => app.swagger())

app.register(scalarUi, {
	routePrefix: '/docs',
	configuration: {
		url: '/openapi.json',
	},
})
