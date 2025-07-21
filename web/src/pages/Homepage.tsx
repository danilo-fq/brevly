import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import BrevlyLogo from '/brevly-logo.svg'
import { CreateShortenedUrlForm } from '../components/CreateShortenedUrlForm'
import { MyShortenedUrlsDashboard } from '../components/MyShortenedUrlsDashboard'
import { type CreateShortenedUrlParams, createShortenedUrl } from '../http/create-shortened-url'
import { deleteShortenedUrl } from '../http/delete-shortened-url'
import { getAllShortenedUrl } from '../http/get-all-shortened-urls'

export type ShortenedUrl = {
	id: string
	originalUrl: string
	shortCodeUrl: string
	countViews: number
	createdAt: Date
}

export function Homepage() {
	const queryClient = useQueryClient()

	const { data, isLoading } = useQuery({
		queryKey: ['get-all-urls'],
		queryFn: getAllShortenedUrl,
	})

	const { mutateAsync: createNewShortenedUrl } = useMutation({
		mutationFn: async (data: CreateShortenedUrlParams) => await createShortenedUrl(data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['get-all-urls'],
			})
		},
	})

	const { mutateAsync: deleteShortenedUrlHandler } = useMutation({
		mutationFn: async (shortCodeUrl: string) => await deleteShortenedUrl(shortCodeUrl),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['get-all-urls'],
			})
		},
	})

	return (
		<main className="flex h-dvh lg:items-center lg:justify-center">
			<section className="flex flex-col lg:w-fit not-sm:items-center not-sm:px-3 not-sm:pt-8 not-sm:gap-3 w-dvw">
				<img className="box-border lg:pb-8 pb-3 w-24" src={BrevlyLogo} alt="Brevly logo" />
				<div className="flex lg:gap-x-5 lg:justify-center not-sm:flex-col not-sm:gap-y-3 not-sm:w-full">
					<CreateShortenedUrlForm createUrl={createNewShortenedUrl} />
					{data?.shortenedUrls && (
						<MyShortenedUrlsDashboard
							urls={data.shortenedUrls}
							isLoading={isLoading}
							deleteUrl={deleteShortenedUrlHandler}
						/>
					)}
				</div>
			</section>
		</main>
	)
}
