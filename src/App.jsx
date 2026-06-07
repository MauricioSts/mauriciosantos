import { LanguageProvider } from './contexts/LanguageContext'
import Site from './Site'

function App() {
  return (
    <LanguageProvider>
      <Site />
    </LanguageProvider>
  )
}

export default App
