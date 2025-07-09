import notFoundLogo from '/404.svg'

export function NotFound() {
	return (
		<main className="flex h-dvh items-center justify-center px-3">
			<section className="bg-white flex flex-col gap-6 h-fit items-center rounded-lg px-5 py-12">
				<img className="w-40" src={notFoundLogo} alt="not found 404 logo" />
				<h2 className="text-xl text-gray-600">Link não encontrado</h2>
				<p className="text-center text-gray-500 text-md">
					O link que você está tentando acessar não existe, foi removido ou é uma URL inválida.{' '}
					<br />
					Saiba mais em{' '}
					<a
						className="text-blue-base underline"
						href="http://"
						target="_blank"
						rel="noopener noreferrer"
					>
						brev.ly
					</a>
				</p>
			</section>
		</main>
	)
}
