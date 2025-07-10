import { DownloadSimpleIcon, LinkIcon } from '@phosphor-icons/react'

export function MyShortenedUrlsDashboard() {
	return (
		<div className="bg-gray-100 flex flex-col gap-4 h-fit justify-center lg:justify-start lg:p-8 lg:w-[36.25rem] p-6 rounded-lg w-full">
			<header className="flex justify-between items-center">
				<h2 className="text-lg text-gray-600">Meus Links</h2>
				<button
					className="bg-gray-200 disabled:bg-gray-200/50 disabled:text-gray-500/50 font-[620] flex gap-x-1.5 group items-center justify-between p-2 rounded-sm text-gray-500 text-sm"
					type="button"
					disabled={true}
				>
					<DownloadSimpleIcon weight="bold" size={16} />
					Baixar CSV
				</button>
			</header>
			<hr className="h-[1px] border-gray-200" />
			<div className="flex flex-col gap-y-3 items-center justify-center py-4">
				<LinkIcon className="text-gray-400" size={32} />
				<p className="text-gray-500 text-xs">Ainda não existe links cadastrados</p>
			</div>
		</div>
	)
}
