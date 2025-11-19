import { useState } from 'react'
import GooeyNav from './GooeyNav'
import { useLanguage } from '../contexts/LanguageContext'
import { pt } from '../translations/pt'
import { en } from '../translations/en'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language, toggleLanguage } = useLanguage()
  const t = language === 'pt' ? pt : en

  const navItems = [
    { label: t.nav.home, href: '#tagline' },
    { label: t.nav.projects, href: '#portfolio' },
    { label: t.nav.experience, href: '#experience' },
    { label: t.nav.devtools, href: '#devtools' },
    { label: t.nav.contact, href: '#contact' },
  ]

  const handleNavClick = (href) => {
    if (href?.startsWith('#')) {
      const target = document.querySelector(href)
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50 py-2 sm:py-3 md:py-4">
      <nav className="max-w-4xl mx-auto px-2 sm:px-3 md:px-4 lg:px-5 flex justify-between items-center gap-1 sm:gap-2 md:gap-3">
        <div className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg text-green-400 font-mono whitespace-nowrap flex-shrink-0">
          Mauricio Santos
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex min-w-0 flex-1 justify-end items-center gap-3">
          <GooeyNav
            className="shrink-0"
            items={navItems}
            initialActiveIndex={0}
            animationTime={600}
          />
          <button
            onClick={toggleLanguage}
            className="px-3 py-1.5 text-xs sm:text-sm font-mono text-gray-300 hover:text-emerald-400 border border-gray-700 hover:border-emerald-500 rounded-md transition-colors"
            aria-label="Toggle language"
          >
            {language === 'pt' ? 'EN' : 'PT'}
          </button>
        </div>

        {/* Mobile Menu Button and Language Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1.5 text-xs font-mono text-gray-300 hover:text-emerald-400 border border-gray-700 hover:border-emerald-500 rounded-md transition-colors"
            aria-label="Toggle language"
          >
            {language === 'pt' ? 'EN' : 'PT'}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col gap-1.5 p-2 text-gray-300 hover:text-emerald-400 transition-colors"
            aria-label="Menu"
          >
            <span className={`w-5 h-0.5 bg-current transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-5 h-0.5 bg-current transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-0.5 bg-current transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-gray-900/95 backdrop-blur-md">
          <div className="max-w-4xl mx-auto px-4 py-3 space-y-1">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.href)
                }}
                className="block px-4 py-2.5 rounded-lg text-sm text-gray-300 hover:text-emerald-400 hover:bg-gray-800/50 transition-colors font-mono"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header