import { useState } from 'react'
import GooeyNav from './GooeyNav'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '#tagline' },
    { label: 'Projetos', href: '#portfolio' },
    { label: 'Experiências', href: '#experience' },
    { label: 'DevTools', href: '#devtools' },
    { label: 'Contato', href: '#contact' },
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
        <div className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg text-green-400 font-mono truncate flex-shrink-0 max-w-[120px] sm:max-w-none">
          Mauricio Santos
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex min-w-0 flex-1 justify-end">
          <GooeyNav
            className="shrink-0"
            items={navItems}
            initialActiveIndex={0}
            animationTime={600}
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 text-gray-300 hover:text-emerald-400 transition-colors"
          aria-label="Menu"
        >
          <span className={`w-5 h-0.5 bg-current transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-5 h-0.5 bg-current transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-0.5 bg-current transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
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