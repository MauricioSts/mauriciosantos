import { createContext, useContext } from 'react'

/* O contexto e o hook moram aqui, fora do arquivo do provider: o Fast Refresh do Vite
   só funciona quando um módulo exporta apenas componentes, então misturar
   LanguageProvider com useLanguage no mesmo arquivo derrubava o HMR a cada edição. */
export const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
