import { LanguageProvider } from './contexts/LanguageProvider'
import Site from './Site'

function App() {
  return (
    <LanguageProvider>
      <Site />
    </LanguageProvider>
  )
}

export default App
