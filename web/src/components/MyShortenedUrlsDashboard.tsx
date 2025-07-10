import { DownloadSimpleIcon, LinkIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import { ShortenedUrlItem } from './ShortenedUrlItem'

export function MyShortenedUrlsDashboard() {
	const [hasUrl, setHasUrl] = useState(false)

	return (
		<div className="bg-gray-100 flex flex-col gap-4 h-fit justify-center lg:justify-start lg:p-8 lg:w-[36.25rem] p-6 rounded-lg w-full">
			<header className="flex justify-between items-center">
				<h2 className="text-lg text-gray-600">Meus Links</h2>
				<button
					className="bg-gray-200 cursor-pointer disabled:cursor-auto disabled:bg-gray-200/50 disabled:text-gray-500/50 font-[620] flex gap-x-1.5 hover:bg-gray-300 items-center justify-between p-2 rounded-sm text-gray-500 text-sm"
					type="button"
					disabled={!hasUrl}
					onClick={() => console.log('chamada para a API dos relatorios')}
				>
					<DownloadSimpleIcon weight="bold" size={16} />
					Baixar CSV
				</button>
			</header>
			<hr className="h-[1px] border-gray-200" />
			<div
				className={`flex flex-col gap-y-3 items-center justify-center ${hasUrl ? 'divide-y-[1.5px]' : 'divide-y-0'} divide-gray-200`}
			>
				{hasUrl ? (
					<>
						<ShortenedUrlItem
							originalUrl="https://globoesporte.com.br"
							shortCodeUrl="google"
							countViews={0}
						/>
						<ShortenedUrlItem
							originalUrl="https://google.com.br"
							shortCodeUrl="google"
							countViews={0}
						/>
					</>
				) : (
					<>
						<LinkIcon className="text-gray-400" size={32} />
						<p className="text-gray-500 text-xs">Ainda não existe links cadastrados</p>
					</>
				)}
			</div>
		</div>
	)
}
