export const pt = {
  // Header / navegação
  nav: {
    overview: 'Visão geral',
    projects: 'Projetos',
    stack: 'Stack',
    experience: 'Experiência',
    contact: 'Contato',
    menu: 'Menu',
    close: 'Fechar'
  },

  // Hero + tela do MacBook
  hero: {
    kick: 'Portfólio',
    role: 'Desenvolvedor Full-stack.',
    ctaProjects: 'Ver projetos',
    ctaTalk: 'Falar comigo',
    scrollHint: 'Role para abrir',
    url: 'mauriciosts.com/sobre',
    aboutNav: 'Sobre mim',
    aboutTitle: 'Estudo, empreendo e escrevo código todo dia.',
    aboutP1: 'Estudante de <b>Sistemas para Internet</b> no IFRN e de <b>Engenharia de Software</b> na Estácio. Desenvolvedor <b>Full-stack</b>: resolvo o problema da interface ao banco.',
    aboutP2: 'Empreendedor: toco a loja <b>PFCsports</b> e programei o sistema que ela usa todo dia.',
    footNote: 'Sistemas para Internet no IFRN · Engenharia de Software na Estácio · Dono da PFCsports',
    stats: {
      projects: 'projetos no ar',
      years: 'anos codando',
      degrees: 'graduações'
    }
  },

  // Último lançamento
  latest: {
    chapter: 'Último lançamento',
    title: 'PatchMap está no ar',
    dim: 'e rodando em campo.',
    cta: 'Ver o projeto'
  },

  // Projetos
  portfolio: {
    title: 'Comece pelos destaques.',
    prev: 'Anterior',
    next: 'Próximo'
  },

  projects: {
    patchMap: {
      type: 'App mobile',
      role: 'Full-stack',
      head: 'A planilha do patch panel, agora no bolso.',
      problem: 'Na SETHAS, rastrear um cabo significava abrir uma planilha desatualizada e conferir o rack porta por porta, no olho. Quando um ponto caía, ninguém sabia dizer de imediato em qual patch panel, switch e VLAN ele estava.',
      solution: 'Desenvolvi o PatchMap, app Android para a equipe de infraestrutura mapear a rede em campo. Ele mostra o rack inteiro na tela, com cada porta colorida por setor e por status, e guarda o caminho completo de cada conexão, da tomada na parede até a VLAN. Funciona offline com fila de sincronização, e o back-end em Django serve os dados autenticados por JWT para todos os aparelhos da equipe.',
      description: 'Mapeia o caminho da tomada até a VLAN, funciona offline e sincroniza com o resto da equipe.'
    },
    bridgeAndBits: {
      type: 'Dashboard',
      role: 'Full-stack',
      head: 'Um painel só para gerenciar todos os provedores.',
      problem: 'A consultoria do meu amigo tinha dificuldade em gerenciar múltiplos provedores de internet e gerar relatórios mensais para eles de forma eficiente.',
      solution: 'Dashboard completo para gerenciamento de múltiplos provedores de internet, com cadastro, consulta, acompanhamento de status de conformidade, KPIs e geração automatizada de relatórios mensais.',
      description: 'Cadastro, status de conformidade, KPIs e relatórios mensais gerados sozinhos.'
    },
    jerseyAndBits: {
      type: 'Sistema de gestão',
      role: 'Produto próprio',
      head: 'O sistema que eu criei para a minha própria loja.',
      problem: 'Como dono de uma loja de camisas de time, eu enfrentava desafios para gerenciar múltiplos pedidos e clientes através do WhatsApp, além de não ter visibilidade clara sobre o lucro bruto mensal e o histórico de vendas.',
      solution: 'Desenvolvi este sistema completo de gestão para suprir minhas próprias necessidades como empreendedor. A plataforma oferece controle total de pedidos, cadastro e histórico de clientes, gestão financeira com cálculo automático de lucro bruto mensal. Após resolver meus problemas, disponibilizei gratuitamente para outros empreendedores do setor.',
      description: 'Pedidos, clientes e lucro bruto mensal da PFCsports em um lugar só, hoje aberto para outros lojistas.'
    },
    salvianoBurguer: {
      type: 'Site + integração',
      role: 'Front-end',
      head: 'Do cardápio ao WhatsApp, sem digitar nada.',
      problem: 'A hamburgueria Salviano Burguer precisava de uma presença digital para exibir seu cardápio e facilitar os pedidos dos clientes de forma rápida e prática.',
      solution: 'Desenvolvi um site para a hamburgueria com cardápio digital interativo e integração com a API do WhatsApp, permitindo que os clientes façam pedidos diretamente pelo celular. Meu primeiro trabalho como freelancer.',
      description: 'Cardápio digital responsivo que monta o pedido e envia direto pela API do WhatsApp.'
    },
    chovinista: {
      type: 'App financeiro',
      role: 'Front-end',
      head: 'Renda fixa acompanhada sem planilha.',
      problem: 'Minha namorada precisava gerenciar e acompanhar o rendimento fixo mensal dela de forma organizada, registrando valores recebidos e visualizando o histórico financeiro para ter controle sobre a renda.',
      solution: 'Sistema de gestão financeira pessoal para controle e visualização de rendimento fixo, permitindo anotações e acompanhamento da renda mensal.',
      description: 'Registro de valores recebidos, anotações e histórico do rendimento fixo mês a mês.'
    },
    comidasDaCopa: {
      type: 'Jogo',
      role: 'Projeto pessoal',
      head: 'Um jogo de cozinha para dois, ao vivo.',
      problem: 'Queria criar uma experiência divertida e interativa para mim e minha namorada cozinharmos juntos, mas não havia nada que unisse o clima da Copa do Mundo 2026 com um desafio culinário sincronizado ao vivo entre dois celulares.',
      solution: 'Desenvolvi o Comidas da Copa: um jogo para casal onde o app sorteia um país da Copa, cada um escreve um prato típico em 7 minutos (dá pra ver a dupla digitando ao vivo), depois sorteia qual prato cozinhar e vocês enviam a foto do resultado. Tem modo dupla sincronizado e modo solo.',
      description: 'Sorteia um país da Copa, cada um propõe um prato em 7 min e o app escolhe qual vai para a panela.'
    }
  },

  // Stack
  stack: {
    chapter: 'Stack',
    title: 'React. TypeScript. React Native.',
    dim: 'Ferramenta é meio, não identidade.',
    lede: 'Cada item aqui entrou por um motivo concreto: resolveu um problema em um projeto de verdade, e ficou porque continuou resolvendo.',
    usageTitle: 'Onde eu mais uso',
    usageNote: 'Contagem sobre os seis projetos publicados neste portfólio.',
    projectOne: 'projeto',
    projectMany: 'projetos',
    groups: {
      web: 'Web',
      mobile: 'Mobile',
      backend: 'Back-end & DevOps',
      database: 'Banco de dados'
    }
  },

  // Experiência
  experience: {
    chapter: 'Experiência',
    title: 'Bolsas, estágios',
    dim: 'e código em produção.',
    lede: 'Toque em cada uma para ver o que eu realmente fiz ali.',
    mainStack: 'stack principal',
    eduTitle: 'Formação',
    kinds: {
      internship: 'Estágio',
      scholarship: 'Bolsa voluntária',
      freelance: 'Freelance'
    },
    sethas: {
      role: 'Desenvolvedor Mobile Full-stack',
      place: 'Natal, RN',
      sum: 'Desenvolvo e mantenho o app Programa Leite Potiguar, publicado na Google Play Store.',
      responsibilities: [
        'Desenvolvimento e manutenção do aplicativo Programa Leite Potiguar utilizando React Native',
        'Melhoria da eficiência do aplicativo, aumentando significativamente sua velocidade e performance',
        'Publicação e manutenção do aplicativo na Google Play Store'
      ]
    },
    ifrnFlutter: {
      role: 'Flutter Developer',
      place: 'Natal, RN',
      sum: 'Bolsista no projeto Flutter do IFRN: software para apoiar e gerenciar as ações dos agentes de campo.',
      responsibilities: [
        'Bolsista voluntário no projeto de desenvolvimento de aplicativos em Flutter',
        'Criação de software para apoiar e gerenciar as ações dos agentes de campo',
        'Desenvolvimento de interfaces responsivas e funcionais',
        'Colaboração em equipe multidisciplinar'
      ]
    },
    inspireLogic: {
      role: 'Freelancer',
      place: '',
      sum: 'Site de gestão de alunos e professores, com catracas digitais e reconhecimento facial.',
      responsibilities: [
        'Desenvolvimento do site de gerenciamento de alunos e professores',
        'Aprimoramento da segurança escolar',
        'Integração de catracas digitais',
        'Implementação de sistema de reconhecimento facial (Face ID) para controle de acesso'
      ]
    },
    ifrnAR: {
      role: 'Desenvolvedor de Aplicativos em Realidade Aumentada',
      place: 'Natal, RN',
      sum: 'Bolsista no projeto de realidade aumentada do IFRN, unindo biologia e tecnologia.',
      responsibilities: [
        'Bolsista voluntário no projeto de desenvolvimento de aplicativos em AR',
        'União de biologia e tecnologia através de realidade aumentada',
        'Criação de experiências imersivas educacionais',
        'Desenvolvimento de interfaces 3D interativas'
      ]
    },
    secretaria: {
      role: 'Estagiário',
      place: 'Natal, RN',
      sum: 'Suporte de TI e manutenção de redes e computadores dentro da secretaria.',
      responsibilities: [
        'Suporte de TI para funcionários',
        'Manutenção de redes e computadores',
        'Resolução de problemas técnicos',
        'Atendimento presencial e remoto'
      ]
    }
  },

  education: {
    ifrn: { course: 'Tecnologia em Sistemas para Internet', school: 'IFRN', when: '2023 até hoje', status: 'EM ANDAMENTO' },
    estacio: { course: 'Bacharelado em Engenharia de Software', school: 'Estácio', when: 'Cursando', status: 'EM ANDAMENTO' }
  },

  // Contato
  contact: {
    chapter: 'Contato',
    title: 'A melhor hora de conversar',
    dim: 'é agora.',
    lede: 'Estou aberto a oportunidades, freelas e parcerias. Me manda uma mensagem que eu respondo.',
    send: 'Enviar e-mail',
    copy: 'Copiar e-mail',
    copied: 'E-mail copiado ✓',
    labels: { github: 'GitHub', linkedin: 'LinkedIn', store: 'Loja', email: 'E-mail' }
  },

  // Detalhe do projeto
  detail: {
    project: 'Projeto',
    problem: 'O problema',
    solution: 'A solução',
    year: 'Ano',
    role: 'Papel',
    stack: 'Stack',
    access: 'Acessar projeto',
    others: 'Ver outros projetos',
    soon: 'Projeto privado',
    prev: '← Anterior',
    next: 'Próximo →',
    back: 'Projetos'
  },

  // Rodapé
  footer: {
    note: 'Portfólio pessoal desenvolvido com React. Os projetos apresentados foram construídos por mim, individualmente ou sob demanda de clientes.',
    rights: 'Todos os direitos reservados.',
    place: 'Natal, RN · Brasil'
  }
}
