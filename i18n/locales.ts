export const locales = ['cs', 'en', 'es'] as const

export type AppLocale = (typeof locales)[number]

export const defaultLocale: AppLocale = 'cs'

export const localeLanguageTag: Record<AppLocale, string> = {
  cs: 'cs-CZ',
  en: 'en-US',
  es: 'es-ES',
}

export const localeOpenGraph: Record<AppLocale, string> = {
  cs: 'cs_CZ',
  en: 'en_US',
  es: 'es_ES',
}

export const isAppLocale = (value: string): value is AppLocale => {
  return locales.includes(value as AppLocale)
}

export const resolveAppLocale = (value: string): AppLocale => {
  return isAppLocale(value) ? value : defaultLocale
}
