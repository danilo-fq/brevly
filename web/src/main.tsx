import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router'
import { Toaster } from 'sonner'
import { App } from './App'

const queryClient = new QueryClient()

const rootElement = document.getElementById('root')
if (!rootElement) {
	throw new Error('Root element with ID "root" not found')
}

createRoot(rootElement).render(
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<App />
			<Toaster position="bottom-right" richColors />
		</BrowserRouter>
	</QueryClientProvider>
)
