import { Navigate, Route, Routes } from 'react-router-dom'
import { CadastroPage } from './pages/CadastroPage'
import { HomePage } from './pages/HomePage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cadastro" element={<CadastroPage />} />
      <Route path="*" element={<Navigate to="/cadastro" replace />} />
    </Routes>
  )
}
