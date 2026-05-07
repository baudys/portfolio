import { defineRouting } from 'next-intl/routing'
import { defaultLocale, locales } from './locales'

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: true,
  pathnames: {
    '/': '/',
    '/projects': {
      cs: '/projekty',
      en: '/projects',
      es: '/proyectos'
    },
    '/projects/[slug]': {
      cs: '/projekty/[slug]',
      en: '/projects/[slug]',
      es: '/proyectos/[slug]'
    },
    '/gallery': {
      cs: '/galerie',
      en: '/gallery',
      es: '/galeria'
    },
    '/contact': {
      cs: '/kontakt',
      en: '/contact',
      es: '/contacto'
    }
  }
})
