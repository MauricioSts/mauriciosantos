import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import Home from './pages/Home'
import AllProjects from './pages/AllProjects'

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projetos" element={<AllProjects />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App