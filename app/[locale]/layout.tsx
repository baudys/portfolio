import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Footer } from '@/components/footer/footer'
import { Navbar } from '@/components/navbar/navbar'
import { JsonLd } from '@/components/seo/json-ld'
import { siteConfig } from '@/config/site'
import { resolveAppLocale } from '@/i18n/locales'
import { routing } from '@/i18n/routing'
import { getLocalizedUrl } from '@/lib/seo'
import { buildPersonSchema, buildWebSiteSchema } from '@/lib/structured-data'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/providers/theme-provider'
import { Analytics } from '@vercel/analytics/next'
import '../globals.css'

export const metadata: Metadata = {
  metadataBase: siteConfig.metadataBase,
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,
  formatDetection: siteConfig.formatDetection,
  verification: siteConfig.verification,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
  classification: 'Portfolio Website',
  referrer: 'origin-when-cross-origin',
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()
  const appLocale = resolveAppLocale(locale)
  const personSchema = buildPersonSchema()
  const webSiteSchema = buildWebSiteSchema(
    appLocale,
    getLocalizedUrl('/', appLocale),
  )

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn('overflow-x-hidden scroll-smooth antialiased')}>
        <JsonLd data={personSchema} />
        <JsonLd data={webSiteSchema} />
        <Analytics />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
