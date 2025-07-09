import BrevlyLogo from '/brevly-logo.svg'
import { CreateShortenedUrlForm } from '../components/CreateShortenedUrlForm'
import { MyShortenedUrlsDashboard } from '../components/MyShortenedUrlsDashboard'
export function Homepage() {
	return (
		<main className="flex h-dvh lg:items-center lg:justify-center">
			<section className="flex flex-col not-sm:items-center not-sm:px-3 not-sm:pt-8 not-sm:gap-3 w-dvw">
				<img className="box-border pb-3 w-24" src={BrevlyLogo} alt="Brevly logo" />
				<CreateShortenedUrlForm />
				<MyShortenedUrlsDashboard />
			</section>
		</main>
	)
}
