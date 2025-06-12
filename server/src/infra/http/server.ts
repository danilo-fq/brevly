import { env } from '../../env'
import { app } from './app'

app.listen({ port: env.PORT }, () => {
	console.log(`Server is running at PORT ${env.PORT}!!!`)
})
