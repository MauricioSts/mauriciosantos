import Dock from './Dock'
import { VscHome, VscArchive, VscAccount } from 'react-icons/vsc'
import Reveal from './Reveal'
import TextType from './TextType'
import DecryptedText from './DecryptedText'
import TrueFocus from './TrueFocus'
import { useTranslation } from '../hooks/useTranslation'

function Hero() {
  const t = useTranslation()
  return (
    <section className="min-h-screen flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-5" id="home">

      {/* Racing stripe decorative element */}
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-emerald-500 to-transparent opacity-40 pointer-events-none" />

      {/* Main hero content */}
      <div className="max-w-7xl mx-auto w-full">

        {/* Top label */}
        <Reveal y={16}>
          <div className="flex items-center gap-3 mb-8 sm:mb-10">
            <div className="w-8 h-px bg-emerald-500" />
            <span className="text-emerald-400 text-xs font-mono tracking-[0.3em] uppercase">Portfolio</span>
          </div>
        </Reveal>

        {/* Split layout: text left, photo right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left: Text content */}
          <div className="order-2 lg:order-1">
            <Reveal y={30} delay={0.05}>
              <TextType
                as="h1"
                text="Mauricio Santos"
                typingSpeed={55}
                variableSpeed={{ min: 35, max: 75 }}
                initialDelay={200}
                loop={false}
                showCursor={true}
                cursorCharacter="_"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-none mb-4"
                cursorClassName="text-emerald-400"
                textColors={["#ffffff"]}
              />
            </Reveal>

            <Reveal delay={0.1}>
              <div id="tagline" className="mb-6 sm:mb-8">
                <TrueFocus
                  sentence={t.hero.tagline}
                  manualMode={false}
                  blurAmount={4}
                  borderColor="#34d399"
                  glowColor="rgba(52, 211, 153, 0.55)"
                  animationDuration={0.4}
                  pauseBetweenAnimations={0.7}
                  wordClass="text-base sm:text-lg md:text-xl text-emerald-300"
                />
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="space-y-4 mb-8 sm:mb-10 text-sm sm:text-base leading-relaxed text-gray-300 tracking-wide border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
                <p>
                  <DecryptedText
                    text={t.hero.description1}
                    className="inline"
                    animateOn="view"
                    speed={18}
                    maxIterations={5}
                    characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%"
                  />
                </p>
                <p>
                  <DecryptedText
                    text={t.hero.description2}
                    className="inline"
                    animateOn="view"
                    speed={18}
                    maxIterations={5}
                    characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%"
                  />
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <Dock
                panelHeight={68}
                baseItemSize={50}
                magnification={70}
                items={[
                  { icon: <VscHome size={22} />, label: t.hero.dock.home, onClick: () => document.getElementById('tagline')?.scrollIntoView({ behavior: 'smooth', block: 'center' }) },
                  { icon: <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='w-6 h-6' fill='currentColor' aria-hidden='true'><path fillRule='evenodd' d='M12 2C6.477 2 2 6.486 2 12.02c0 4.43 2.865 8.185 6.839 9.504.5.094.683-.217.683-.484 0-.238-.009-.868-.014-1.704-2.782.606-3.369-1.342-3.369-1.342-.455-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.833.091-.648.35-1.088.636-1.338-2.221-.253-4.555-1.114-4.555-4.956 0-1.094.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.748-1.026 2.748-1.026.546 1.378.203 2.396.1 2.65.64.7 1.028 1.594 1.028 2.688 0 3.852-2.338 4.7-4.566 4.949.359.31.678.924.678 1.861 0 1.342-.012 2.424-.012 2.754 0 .269.18.582.689.483A10.02 10.02 0 0 0 22 12.02C22 6.486 17.523 2 12 2Z' clipRule='evenodd'/></svg>, label: t.hero.dock.github, onClick: () => window.open('https://github.com/MauricioSts', '_blank') },
                  { icon: <VscArchive size={22} />, label: t.hero.dock.projects, onClick: () => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }) },
                  { icon: <VscAccount size={22} />, label: t.hero.dock.contact, onClick: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
                ]}
              />
            </Reveal>
          </div>

          {/* Right: Photo */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <Reveal y={24} delay={0}>
              <div className="relative">
                {/* Racing number badge */}
                <div className="absolute -top-5 -right-5 z-20 w-14 h-14 sm:w-16 sm:h-16 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)] rotate-6">
                  <span className="text-gray-900 font-extrabold text-xl sm:text-2xl font-mono">MS</span>
                </div>

                {/* Glow ring */}
                <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-emerald-500/30 via-emerald-400/10 to-transparent blur-xl" />

                {/* Photo frame with diagonal accent */}
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl border-2 border-emerald-500/60 translate-x-3 translate-y-3" />
                  <img
                    src="/profile.jpeg"
                    alt="Foto de perfil"
                    className="relative z-10 w-56 h-72 sm:w-72 sm:h-96 md:w-80 md:h-[26rem] object-cover rounded-2xl border border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.15)]"
                  />
                  {/* Corner accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900/80 to-transparent rounded-b-2xl z-20" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Stats bar */}
        <Reveal delay={0.25} y={20}>
          <div className="mt-12 sm:mt-16 pt-8 border-t border-gray-800/60 grid grid-cols-3 gap-4 sm:gap-8 max-w-lg lg:max-w-none">
            {[
              { value: '5+', label: t.hero.stats.projects },
              { value: '2+', label: t.hero.stats.years },
              { value: '3', label: t.hero.stats.stacks },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-emerald-400 font-mono">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-500 font-mono mt-1 tracking-wider uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Hero
