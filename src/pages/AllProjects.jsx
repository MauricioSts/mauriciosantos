import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Particles from '../components/Particles'

const projects = [
  {
    id: 1,
    title: 'BridgeAndBits',
    problem: 'A consultoria do meu amigo tinha dificuldade em gerenciar múltiplos provedores de internet e gerar relatórios mensais para eles de forma eficiente.',
    solution: 'Dashboard completo para gerenciamento de múltiplos provedores de internet, com cadastro, consulta, acompanhamento de status de conformidade, KPIs e geração automatizada de relatórios mensais.',
    image: '/provedores.png',
    href: 'https://providersmanagement.vercel.app/',
  },
  {
    id: 2,
    title: 'JerseyAndBits',
    problem: 'Eu tinha dificuldade em gerenciar múltiplos clientes via WhatsApp e precisava ter controle sobre os clientes e o lucro bruto mensal.',
    solution: 'Sistema de gestão de pedidos e clientes para lojas de camisas de time, com controle financeiro completo e disponibilizado para outros donos de loja.',
    image: '/jersey.jpeg',
    href: 'https://jerseyandbits.vercel.app/',
  },
  {
    id: 3,
    title: 'Chovinista',
    problem: 'Minha namorada precisava gerenciar e acompanhar o rendimento fixo mensal dela de forma organizada, registrando valores recebidos e visualizando o histórico financeiro para ter controle sobre a renda.',
    solution: 'Sistema de gestão financeira pessoal para controle e visualização de rendimento fixo, permitindo anotações e acompanhamento da renda mensal.',
    image: '/chovinista.jpeg',
    href: '#',
  },
]

function AllProjects() {
  return (
    <div className="min-h-screen relative bg-gray-900 text-gray-200">
      <Particles />
      <header className="sticky top-0 z-40 bg-gray-900/85 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <Link to="/" className="text-gray-200 hover:text-emerald-400 transition-colors">Voltar</Link>
          <div className="font-bold text-emerald-400">{`{ Projetos }`}</div>
          <div />
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-5 py-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-12 tracking-tight text-emerald-400">{`{ All Works }`}</h1>

        <div className="space-y-24">
          {projects.map((p, idx) => (
            <section key={p.id} className={`group relative py-28 md:py-36 grid grid-cols-1 md:grid-cols-2 gap-36 md:gap-44 items-center`}>
              <div className={`order-1 ${idx % 2 === 1 ? 'md:order-last md:flex md:justify-end md:pr-10 lg:pr-12' : 'md:order-none md:pl-10 lg:pl-12'}`}>
                <div className="relative [perspective:1400px]">
                  {/* 3D picture frame - tilt towards text */}
                  <div className={`relative z-0 inline-block w-full md:w-[140%] max-w-none overflow-visible [transform-style:preserve-3d] transform-gpu ${idx % 2 === 1 ? 'origin-right' : 'origin-left'}`}>
                    <motion.div
                      className="relative"
                      initial={{ rotateY: idx % 2 === 1 ? -18 : 18, rotateX: 2, rotateZ: idx % 2 === 1 ? 2 : -2, x: idx % 2 === 1 ? 8 : -8 }}
                      whileHover={{ rotateY: 0, rotateX: 0, rotateZ: 0, x: 0, scale: 1.05, y: -2, transition: { duration: 0.45, ease: [0.22,1,0.36,1] } }}
                    >
                      <img src={p.image} alt={p.title} className="w-full h-auto rounded-xl shadow-[0_24px_60px_rgba(0,0,0,0.35)]" />
                    </motion.div>
                  </div>
                </div>
              </div>
              <div className={`${idx % 2 === 1
                ? 'md:pr-20 lg:pr-24 xl:pr-28 md:text-right'
                : 'md:pl-20 lg:pl-24 xl:pl-28'} relative z-10`}> 
                <div className="inline-block border-2 border-emerald-500 text-emerald-300 rounded-md px-5 py-2.5 mb-6 font-semibold tracking-wide text-xl shadow-[0_0_20px_rgba(16,185,129,0.25)]">
                  {p.title.toUpperCase()}
                </div>
                <div className="max-w-3xl text-[1.08rem] md:text-[1.2rem] text-gray-300 leading-8 md:leading-9 tracking-normal">
                  <div className="mb-3"><span className="text-emerald-400 font-semibold">Problema:</span> {p.problem}</div>
                  <div><span className="text-emerald-400 font-semibold">Solução:</span> {p.solution}</div>
                </div>
                <div className="mt-8">
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="inline-block bg-emerald-500 text-gray-900 font-semibold px-7 py-3 rounded-md shadow hover:brightness-95 transition text-base md:text-lg blink-attention">Acessar projeto →</a>
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}

export default AllProjects


