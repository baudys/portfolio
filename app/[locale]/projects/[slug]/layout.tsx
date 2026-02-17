import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getProjectBySlug, getLocalizedText } from '@/lib/projects'
import {
  resolveAppLocale,
  type AppLocale,
} from '@/i18n/locales'
import {
  buildAlternates,
  getLocalizedUrl,
  getOpenGraphLocale,
  SITE_NAME,
} from '@/lib/seo'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { locale, slug } = await params
  const appLocale: AppLocale = resolveAppLocale(locale)

  const t = await getTranslations({ locale: appLocale, namespace: 'meta.project' })
  const project = getProjectBySlug(slug)

  if (!project) {
    return {
      title: t('notFoundTitle'),
      description: t('notFoundDescription'),
      alternates: buildAlternates('/projects', appLocale),
    }
  }

  const description = getLocalizedText(
    {
      cs: project.descriptionCs,
      en: project.descriptionEn,
      es: project.descriptionEs,
    },
    appLocale,
  )

  return {
    title: `${project.name} | ${SITE_NAME}`,
    description,
    keywords: [
      project.name,
      'Web Development',
      'Project',
      'Portfolio',
      'React',
      'Next.js',
      'Fullstack Development',
      'Web Application',
      ...project.technologies,
    ],
    openGraph: {
      title: `${project.name} | ${SITE_NAME}`,
      description,
      url: getLocalizedUrl(
        { pathname: '/projects/[slug]', params: { slug } },
        appLocale,
      ),
      siteName: SITE_NAME,
      images: [
        {
          url: project.images[0] ?? '/logo.webp',
          width: 1200,
          height: 630,
          alt: `${project.name} Project Screenshot`,
        },
      ],
      locale: getOpenGraphLocale(appLocale),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.name} | ${SITE_NAME}`,
      description,
      images: [project.images[0] ?? '/logo.webp'],
    },
    alternates: buildAlternates(
      { pathname: '/projects/[slug]', params: { slug } },
      appLocale,
    ),
  }
}

export default function ProjectLayout({ children }: LayoutProps) {
  return children
}
