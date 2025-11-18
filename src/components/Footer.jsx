function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900/80 py-6 sm:py-8 md:py-10 px-4 sm:px-5 text-center border-t border-gray-800 mt-12 sm:mt-14 md:mt-16">
      <div className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 font-mono px-4">
        Site desenvolvido com React.js e Tailwind CSS
      </div>
      <div className="text-gray-400 text-xs sm:text-sm font-mono px-4">
        © {currentYear} Mauricio Santos. Todos os direitos reservados.
      </div>
    </footer>
  )
}

export default Footer