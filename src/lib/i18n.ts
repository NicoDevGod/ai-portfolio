import { LOCALES, type Lang } from '../data/site';
import { UI } from '../data/ui';

export const isLang = (value: string | undefined): value is Lang =>
  !!value && (LOCALES as readonly string[]).includes(value);

export const otherLang = (lang: Lang): Lang => (lang === 'es' ? 'en' : 'es');

const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Prefix a site-relative path with the deploy base (e.g. /ai-portfolio on GitHub Pages). */
export const withBase = (path = ''): string => `${BASE}/${path.replace(/^\/+/, '')}`;

/** Build an absolute site path for a locale, e.g. localePath('en', 'projects/rag-chatbot'). */
export const localePath = (lang: Lang, path = ''): string => {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return withBase(clean ? `${lang}/${clean}/` : `${lang}/`);
};

export const getUI = (lang: Lang) => UI[lang];

export const langStaticPaths = () => LOCALES.map((lang) => ({ params: { lang } }));
