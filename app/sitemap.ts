import { MetadataRoute } from 'next'
import { projects } from '@/database/projects'
import { locales, type AppLocale } from '@/i18n/locales'
import { getLocalizedUrl } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date()

  const localizedStaticPages = locales.flatMap((locale) => {
    const typedLocale = locale as AppLocale

    return [
      {
        url: getLocalizedUrl('/', typedLocale),
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 1,
      },
      {
        url: getLocalizedUrl('/projects', typedLocale),
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      },
      {
        url: getLocalizedUrl('/gallery', typedLocale),
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: getLocalizedUrl('/contact', typedLocale),
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
    ]
  })

  const localizedProjectPages = locales.flatMap((locale) => {
    const typedLocale = locale as AppLocale

    return projects.map((project) => ({
      url: getLocalizedUrl(
        { pathname: '/projects/[slug]', params: { slug: project.slug } },
        typedLocale,
      ),
      lastModified: new Date(project.year, 0, 1),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  })

  return [...localizedStaticPages, ...localizedProjectPages]
}
