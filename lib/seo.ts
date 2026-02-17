import type { Metadata } from 'next'
import { getPathname } from '@/i18n/navigation'
import {
  defaultLocale,
  localeLanguageTag,
  localeOpenGraph,
  locales,
  type AppLocale,
} from '@/i18n/locales'

export const SITE_URL = 'https://baudys.dev'
export const SITE_NAME = 'Daniel Anthony Baudyš'

type StaticHref =
  | '/'
  | '/projects'
  | '/gallery'
  | '/contact'

type DynamicProjectHref = {
  pathname: '/projects/[slug]'
  params: { slug: string }
}

export type AppHref = StaticHref | DynamicProjectHref

const toAbsoluteUrl = (pathname: string): string => {
  return new URL(pathname, SITE_URL).toString()
}

export const getLocalizedUrl = (href: AppHref, locale: AppLocale): string => {
  return toAbsoluteUrl(getPathname({ href, locale }))
}

export const buildLanguageAlternates = (href: AppHref): Record<string, string> => {
  const languages = locales.reduce<Record<string, string>>((acc, item) => {
    acc[localeLanguageTag[item]] = getLocalizedUrl(href, item)
    return acc
  }, {})

  languages['x-default'] = getLocalizedUrl(href, defaultLocale)

  return languages
}

export const buildAlternates = (
  href: AppHref,
  locale: AppLocale,
): Metadata['alternates'] => {
  return {
    canonical: getLocalizedUrl(href, locale),
    languages: buildLanguageAlternates(href),
  }
}

export const getOpenGraphLocale = (locale: AppLocale): string => {
  return localeOpenGraph[locale]
}
