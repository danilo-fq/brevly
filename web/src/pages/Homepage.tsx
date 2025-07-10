import { useEffect, useState } from 'react'
import BrevlyLogo from '/brevly-logo.svg'
import { CreateShortenedUrlForm } from '../components/CreateShortenedUrlForm'
import { MyShortenedUrlsDashboard } from '../components/MyShortenedUrlsDashboard'
import { getAllShortenedUrl } from '../http/get-all-shortened-urls'

export type ShortenedUrl = {
	id: string
	originalUrl: string
	shortCodeUrl: string
	countViews: number
	createdAt: Date
}

export function Homepage() {
	const [shortenedUrls, setShortenedUrl] = useState<ShortenedUrl[]>([])
	const [isLoading, setIsLoading] = useState(true)

	const createNewShortenedUrl = (data: ShortenedUrl): void => {
		setShortenedUrl([data, ...shortenedUrls])
	}

	const deleteShortenedUrl = (shortCodeUrl: string): void => {
		const filteredUrls = shortenedUrls.filter(url => url.shortCodeUrl !== shortCodeUrl)
		setShortenedUrl(filteredUrls)
	}

	useEffect(() => {
		const fetchUrls = async () => {
			const data = await getAllShortenedUrl()

			setShortenedUrl(data.shortenedUrls)
			setIsLoading(false)
		}

		fetchUrls()
	}, [])

	return (
		<main className="flex h-dvh lg:items-center lg:justify-center">
			<section className="flex flex-col lg:w-fit not-sm:items-center not-sm:px-3 not-sm:pt-8 not-sm:gap-3 w-dvw">
				<img className="box-border lg:pb-8 pb-3 w-24" src={BrevlyLogo} alt="Brevly logo" />
				<div className="flex lg:gap-x-5 lg:justify-center not-sm:flex-col not-sm:gap-y-3 not-sm:w-full">
					<CreateShortenedUrlForm createUrl={createNewShortenedUrl} />

					<MyShortenedUrlsDashboard
						urls={shortenedUrls}
						isLoading={isLoading}
						deleteUrl={deleteShortenedUrl}
					/>
				</div>
			</section>
		</main>
	)
}
