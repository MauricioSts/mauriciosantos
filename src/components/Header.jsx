import GooeyNav from './GooeyNav'

function Header() {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50 py-5">
      <nav className="max-w-4xl mx-auto px-5 flex justify-between items-center gap-3">
        <div className="font-semibold text-lg text-green-400 font-mono">Mauricio Santos</div>
        <div className="min-w-0 flex-1 flex justify-end overflow-x-auto">
          <GooeyNav
            className="shrink-0"
            items={[
            { label: 'Home', href: '#tagline' },
            { label: 'Projetos', href: '#portfolio' },
            { label: 'Experiências', href: '#experience' },
            { label: 'DevTools', href: '#devtools' },
            { label: 'Contato', href: '#contact' },
            ]}
            initialActiveIndex={0}
            animationTime={600}
          />
        </div>
      </nav>
    </header>
  )
}

export default Header