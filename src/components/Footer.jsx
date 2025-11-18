function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900/80 py-10 px-5 text-center border-t border-gray-800 mt-16">
      <div className="text-gray-400 text-sm mb-3 font-mono">
        Site desenvolvido com React.js e Tailwind CSS
      </div>
      <div className="text-gray-400 text-sm font-mono">
        © {currentYear} Mauricio Santos. Todos os direitos reservados.
      </div>
    </footer>
  )
}

export default Footer