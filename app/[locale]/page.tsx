import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Contact } from '@/components/contact'
import { Gallery } from '@/components/home/gallery'
import { Hero } from '@/components/home/hero'
import { Projects } from '@/components/home/projects'
import { resolveAppLocale } from '@/i18n/locales'
import {
  buildAlternates,
  getLocalizedUrl,
  getOpenGraphLocale,
  SITE_NAME,
} from '@/lib/seo'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const appLocale = resolveAppLocale(locale)
  const t = await getTranslations({ locale: appLocale, namespace: 'meta.home' })

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: getLocalizedUrl('/', appLocale),
      siteName: SITE_NAME,
      images: [
        {
          url: '/logo.webp',
          width: 1200,
          height: 630,
          alt: 'Daniel Anthony Baudyš Portfolio Homepage',
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
    alternates: buildAlternates('/', appLocale),
  }
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params

  return (
    <main className='mt-28 space-y-20 lg:mt-32 lg:space-y-40'>
      <Hero />
      <Projects locale={locale} />
      <Gallery locale={locale} />
      <Contact />
    </main>
  )
}
