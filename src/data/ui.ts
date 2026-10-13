import type { Lang } from './site';

type Dict = {
  meta: { title: string; description: string };
  nav: { projects: string; lessons: string; deck: string; about: string; contact: string; menu: string };
  langSwitch: { label: string; to: string };
  hero: {
    kicker: string;
    titleA: string;
    titleB: string;
    sub: string;
    ctaProjects: string;
    ctaLessons: string;
    stats: { value: string; label: string }[];
  };
  projects: { title: string; intro: string; open: string; live: string; soon: string };
  lessons: { title: string; intro: string; seeAll: string; seenIn: string; pageTitle: string; pageIntro: string };
  deck: { title: string; intro: string; download: string; repo: string; meta: string };
  about: { title: string; p1: string; p2: string; p3: string };
  contact: {
    title: string;
    intro: string;
    name: string;
    email: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    error: string;
    missingKey: string;
  };
  project: {
    back: string;
    problem: string;
    solution: string;
    how: string;
    numbers: string;
    story: string;
    stack: string;
    lessons: string;
    repo: string;
    docs: string;
    prev: string;
    next: string;
    demoTitle: string;
  };
  demo: {
    note: string;
    launch: string;
    waking: string;
    wakingHint: string;
    slow: string;
    live: string;
    ready: string;
    reload: string;
    openNew: string;
    none: string;
    seconds: string;
  };
  footer: { oldPortfolio: string; oldLink: string; rights: string };
};

