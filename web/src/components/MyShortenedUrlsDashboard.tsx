import { Box, LinearProgress } from '@mui/material'
import { DownloadSimpleIcon, LinkIcon, SpinnerIcon } from '@phosphor-icons/react'
import type { ShortenedUrl } from '../pages/Homepage'
import { ShortenedUrlItem } from './ShortenedUrlItem'

type MyShortenedUrlsDashboardProps = {
	urls: ShortenedUrl[]
	isLoading: boolean
	deleteUrl: (shorcodeUrl: string) => void
}

export function MyShortenedUrlsDashboard({
	urls,
	isLoading,
	deleteUrl,
}: MyShortenedUrlsDashboardProps) {
	if (isLoading) {
		return (
			<div className="bg-gray-100 flex flex-col gap-4 h-fit justify-center lg:justify-start lg:p-8 lg:w-[36.25rem] overflow-hidden p-6 relative rounded-lg w-full">
				<Box sx={{ width: '100%' }} className="bg-gray-100 h-1 left-0 absolute top-[0.4px] w-full">
					<LinearProgress className="bg-blue-base h-1 w-full indeterminate:bg-blue-base" />
				</Box>
				<header className="flex justify-between items-center">
					<h2 className="text-lg text-gray-600">Meus Links</h2>
					<button
						className="bg-gray-200 cursor-pointer disabled:cursor-auto disabled:bg-gray-200/50 disabled:text-gray-500/50 font-[620] flex gap-x-1.5 hover:bg-gray-300 items-center justify-between p-2 rounded-sm text-gray-500 text-sm"
						type="button"
						disabled={Boolean(urls.length === 0)}
						onClick={() => console.log('chamada para a API dos relatorios')}
					>
						<DownloadSimpleIcon weight="bold" size={16} />
						Baixar CSV
					</button>
				</header>
				<hr className="h-[1px] border-gray-200" />
				<div
					className={`flex flex-col gap-y-3 items-center justify-center ${urls.length > 0 ? 'divide-y-[1.5px]' : 'divide-y-0'} divide-gray-200`}
				>
					<div className="flex flex-col gap-3 justify-center items-center pt-3">
						<SpinnerIcon className="text-gray-400 shrink-0 size-8 animate-spin stroke-3" />
						<p className="text-gray-400 text-sm uppercase">Carregando links...</p>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="bg-gray-100 flex flex-col gap-4 h-fit justify-center lg:justify-start lg:p-8 lg:w-[36.25rem] p-6 rounded-lg w-full">
			<header className="flex justify-between items-center">
				<h2 className="text-lg text-gray-600">Meus Links</h2>
				<button
					className="bg-gray-200 cursor-pointer disabled:cursor-auto disabled:bg-gray-200/50 disabled:text-gray-500/50 font-[620] flex gap-x-1.5 hover:bg-gray-300 items-center justify-between p-2 rounded-sm text-gray-500 text-sm"
					type="button"
					disabled={Boolean(urls.length === 0)}
					onClick={() => console.log('chamada para a API dos relatorios')}
				>
					<DownloadSimpleIcon weight="bold" size={16} />
					Baixar CSV
				</button>
			</header>
			<hr className="h-[1px] border-gray-200" />
			<div
				className={`flex flex-col gap-y-3 items-center justify-center ${urls.length > 0 ? 'divide-y-[1.5px]' : 'divide-y-0'} divide-gray-200`}
			>
				{urls.length ? (
					urls.map(url => (
						<ShortenedUrlItem
							key={url.shortCodeUrl}
							originalUrl={url.originalUrl}
							shortCodeUrl={url.shortCodeUrl}
							countViews={url.countViews}
							deleteUrl={deleteUrl}
						/>
					))
				) : (
					<div className="flex flex-col gap-3 justify-center items-center pt-3">
						<LinkIcon className="text-gray-400" size={32} />
						<p className="text-gray-500 text-xs">Ainda não existe links cadastrados</p>
					</div>
				)}
			</div>
		</div>
	)
}
