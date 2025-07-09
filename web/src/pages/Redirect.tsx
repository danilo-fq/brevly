import brevLogo from '/brevly-favicon.svg'

export function Redirect() {
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
						href="http://"
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