export const UI: Record<Lang, Dict> = {
  es: {
    meta: {
      title: 'NicoDev · Proyectos de IA y Python, de cero a producción',
      description:
        'Seis proyectos de IA en Python desplegados y documentados: RAG, visión por computador, agentes, recomendación y fine-tuning con LoRA. Con los bugs incluidos.',
    },
    nav: { projects: 'Proyectos', lessons: 'Lecciones', deck: 'Study deck', about: 'Sobre mí', contact: 'Contacto', menu: 'Menú' },
    langSwitch: { label: 'Idioma', to: 'Cambiar a inglés' },
    hero: {
      kicker: 'IA · Python · MLOps ligero',
      titleA: 'Seis proyectos de IA, de cero a producción.',
      titleB: 'Con los bugs incluidos.',
      sub: 'Soy Nicolas. Construyo proyectos de IA en Python, los despliego en servidores gratuitos con 512MB de RAM y documento lo que salió mal: números reales, causas raíz y lo que aprendí.',
      ctaProjects: 'Ver proyectos',
      ctaLessons: 'Leer las lecciones',
      stats: [
        { value: '6', label: 'proyectos en producción' },
        { value: '490→240MB', label: 'RAM tras eliminar torch' },
        { value: '0.98%', label: 'de pesos entrenados con LoRA' },
        { value: '54', label: 'diapositivas de estudio' },
      ],
    },
    projects: {
      title: 'Proyectos',
      intro:
        'Cada uno recorre el mismo ciclo: construir, probar, documentar cómo funciona por dentro, desplegar y verificar contra el servidor real.',
      open: 'Ver caso de estudio',
      live: 'Demo en vivo',
      soon: 'Demo próximamente',
    },
    lessons: {
      title: 'Lo que se repite entre proyectos',
      intro: 'Ocho lecciones que aparecieron una y otra vez, con el proyecto que las enseñó.',
      seeAll: 'Ver las 8 lecciones',
      seenIn: 'Visto en',
      pageTitle: 'Lecciones transversales',
      pageIntro:
        'Lo que no aparece en ningún tutorial: lo que pasa cuando un proyecto de IA sale del notebook y se encuentra con 512MB de RAM, un free tier que duerme y un entorno distinto al tuyo.',
    },
    deck: {
      title: 'Study deck',
      intro:
        'Una presentación de 54 diapositivas para estudiar los seis proyectos en profundidad: arquitectura, conceptos explicados desde cero, bugs reales y cómo se resolvieron.',
      download: 'Descargar PPTX',
      repo: 'Ver el repo',
      meta: '54 diapositivas · español',
    },
    about: {
      title: 'Sobre mí',
      p1: 'Soy Nicolas, programador. Vengo del desarrollo web y estoy construyendo un portafolio de IA en Python para entender los sistemas de punta a punta, no solo los notebooks.',
      p2: 'Me interesa lo que ocurre después del entrenamiento: que el modelo quepa en el servidor, que se pueda probar de verdad y que quien lo lea entienda por qué se tomó cada decisión.',
      p3: 'Este sitio es la versión enfocada en IA. Si buscas mi trabajo en desarrollo web, está en mi portafolio anterior.',
    },
    contact: {
      title: 'Contacto',
      intro: '¿Un proyecto en mente o solo quieres saludar? Escríbeme y te respondo lo antes posible.',
      name: 'Nombre',
      email: 'Correo',
      message: 'Mensaje',
      send: 'Enviar mensaje',
      sending: 'Enviando...',
      success: '¡Gracias! Tu mensaje fue enviado, te responderé pronto.',
      error: 'Algo salió mal. Intenta de nuevo o escríbeme por LinkedIn.',
      missingKey: 'El formulario aún no está configurado.',
    },
    project: {
      back: 'Todos los proyectos',
      problem: 'El problema',
      solution: 'La solución',
      how: 'Cómo funciona',
      numbers: 'Números clave',
      story: 'La historia de depuración',
      stack: 'Stack',
      lessons: 'Lecciones que dejó',
      repo: 'Código en GitHub',
      docs: 'Cómo funciona (docs)',
      prev: 'Anterior',
      next: 'Siguiente',
      demoTitle: 'Pruébalo tú mismo',
    },
    demo: {
      note: 'Corre en el plan gratuito de Render, que duerme tras unos minutos sin uso.',
      launch: 'Lanzar demo',
      waking: 'Despertando el servidor…',
      wakingHint: 'Puede tardar hasta un minuto en frío.',
      slow: 'Sigue despertando, un poco más…',
      live: 'En vivo',
      ready: 'Servidor listo',
      reload: 'Recargar',
      openNew: 'Abrir en pestaña nueva',
      none: 'La demo de este proyecto aún no está enlazada. Mientras tanto, el código y la documentación están en GitHub.',
      seconds: 's',
    },
    footer: {
      oldPortfolio: '¿Buscas mi trabajo en desarrollo web?',
      oldLink: 'Portafolio anterior',
      rights: 'Todos los derechos reservados.',
    },
  },
  en: {
    meta: {
      title: 'NicoDev · AI & Python projects, from zero to production',
      description:
        'Six deployed and documented Python AI projects: RAG, computer vision, agents, recommendation and LoRA fine-tuning. Bugs included.',
    },
    nav: { projects: 'Projects', lessons: 'Lessons', deck: 'Study deck', about: 'About', contact: 'Contact', menu: 'Menu' },
    langSwitch: { label: 'Language', to: 'Switch to Spanish' },
    hero: {
      kicker: 'AI · Python · lightweight MLOps',
      titleA: 'Six AI projects, from zero to production.',
      titleB: 'Bugs included.',
      sub: 'I’m Nicolas. I build AI projects in Python, deploy them on free servers with 512MB of RAM and document what went wrong: real numbers, root causes and what I learned.',
      ctaProjects: 'See projects',
      ctaLessons: 'Read the lessons',
      stats: [
        { value: '6', label: 'projects in production' },
        { value: '490→240MB', label: 'RAM after dropping torch' },
        { value: '0.98%', label: 'of weights trained with LoRA' },
        { value: '54', label: 'study slides' },
      ],
    },
    projects: {
      title: 'Projects',
      intro:
        'Each one follows the same loop: build, test, document how it works inside, deploy and verify against the real server.',
      open: 'Read the case study',
      live: 'Live demo',
      soon: 'Demo coming soon',
    },
    lessons: {
      title: 'What repeats across projects',
      intro: 'Eight lessons that kept showing up, with the project that taught each one.',
      seeAll: 'See all 8 lessons',
      seenIn: 'Seen in',
      pageTitle: 'Cross-cutting lessons',
      pageIntro:
        'What no tutorial shows: what happens when an AI project leaves the notebook and meets 512MB of RAM, a free tier that sleeps and an environment different from yours.',
    },
    deck: {
      title: 'Study deck',
      intro:
        'A 54-slide presentation for studying the six projects in depth: architecture, concepts explained from scratch, real bugs and how they were solved.',
      download: 'Download PPTX',
      repo: 'View the repo',
      meta: '54 slides · Spanish',
    },
    about: {
      title: 'About me',
      p1: 'I’m Nicolas, a programmer. I come from web development and I’m building a Python AI portfolio to understand systems end to end, not just notebooks.',
      p2: 'I care about what happens after training: the model fitting on the server, being genuinely testable, and anyone reading about it understanding why each decision was made.',
      p3: 'This site is the AI-focused version. If you’re looking for my web development work, it lives in my previous portfolio.',
    },
    contact: {
      title: 'Contact',
      intro: 'Have a project in mind or just want to say hi? Send me a message and I’ll get back to you soon.',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send message',
      sending: 'Sending...',
      success: 'Thanks! Your message has been sent, I’ll reply soon.',
      error: 'Something went wrong. Please try again or reach me on LinkedIn.',
      missingKey: 'The form is not configured yet.',
    },
    project: {
      back: 'All projects',
      problem: 'The problem',
      solution: 'The solution',
      how: 'How it works',
      numbers: 'Key numbers',
      story: 'The debugging story',
      stack: 'Stack',
      lessons: 'Lessons it left',
      repo: 'Code on GitHub',
      docs: 'How it works (docs)',
      prev: 'Previous',
      next: 'Next',
      demoTitle: 'Try it yourself',
    },
    demo: {
      note: 'Runs on Render’s free plan, which sleeps after a few idle minutes.',
      launch: 'Launch demo',
      waking: 'Waking the server up…',
      wakingHint: 'A cold start can take up to a minute.',
      slow: 'Still waking up, a bit longer…',
      live: 'Live',
      ready: 'Server ready',
      reload: 'Reload',
      openNew: 'Open in new tab',
      none: 'This project’s demo isn’t linked yet. Meanwhile the code and docs are on GitHub.',
      seconds: 's',
    },
    footer: {
      oldPortfolio: 'Looking for my web development work?',
      oldLink: 'Previous portfolio',
      rights: 'All rights reserved.',
    },
  },
};
