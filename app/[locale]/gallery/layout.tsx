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
  const t = await getTranslations({ locale: appLocale, namespace: 'meta.gallery' })

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: getLocalizedUrl('/gallery', appLocale),
      siteName: SITE_NAME,
      images: [
        {
          url: '/logo.webp',
          width: 1200,
          height: 630,
          alt: 'Daniel Anthony Baudyš Photography Gallery',
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
    alternates: buildAlternates('/gallery', appLocale),
  }
}

export default function GalleryLayout({ children }: LayoutProps) {
  return children
}
