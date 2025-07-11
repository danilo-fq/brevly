import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import brevLogo from '/brevly-favicon.svg'
import { getOriginalUrl } from '../http/get-original-url'

export function Redirect() {
	const { shortCodeUrl } = useParams<{ shortCodeUrl: string }>()
	const [originalUrlHref, setOriginalUrlHref] = useState('')

	useEffect(() => {
		const fetchApi = async () => {
			if (shortCodeUrl) {
				const { originalUrl } = await getOriginalUrl(shortCodeUrl)

				setOriginalUrlHref(originalUrl)

				window.location.href = originalUrl
			}
		}

		setTimeout(fetchApi, 3000)
	}, [shortCodeUrl])

	return (
		<main className="flex h-dvh items-center justify-center px-3">
			<section className="bg-white flex flex-col gap-6 h-fit items-center rounded-lg px-5 py-12">
				<img className="size-12" src={brevLogo} alt="Brevly favicon" />
				<h2 className="text-xl text-gray-600">Redirecionando...</h2>
				<p className="text-center text-gray-500 text-md">
					O link será aberto automaticamente em alguns instantes.
					<br />
					Não foi redirecionado?{' '}
					<a
						className="text-blue-base underline"
						href={originalUrlHref}
						target="_blank"
						rel="noopener noreferrer"
					>
						Acesse aqui
					</a>
				</p>
			</section>
		</main>
	)
}
