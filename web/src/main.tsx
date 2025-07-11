import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router'
import { Toaster } from 'sonner'
import App from './App.tsx'

const rootElement = document.getElementById('root')
if (!rootElement) {
	throw new Error('Root element with ID "root" not found')
}

createRoot(rootElement).render(
	<BrowserRouter>
		<App />
		<Toaster position="bottom-right" richColors />
	</BrowserRouter>
)
