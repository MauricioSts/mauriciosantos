import Header from '../components/Header'
import Particles from '../components/Particles'
import Hero from '../components/Hero'
import Portfolio from '../components/Portfolio'
import DevTools from '../components/DevTools'
import ExperienceSection from '../components/ExperienceSection'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import WaveDivider from '../components/WaveDivider'

function Home() {
  return (
    <div className="min-h-screen relative bg-gray-900 text-gray-200">
      <Particles />
      <Header />
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-5">
          <Hero />
        </div>

        <WaveDivider variant="dark-to-light" />
        <Portfolio />
        <WaveDivider variant="light-to-dark" />

        <div className="max-w-7xl mx-auto px-4 sm:px-5">
          <ExperienceSection />
          <DevTools />
        </div>

        <WaveDivider variant="dark-to-light" />
        <Contact />
        <WaveDivider variant="light-to-dark" />
      </main>
      <Footer />
    </div>
  )
}

export default Home



