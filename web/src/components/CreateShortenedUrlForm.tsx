import { type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod/v4'

const CreateShortenedUrlSchema = z.object({
	originalUrl: z.url({ error: 'Informa uma URL válida.' }),
	shortCodeUrl: z
		.string()
		.min(4, { error: 'O código deve ter no mínimo 4 caracteres.' })
		.max(10, { error: 'O código deve ter no máximo 10 caracteres.' })
		.regex(/^[a-z0-9-]+$/, {
			error: 'URL encurtada deve conter apenas letras minúsculas, números e hífen.',
		}),
})

type CreateShortenedUrlData = z.infer<typeof CreateShortenedUrlSchema>

// type ShortenedUrl = {
// 	id: string
// 	originalUrl: string
// 	shortCodeUrl: string
// 	countViews: number
// 	createdAt: Date
// }

export function CreateShortenedUrlForm() {
	const {
		register,
		handleSubmit,
		// formState: { errors },
	} = useForm<CreateShortenedUrlData>()

	const createShortenedUrl: SubmitHandler<CreateShortenedUrlData> = data => {
		console.log(data)
	}

	return (
		<div className="bg-gray-100 flex justify-center not-sm:flex-col  p-6 rounded-lg w-full">
			<h2 className="text-lg text-gray-600">Novo link</h2>
			<form
				className="flex flex-col gap-4 justify-center py-5"
				onSubmit={handleSubmit(createShortenedUrl)}
			>
				<label className="text-gray-500 text-xs" htmlFor="original-url">
					<span className="block pb-2">Link Original</span>
					<input
						className="border border-gray-300 h-12 px-4 rounded-lg w-full placeholder:text-gray-400 placeholder:text-sm"
						id="original-url"
						placeholder="www.exemplo.com.br"
						{...register('originalUrl')}
					/>
				</label>
				<label className="text-gray-500 text-xs" htmlFor="short-code-url">
					<span className="block pb-2">Link Encurtado</span>
					<input
						className="border border-gray-300 h-12 px-4 rounded-lg w-full placeholder:text-gray-400 placeholder:text-sm"
						id="short-code-url"
						placeholder="brev.ly/"
						{...register('shortCodeUrl')}
					/>
				</label>
				<input
					className="bg-blue-base disabled:bg-blue-base/50  h-12 rounded-lg text-md text-white"
					disabled={true}
					type="submit"
					value="Salvar link"
				/>
			</form>
		</div>
	)
}
