import BrevlyLogo from '/brevly-logo.svg'
import { CreateShortenedUrlForm } from '../components/CreateShortenedUrlForm'
import { MyShortenedUrlsDashboard } from '../components/MyShortenedUrlsDashboard'
export function Homepage() {
	return (
		<main className="flex h-dvh lg:items-center lg:justify-center">
			<section className="flex flex-col lg:w-fit not-sm:items-center not-sm:px-3 not-sm:pt-8 not-sm:gap-3 w-dvw">
				<img className="box-border lg:pb-8 pb-3 w-24" src={BrevlyLogo} alt="Brevly logo" />
				<div className="flex lg:gap-x-5 lg:justify-center not-sm:flex-col not-sm:gap-y-3 not-sm:w-full">
					<CreateShortenedUrlForm />
					<MyShortenedUrlsDashboard />
				</div>
			</section>
		</main>
	)
}
