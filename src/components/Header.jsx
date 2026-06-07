import { Link, useLocation } from 'react-router-dom'
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
    <header className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800/60 sticky top-0 z-50 py-3 sm:py-4">
      {/* Top racing accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-60" />

      <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between items-center gap-2">

        {/* Logo */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.4)]">
            <span className="text-gray-900 font-extrabold text-xs font-mono">MS</span>
          </div>
          <span className="font-bold text-sm sm:text-base text-white font-mono tracking-wide hidden sm:block">
            Mauricio Santos
          </span>
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
            className="px-3 py-1.5 text-xs font-mono text-gray-400 hover:text-emerald-400 border border-gray-700/60 hover:border-emerald-500/60 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(16,185,129,0.15)]"
            aria-label="Toggle language"
          >
            {language === 'pt' ? 'EN' : 'PT'}
          </button>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1.5 text-xs font-mono text-gray-400 hover:text-emerald-400 border border-gray-700/60 hover:border-emerald-500/60 rounded-lg transition-all"
            aria-label="Toggle language"
          >
            {language === 'pt' ? 'EN' : 'PT'}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col gap-1.5 p-2 text-gray-300 hover:text-emerald-400 transition-colors"
            aria-label="Menu"
          >
            <span className={`w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-800/60 bg-gray-900/95 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 py-3 space-y-1">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href) }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-gray-300 hover:text-emerald-400 hover:bg-gray-800/50 transition-all font-mono group"
              >
                <span className="text-emerald-500/50 text-xs group-hover:text-emerald-500 transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </span>
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
