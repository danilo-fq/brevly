import { CopyIcon, TrashIcon } from '@phosphor-icons/react'
import { Link } from 'react-router'

type ShortenedUrl = {
	originalUrl: string
	shortCodeUrl: string
	countViews: number
}

export function ShortenedUrlItem({ originalUrl, shortCodeUrl, countViews }: ShortenedUrl) {
	return (
		<div className="flex gap-5 items-center py-4 w-full">
			<div className="flex flex-col gap-1 flex-1">
				<Link to={`/${shortCodeUrl}`}>
					<span className="font-bold text-md hover:text-blue-dark text-blue-base">{`brev.ly/${shortCodeUrl}`}</span>
				</Link>
				<span className="text-sm text-gray-500 not-sm:max-w-36 truncate">{originalUrl}</span>
			</div>

			<span className="text-sm text-gray-500">{`${countViews} acessos`}</span>

			<div className="flex gap-1">
				<button
					className="bg-gray-200 hover:border-blue-base border border-gray-200 rounded-sm p-2.5 cursor-pointer"
					type="button"
				>
					<CopyIcon className="shrink-0 size-5" />
				</button>
				<button
					className="bg-gray-200 border border-gray-200 hover:border-blue-base rounded-sm p-2.5 cursor-pointer"
					type="button"
				>
					<TrashIcon className="shrink-0 size-5" />
				</button>
			</div>
		</div>
	)
}
