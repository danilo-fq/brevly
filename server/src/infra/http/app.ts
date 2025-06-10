import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import scalarUi from '@scalar/fastify-api-reference'
import { fastify } from 'fastify'
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod'

export const app = fastify()

app.register(fastifyCors, {
	origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifySwagger, {
	swagger: {
		info: {
			title: 'Brev.ly API',
			description: 'Brev.ly API documentation',
			version: '1.0.0',
		},
	},
	transform: jsonSchemaTransform,
})

app.get('/spec.json', () => app.swagger())

app.register(scalarUi, {
	routePrefix: '/docs',
	configuration: {
		url: '/spec.json',
	},
})
