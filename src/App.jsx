import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Topografia from './pages/Topografia'
import Georreferenciamento from './pages/Georreferenciamento'
import LicenciamentoAmbiental from './pages/LicenciamentoAmbiental'
import GeoCidade from './pages/GeoCidade'
import Privacidade from './pages/Privacidade'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topografia-veranopolis" element={<Topografia />} />
        <Route path="/georreferenciamento-veranopolis" element={<Georreferenciamento />} />
        <Route path="/licenciamento-ambiental-veranopolis" element={<LicenciamentoAmbiental />} />
        {/* Rota dinâmica: :cidade captura qualquer slug (cotipora, nova-prata, etc.) */}
        <Route path="/georreferenciamento/:cidade" element={<GeoCidade />} />
        <Route path="/politica-de-privacidade" element={<Privacidade />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
