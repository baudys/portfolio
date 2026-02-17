import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { resolveAppLocale } from '@/i18n/locales'
import {
  buildAlternates,
  getLocalizedUrl,
  getOpenGraphLocale,
  SITE_NAME,
} from '@/lib/seo'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { locale } = await params
  const appLocale = resolveAppLocale(locale)
  const t = await getTranslations({ locale: appLocale, namespace: 'meta.projects' })

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: getLocalizedUrl('/projects', appLocale),
      siteName: SITE_NAME,
      images: [
        {
          url: '/logo.webp',
          width: 1200,
          height: 630,
          alt: 'Daniel Anthony Baudyš Projects Portfolio',
        },
      ],
      locale: getOpenGraphLocale(appLocale),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: ['/logo.webp'],
    },
    alternates: buildAlternates('/projects', appLocale),
  }
}

export default function ProjectsLayout({ children }: LayoutProps) {
  return <main className='mt-28 lg:mt-32'>{children}</main>
}
