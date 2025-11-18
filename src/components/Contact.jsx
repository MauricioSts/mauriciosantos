import Reveal from './Reveal'

function Contact() {
  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen py-12 sm:py-16 px-4 sm:px-5 bg-white text-gray-900 shadow-sm" id="contact">
      <div className="max-w-5xl mx-auto text-center">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8 md:mb-10 font-bold tracking-tight font-mono px-4">Entre em contato</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <a 
            href="mailto:contatomauriciosts@gmail.com" 
            className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors shadow-lg hover:shadow-xl font-mono text-xs sm:text-sm md:text-lg no-underline break-all max-w-full mx-4 sm:mx-0"
            aria-label="E-mail"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" aria-hidden="true">
              <path fill="#ffffff" d="M44,39c0,1.657-1.343,3-3,3H7c-1.657,0-3-1.343-3-3V9c0-1.657,1.343-3,3-3h34c1.657,0,3,1.343,3,3V39z"/>
              <path fill="#d32f2f" d="M41,6H7C5.343,6,4,7.343,4,9v1l20,13L44,10V9C44,7.343,42.657,6,41,6z"/>
              <path fill="#f5f5f5" d="M44,13L24,26L4,13v26c0,1.657,1.343,3,3,3h34c1.657,0,3-1.343,3-3V13z" opacity=".9"/>
            </svg>
            <span className="break-all text-center">contatomauriciosts@gmail.com</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}

export default Contact