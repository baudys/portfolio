import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { JsonLd } from '@/components/seo/json-ld'
import { resolveAppLocale } from '@/i18n/locales'
import {
  buildAlternates,
  getLocalizedUrl,
  getOpenGraphLocale,
  SITE_NAME,
} from '@/lib/seo'
import { buildContactPointSchema } from '@/lib/structured-data'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { locale } = await params
  const appLocale = resolveAppLocale(locale)
  const t = await getTranslations({ locale: appLocale, namespace: 'meta.contact' })

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: getLocalizedUrl('/contact', appLocale),
      siteName: SITE_NAME,
      images: [
        {
          url: '/logo.webp',
          width: 1200,
          height: 630,
          alt: 'Daniel Anthony Baudyš Contact Page',
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
    alternates: buildAlternates('/contact', appLocale),
  }
}

export default async function ContactLayout({
  children,
  params,
}: LayoutProps) {
  const { locale } = await params
  const appLocale = resolveAppLocale(locale)
  const contactPointSchema = buildContactPointSchema(
    appLocale,
    getLocalizedUrl('/contact', appLocale),
  )

  return (
    <main className='mt-28 lg:mt-32'>
      <JsonLd data={contactPointSchema} />
      {children}
    </main>
  )
}
