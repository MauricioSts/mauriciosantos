export const en = {
  // Header / navigation
  nav: {
    overview: 'Overview',
    projects: 'Projects',
    stack: 'Stack',
    experience: 'Experience',
    contact: 'Contact',
    menu: 'Menu',
    close: 'Close'
  },

  // Hero + MacBook screen
  hero: {
    kick: 'Portfolio',
    role: 'Full-stack Developer.',
    ctaProjects: 'See projects',
    ctaTalk: 'Get in touch',
    scrollCue: 'Scroll down',
    scrollHint: 'Scroll to open',
    url: 'mauriciosts.com/about',
    aboutNav: 'About me',
    aboutTitle: 'I study, I run a business and I write code every day.',
    aboutP1: 'Student of <b>Systems for Internet</b> at IFRN and <b>Software Engineering</b> at Estácio. <b>Full-stack</b> developer: I solve the problem from the interface to the database.',
    aboutP2: 'Entrepreneur: I run the <b>PFCsports</b> store and I built the system it uses every day.',
    footNote: 'Systems for Internet at IFRN · Software Engineering at Estácio · Owner of PFCsports',
    stats: {
      projects: 'projects live',
      years: 'years coding',
      degrees: 'degrees'
    }
  },

  // Latest release
  latest: {
    chapter: 'Latest release',
    title: 'PatchMap is live',
    dim: 'and running in the field.',
    cta: 'See the project'
  },

  // Projects
  portfolio: {
    title: 'Start with the highlights.',
    prev: 'Previous',
    next: 'Next'
  },

  projects: {
    patchMap: {
      type: 'Mobile app',
      role: 'Full-stack',
      head: 'The patch panel spreadsheet, now in your pocket.',
      problem: 'At SETHAS, tracing a cable meant opening an outdated spreadsheet and checking the rack port by port, by eye. When a point went down, nobody could say right away which patch panel, switch and VLAN it belonged to.',
      solution: 'I built PatchMap, an Android app for the infrastructure team to map the network in the field. It shows the whole rack on screen, each port colored by sector and status, and keeps the full path of every connection, from the wall socket to the VLAN. It works offline with a sync queue, and the Django back-end serves the data to every device on the team, authenticated with JWT.',
      description: 'Maps the path from wall socket to VLAN, works offline and syncs with the rest of the team.'
    },
    bridgeAndBits: {
      type: 'Dashboard',
      role: 'Full-stack',
      head: 'One panel to manage every provider.',
      problem: "My friend's consultancy had difficulty managing multiple internet providers and generating monthly reports for them efficiently.",
      solution: 'Complete dashboard for managing multiple internet providers, with registration, consultation, compliance status tracking, KPIs and automated monthly report generation.',
      description: 'Registration, compliance status, KPIs and monthly reports that write themselves.'
    },
    jerseyAndBits: {
      type: 'Management system',
      role: 'Own product',
      head: 'The system I built for my own store.',
      problem: 'As the owner of a sports jersey store, I faced challenges managing multiple orders and customers through WhatsApp, in addition to not having clear visibility on monthly gross profit and sales history.',
      solution: 'I developed this complete management system to meet my own needs as an entrepreneur. The platform offers complete control of orders, customer registration and history, financial management with automatic monthly gross profit calculation. After solving my problems, I made it available for free to other entrepreneurs in the sector.',
      description: "Orders, customers and PFCsports' monthly gross profit in one place, now open to other store owners."
    },
    salvianoBurguer: {
      type: 'Website + integration',
      role: 'Front-end',
      head: 'From the menu to WhatsApp, without typing a word.',
      problem: 'The Salviano Burguer restaurant needed a digital presence to display their menu and make it easier for customers to place orders quickly and conveniently.',
      solution: 'I developed a website for the restaurant with an interactive digital menu and WhatsApp API integration, allowing customers to place orders directly from their phones. My first freelance project.',
      description: 'Responsive digital menu that builds the order and sends it straight through the WhatsApp API.'
    },
    chovinista: {
      type: 'Finance app',
      role: 'Front-end',
      head: 'Fixed income tracked without a spreadsheet.',
      problem: 'My girlfriend needed to manage and track her monthly fixed income in an organized way, recording received values and viewing financial history to have control over income.',
      solution: 'Personal financial management system for controlling and viewing fixed income, allowing notes and monthly income tracking.',
      description: 'Received amounts, notes and the fixed income history month by month.'
    },
    comidasDaCopa: {
      type: 'Game',
      role: 'Personal project',
      head: 'A live cooking game for two.',
      problem: 'I wanted to create a fun and interactive experience for me and my girlfriend to cook together, but nothing existed that combined the World Cup 2026 atmosphere with a live-synchronized culinary challenge between two phones.',
      solution: "I built Comidas da Copa: a couple's game where the app draws a World Cup country, each person writes a typical dish in 7 minutes (you can see your partner typing live), then it randomly picks which dish to cook, and you send a photo of the result. Features live-synced duo mode and solo mode.",
      description: 'It draws a World Cup country, each player proposes a dish in 7 min and the app picks which one goes in the pan.'
    }
  },

  // Stack
  stack: {
    chapter: 'Stack',
    title: 'React. TypeScript. React Native.',
    dim: 'A tool is a means, not an identity.',
    lede: 'Everything here got in for a concrete reason: it solved a problem in a real project, and stayed because it kept solving it.',
    usageTitle: 'Where I use it most',
    usageNote: 'Weighted by real use: what carries my work today, not a raw repository count.',
    core: {
      react: '3 projects · freelance',
      reactNative: '2 apps on Google Play',
      django: 'PatchMap · SETHAS internship',
      typescript: '2 projects · internship',
      postgres: '2 projects · freelance'
    },
    groups: {
      web: 'Web',
      mobile: 'Mobile',
      backend: 'Back-end & DevOps',
      database: 'Database'
    }
  },

  // Experience
  experience: {
    chapter: 'Experience',
    title: 'Scholarships, internships',
    dim: 'and code in production.',
    lede: 'Tap each one to see what I actually did there.',
    mainStack: 'main stack',
    eduTitle: 'Education',
    kinds: {
      internship: 'Internship',
      scholarship: 'Volunteer scholarship',
      freelance: 'Freelance'
    },
    sethas: {
      role: 'Full-stack Mobile Developer',
      place: 'Natal, RN',
      sum: 'I develop and maintain the Programa Leite Potiguar app, published on the Google Play Store.',
      responsibilities: [
        'Development and maintenance of the Programa Leite Potiguar app using React Native',
        'Web interface development with React.js',
        'Improved app efficiency, significantly increasing its speed and performance',
        'Publishing and maintaining the app on the Google Play Store'
      ]
    },
    ifrnFlutter: {
      role: 'Flutter Developer',
      place: 'Natal, RN',
      sum: "Scholarship holder on IFRN's Flutter project: software to support and manage field agent actions.",
      responsibilities: [
        'Volunteer scholarship holder in the Flutter app development project',
        'Creating software to support and manage field agent actions',
        'Developing responsive and functional interfaces',
        'Collaboration in a multidisciplinary team'
      ]
    },
    inspireLogic: {
      role: 'Freelancer',
      place: '',
      sum: 'Student and teacher management website, with digital turnstiles and facial recognition.',
      responsibilities: [
        'Development of the student and teacher management website',
        'Improving school security',
        'Digital turnstile integration',
        'Implementation of facial recognition system (Face ID) for access control'
      ]
    },
    ifrnAR: {
      role: 'Augmented Reality App Developer',
      place: 'Natal, RN',
      sum: "Scholarship holder on IFRN's augmented reality project, uniting biology and technology.",
      responsibilities: [
        'Volunteer scholarship holder in the AR app development project',
        'Uniting biology and technology through augmented reality',
        'Creating immersive educational experiences',
        'Developing interactive 3D interfaces'
      ]
    },
    secretaria: {
      role: 'Intern',
      place: 'Natal, RN',
      sum: 'IT support and network/computer maintenance inside the department.',
      responsibilities: [
        'IT support for employees',
        'Network and computer maintenance',
        'Technical problem resolution',
        'In-person and remote support'
      ]
    }
  },

  education: {
    ifrn: { course: 'Technology in Systems for Internet', school: 'IFRN', when: '2023 to present', status: 'IN PROGRESS' },
    estacio: { course: "Bachelor's in Software Engineering", school: 'Estácio', when: 'Ongoing', status: 'IN PROGRESS' }
  },

  // Contact
  contact: {
    chapter: 'Contact',
    title: 'The best time to talk',
    dim: 'is now.',
    lede: "I'm open to opportunities, freelance work and partnerships. Send me a message and I'll reply.",
    send: 'Send e-mail',
    copy: 'Copy e-mail',
    copied: 'E-mail copied ✓',
    labels: { github: 'GitHub', linkedin: 'LinkedIn', store: 'Store', email: 'E-mail' }
  },

  // Project detail
  detail: {
    project: 'Project',
    problem: 'The problem',
    solution: 'The solution',
    year: 'Year',
    role: 'Role',
    stack: 'Stack',
    access: 'Access project',
    others: 'See other projects',
    soon: 'Private project',
    prev: '← Previous',
    next: 'Next →',
    back: 'Projects'
  },

  // Footer
  footer: {
    note: 'Personal portfolio built with React. The projects shown were built by me, individually or on client demand.',
    rights: 'All rights reserved.',
    place: 'Natal, RN · Brazil'
  }
}
