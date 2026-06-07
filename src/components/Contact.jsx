import Reveal from './Reveal'
import { useTranslation } from '../hooks/useTranslation'
import { SiLinkedin, SiGithub } from 'react-icons/si'
import { motion } from 'framer-motion'

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

function Contact() {
  const t = useTranslation()

  const cards = [
    {
      icon: <EmailIcon />,
      label: t.contact.emailLabel,
      desc: t.contact.emailDesc,
      value: 'contatomauriciosts@gmail.com',
      href: 'mailto:contatomauriciosts@gmail.com',
      colorBg: 'bg-red-50',
      colorBorder: 'border-red-200 hover:border-red-400',
      colorIcon: 'text-red-500',
      colorShadow: 'hover:shadow-red-100',
    },
    {
      icon: <SiLinkedin size={28} />,
      label: t.contact.linkedinLabel,
      desc: t.contact.linkedinDesc,
      value: 'linkedin.com/in/mauriciosts',
      href: 'https://linkedin.com/in/mauriciosts',
      colorBg: 'bg-blue-50',
      colorBorder: 'border-blue-200 hover:border-blue-400',
      colorIcon: 'text-blue-600',
      colorShadow: 'hover:shadow-blue-100',
    },
    {
      icon: <SiGithub size={28} />,
      label: t.contact.githubLabel,
      desc: t.contact.githubDesc,
      value: 'github.com/MauricioSts',
      href: 'https://github.com/MauricioSts',
      colorBg: 'bg-gray-100',
      colorBorder: 'border-gray-300 hover:border-gray-500',
      colorIcon: 'text-gray-700',
      colorShadow: 'hover:shadow-gray-200',
    },
  ]

  return (
    <section
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen pt-16 pb-20 sm:pt-20 sm:pb-24 px-4 sm:px-5 bg-white text-gray-900"
      id="contact"
    >
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className="section-label text-center mb-3">contato</p>
        </Reveal>
        <Reveal>
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 font-bold text-center tracking-tight px-4">
            {t.contact.title}
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-gray-500 text-sm sm:text-base text-center max-w-md mx-auto mb-12 sm:mb-16 px-4 leading-relaxed">
            {t.contact.subtitle}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
          {cards.map((card, i) => (
            <Reveal key={card.label} delay={i * 0.1}>
              <motion.a
                href={card.href}
                target={card.href.startsWith('mailto') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className={`flex flex-col items-center gap-4 p-7 sm:p-8 rounded-2xl border-2 ${card.colorBg} ${card.colorBorder} ${card.colorShadow} transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl no-underline group`}
                whileTap={{ scale: 0.97 }}
              >
                <div className={`${card.colorIcon} transition-transform duration-300 group-hover:scale-110`}>
                  {card.icon}
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-800 text-base mb-0.5">{card.label}</p>
                  <p className="text-gray-500 text-xs">{card.desc}</p>
                </div>
                <p className="text-gray-500 text-xs font-mono break-all text-center leading-relaxed">
                  {card.value}
                </p>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Contact
