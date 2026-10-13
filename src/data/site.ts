export const SITE = {
  brand: 'NicoDev',
  name: 'Nicolas',
  github: 'https://github.com/NicoDevGod',
  linkedin: 'https://www.linkedin.com/in/nicolas-angel-b140b92a6/',
  cv: 'https://drive.google.com/file/d/1slV72I8ys4wKNg32SVFVX42Y984wO7Wn/view?usp=drive_link',
  // Previous (web development) portfolio -- swap for its live URL once known.
  oldPortfolio: 'https://github.com/NicoDevGod/porfolioAstro',
  deck: 'downloads/seis-proyectos-de-ia.pptx',
  deckRepo: 'https://github.com/NicoDevGod/study-deck',
} as const;

export const LOCALES = ['es', 'en'] as const;
export type Lang = (typeof LOCALES)[number];
export type L = Record<Lang, string>;
