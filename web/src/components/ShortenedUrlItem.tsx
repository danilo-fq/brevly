import { CopyIcon, TrashIcon } from '@phosphor-icons/react'
import { Link } from 'react-router'
import { toast } from 'sonner'
import { deleteShortenedUrl } from '../http/delete-shortened-url'

type ShortenedUrlItemParams = {
	originalUrl: string
	shortCodeUrl: string
	countViews: number
	deleteUrl: (shortCodeUrl: string) => void
}

export function ShortenedUrlItem({
	originalUrl,
	shortCodeUrl,
	countViews,
	deleteUrl,
}: ShortenedUrlItemParams) {
	const deleteShortenedUrlHandler = async (shortCodeUrl: string): Promise<void> => {
		if (confirm('Você deseja deletar a URL encurtada?')) {
			await deleteShortenedUrl(shortCodeUrl)
			deleteUrl(shortCodeUrl)
		}
	}

	const copyUrlLinkHandler = async (shortCodeUrl: string): Promise<void> => {
		navigator.clipboard.writeText(`${import.meta.env.VITE_FRONTEND_URL}/${shortCodeUrl}`)
		toast.info('Link copiado com sucesso', {
			description: `O link ${shortCodeUrl} foi copiado para a área de transferência.`,
		})
	}

	return (
		<div className="flex gap-5 items-center py-4 w-full" key={shortCodeUrl}>
			<div className="flex flex-col gap-1 flex-1">
				<Link target="_blank" to={`/${shortCodeUrl}`}>
					<span className="font-bold text-md hover:text-blue-dark text-blue-base">{`brev.ly/${shortCodeUrl}`}</span>
				</Link>
				<span className="text-sm text-gray-500 not-sm:max-w-36 truncate">{originalUrl}</span>
			</div>

			<span className="text-sm text-gray-500">{`${countViews} acessos`}</span>

			<div className="flex gap-1">
				<button
					className="bg-gray-200 hover:border-blue-base border border-gray-200 rounded-sm p-2.5 cursor-pointer"
					type="button"
					onClick={() => copyUrlLinkHandler(shortCodeUrl)}
				>
					<CopyIcon className="shrink-0 size-5" />
				</button>
				<button
					className="bg-gray-200 border border-gray-200 hover:border-blue-base rounded-sm p-2.5 cursor-pointer"
					type="button"
					onClick={() => deleteShortenedUrlHandler(shortCodeUrl)}
				>
					<TrashIcon className="shrink-0 size-5" />
				</button>
			</div>
		</div>
	)
}
