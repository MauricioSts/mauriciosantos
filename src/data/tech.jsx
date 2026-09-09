import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiOpenjdk, SiNodedotjs, SiDjango,
  SiPostgresql, SiFirebase, SiSupabase, SiFlutter, SiDart, SiDocker, SiGit, SiGithub,
  SiGithubactions, SiVercel, SiExpo, SiTailwindcss, SiUnity, SiSharp, SiPython,
  SiHtml5, SiCss3, SiVite, SiAndroid, SiWhatsapp,
} from 'react-icons/si'

/* Catálogo das ferramentas citadas no site. A ordem importa: a busca é uma
   alternância de regex e a primeira que casa vence, então o nome mais longo
   vem antes do curto — "React Native" e "React.js" antes de "React", senão
   sobraria " Native" solto no texto. */
export const TECHS = [
  { pattern: 'React Native', Icon: SiReact, color: '#61dafb' },
  { pattern: 'React\\.js', Icon: SiReact, color: '#61dafb' },
  { pattern: 'React', Icon: SiReact, color: '#61dafb' },
  { pattern: 'Next\\.js(?: \\d+)?', Icon: SiNextdotjs, color: '#f5f5f7' },
  { pattern: 'TypeScript', Icon: SiTypescript, color: '#3178c6' },
  { pattern: 'JavaScript', Icon: SiJavascript, color: '#f7df1e' },
  { pattern: 'Java', Icon: SiOpenjdk, color: '#f89820' },
  { pattern: 'Node\\.js', Icon: SiNodedotjs, color: '#5fa04e' },
  { pattern: 'Django', Icon: SiDjango, color: '#44b78b' },
  { pattern: 'PostgreSQL', Icon: SiPostgresql, color: '#6c8ff5' },
  { pattern: 'Firebase', Icon: SiFirebase, color: '#ffca28' },
  { pattern: 'Supabase', Icon: SiSupabase, color: '#3ecf8e' },
  { pattern: 'Flutter', Icon: SiFlutter, color: '#55c2ee' },
  { pattern: 'Dart', Icon: SiDart, color: '#3aa7e6' },
  { pattern: 'Docker', Icon: SiDocker, color: '#2496ed' },
  { pattern: 'GitHub Actions', Icon: SiGithubactions, color: '#58a6ff' },
  { pattern: 'GitHub', Icon: SiGithub, color: '#f5f5f7' },
  { pattern: 'Git', Icon: SiGit, color: '#f05032' },
  { pattern: 'Vercel', Icon: SiVercel, color: '#f5f5f7' },
  { pattern: 'Expo', Icon: SiExpo, color: '#f5f5f7' },
  { pattern: 'Tailwind(?: CSS)?', Icon: SiTailwindcss, color: '#38bdf8' },
  { pattern: 'Unity', Icon: SiUnity, color: '#f5f5f7' },
  { pattern: 'C#', Icon: SiSharp, color: '#a179dc' },
  { pattern: 'Python', Icon: SiPython, color: '#4b8bbe' },
  { pattern: 'HTML5?', Icon: SiHtml5, color: '#e34f26' },
  { pattern: 'CSS3?', Icon: SiCss3, color: '#33a9dc' },
  { pattern: 'Vite', Icon: SiVite, color: '#a259ff' },
  { pattern: 'Android', Icon: SiAndroid, color: '#3ddc84' },
  { pattern: 'WhatsApp', Icon: SiWhatsapp, color: '#25d366' },
]

/* Sem lookbehind: o Safari só passou a aceitar em 2023 e o site roda em
   celular antigo. O limite da esquerda vem do \b, que não dispara no meio de
   "JavaScript" quando o alvo é "Java"; o da direita fecha em qualquer letra ou
   "#" para "C" não casar dentro de "C#". */
const SOURCE = TECHS.map(t => t.pattern).join('|')
export const TECH_RE = new RegExp(`\\b(?:${SOURCE})(?![\\w#])`, 'g')

const BY_PATTERN = TECHS.map(t => ({ ...t, re: new RegExp(`^(?:${t.pattern})$`) }))

export function techFor(text) {
  return BY_PATTERN.find(t => t.re.test(text)) || null
}
