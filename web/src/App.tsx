import { Route, Routes } from 'react-router'
import { Homepage } from './pages/Homepage'
import { Redirect } from './pages/Redirect'

function App() {
	return (
		<Routes>
			<Route path="/" element={<Homepage />} />
			<Route path=":shortCode" element={<Redirect />} />
		</Routes>
	)
}

export default App
