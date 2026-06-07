import { useTranslation } from '../hooks/useTranslation'
import { SiLinkedin, SiGithub } from 'react-icons/si'

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

function Footer() {
  const currentYear = new Date().getFullYear()
  const t = useTranslation()

  const socials = [
    {
      icon: <EmailIcon />,
      href: 'mailto:contatomauriciosts@gmail.com',
      label: 'E-mail',
    },
    {
      icon: <SiLinkedin size={20} />,
      href: 'https://linkedin.com/in/mauriciosts',
      label: 'LinkedIn',
    },
    {
      icon: <SiGithub size={20} />,
      href: 'https://github.com/MauricioSts',
      label: 'GitHub',
    },
  ]

  return (
    <footer className="bg-gray-900/80 py-8 sm:py-10 px-4 sm:px-5 border-t border-gray-800">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-5">
        <div className="flex items-center gap-5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('mailto') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-gray-500 hover:text-emerald-400 transition-colors duration-200"
            >
              {s.icon}
            </a>
          ))}
        </div>
        <div className="text-gray-500 text-xs font-mono text-center">{t.footer.developed}</div>
        <div className="text-gray-600 text-xs font-mono text-center">
          © {currentYear} Mauricio Santos. {t.footer.rights}
        </div>
      </div>
    </footer>
  )
}

export default Footer
