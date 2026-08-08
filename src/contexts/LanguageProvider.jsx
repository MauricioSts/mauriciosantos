import { useState, useEffect } from 'react'
import { LanguageContext } from './LanguageContext'

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Verifica se há um idioma salvo no localStorage
    const savedLanguage = localStorage.getItem('language')
    return savedLanguage || 'pt'
  })

  useEffect(() => {
    // Salva o idioma no localStorage quando mudar
    localStorage.setItem('language', language)
  }, [language])

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'pt' ? 'en' : 'pt')
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
