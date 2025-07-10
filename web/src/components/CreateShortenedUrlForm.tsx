import { zodResolver } from '@hookform/resolvers/zod'
import { WarningIcon } from '@phosphor-icons/react'
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
		formState: { errors, dirtyFields },
	} = useForm<CreateShortenedUrlData>({
		resolver: zodResolver(CreateShortenedUrlSchema),
		defaultValues: {
			originalUrl: '',
			shortCodeUrl: '',
		},
	})

	const createShortenedUrl: SubmitHandler<CreateShortenedUrlData> = data => {
		console.log(data)
	}

	return (
		<div className="bg-gray-100 flex justify-center lg:w-96 flex-col p-6 rounded-lg w-full">
			<h2 className="text-lg text-gray-600">Novo link</h2>
			<form className="flex flex-col gap-4 py-5" onSubmit={handleSubmit(createShortenedUrl)}>
				<label
					className="focus-within:text-blue-base focus-within:font-bold text-gray-500 text-xs data-[error=true]:text-danger data-[error=true]:font-bold"
					htmlFor="original-url"
					data-error={Boolean(errors.originalUrl)}
				>
					<span className="block pb-2">Link Original</span>
					<input
						className="border border-gray-300 focus:caret-blue-base focus:outline-blue-base focus:outline-[1.5px] font-normal h-12 placeholder:font-normal placeholder:text-gray-400 placeholder:text-md px-4 rounded-lg text-md text-gray-600 w-full data-[error=true]:border-danger data-[error=true]:border-[2px] data-[error=true]:outline-danger data-[error=true]:outline-[1.5px]"
						id="original-url"
						placeholder="www.exemplo.com.br"
						{...register('originalUrl')}
						data-error={Boolean(errors.originalUrl)}
					/>
					{errors.originalUrl && (
						<p className="flex gap-2 normal-case text-sm text-gray-500 pt-1.5">
							<WarningIcon className="text-danger" size={16} /> {errors.originalUrl.message}
						</p>
					)}
				</label>
				<label
					className="flex flex-col gap-2 focus-within:text-blue-base focus-within:font-bold text-gray-500 text-xs data-[error=true]:text-danger data-[error=true]:font-bold"
					htmlFor="short-code-url"
					data-error={Boolean(errors.shortCodeUrl)}
				>
					Link Encurtado
					<div
						className="border border-gray-300  focus-within:border-blue-base flex items-center h-12 px-4 rounded-lg text-gray-600 w-full data-[error=true]:border-danger data-[error=true]:border-[2px] data-[error=true]:outline-danger data-[error=true]:outline-[1.5px]"
						data-error={Boolean(errors.shortCodeUrl)}
					>
						<span className="font-normal normal-case text-gray-400 text-md">brev.ly/</span>

						<input
							className="focus:caret-blue-base text-md text-gray-600 w-full outline-none font-normal"
							id="short-code-url"
							{...register('shortCodeUrl')}
						/>
					</div>
					{errors.shortCodeUrl && (
						<p className="flex gap-2 normal-case text-sm text-gray-500">
							<WarningIcon className="text-danger" size={16} /> {errors.shortCodeUrl.message}
						</p>
					)}
				</label>
				<input
					className="bg-blue-base not-disabled:cursor-pointer disabled:bg-blue-base/50 hover:bg-blue-dark h-12 rounded-lg text-md text-white"
					disabled={!(dirtyFields.originalUrl && dirtyFields.shortCodeUrl)}
					type="submit"
					value="Salvar link"
				/>
			</form>
		</div>
	)
}
