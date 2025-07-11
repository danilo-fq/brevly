import { Route, Routes } from 'react-router'
import { Homepage } from './pages/Homepage'
import { NotFound } from './pages/NotFound'
import { Redirect } from './pages/Redirect'

function App() {
	return (
		<Routes>
			<Route path="/" element={<Homepage />} />
			<Route path="/:shortCodeUrl" element={<Redirect />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	)
}

export default App
