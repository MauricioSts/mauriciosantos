import { useLanguage } from '../contexts/LanguageContext'
import { pt } from '../translations/pt'
import { en } from '../translations/en'

export const useTranslation = () => {
  const { language } = useLanguage()
  const t = language === 'pt' ? pt : en
  return t
}

