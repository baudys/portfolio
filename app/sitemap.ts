import { MetadataRoute } from 'next'
import { projects } from '@/database/projects'
import { locales, type AppLocale } from '@/i18n/locales'
import type { AppHref } from '@/lib/seo'
import { buildLanguageAlternates, getLocalizedUrl } from '@/lib/seo'
import { serviceDefinitions } from '@/lib/services'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastProjectUpdate = projects.reduce<string>(
    (latest, project) => (project.updatedAt > latest ? project.updatedAt : latest),
    projects[0]?.updatedAt ?? '2026-01-01',
  )
  const staticLastModified = new Date(lastProjectUpdate)

  const staticHrefs: AppHref[] = [
    '/',
    '/projects',
    '/gallery',
    '/contact',
    ...serviceDefinitions.map((service) => service.href),
  ]

  const getPriority = (href: AppHref): number => {
    if (href === '/') return 1
    if (href === '/projects') return 0.9
    if (href === '/gallery') return 0.8
    if (href === '/contact') return 0.7

    return 0.85
  }

  const localizedStaticPages = locales.flatMap((locale) => {
    const typedLocale = locale as AppLocale

    return staticHrefs.map((href) => ({
      url: getLocalizedUrl(href, typedLocale),
      alternates: {
        languages: buildLanguageAlternates(href),
      },
      lastModified: staticLastModified,
      changeFrequency: href === '/contact' ? ('monthly' as const) : ('weekly' as const),
      priority: getPriority(href),
    }))
  })

  const localizedProjectPages = locales.flatMap((locale) => {
    const typedLocale = locale as AppLocale

    return projects.map((project) => ({
      url: getLocalizedUrl(
        { pathname: '/projects/[slug]', params: { slug: project.slug } },
        typedLocale,
      ),
      alternates: {
        languages: buildLanguageAlternates({
          pathname: '/projects/[slug]',
          params: { slug: project.slug },
        }),
      },
      lastModified: new Date(project.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  })

  return [...localizedStaticPages, ...localizedProjectPages]
}
