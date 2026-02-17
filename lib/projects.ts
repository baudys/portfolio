import { projects } from '@/database/projects'
import type { AppLocale } from '@/i18n/locales'
import type { Project, ProjectCredits } from '@/types/project'

interface LocalizedValue {
  cs: string
  en: string
  es?: string
}

interface LocalizedList {
  cs: string[]
  en: string[]
  es?: string[]
}

interface LocalizedCredits {
  cs?: ProjectCredits
  en?: ProjectCredits
  es?: ProjectCredits
}

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((project) => project.slug === slug)
}

export const getLocalizedText = (
  value: LocalizedValue,
  locale: AppLocale,
): string => {
  if (locale === 'cs') return value.cs
  if (locale === 'es') return value.es ?? value.en

  return value.en
}

export const getLocalizedList = (
  value: LocalizedList,
  locale: AppLocale,
): string[] => {
  if (locale === 'cs') return value.cs
  if (locale === 'es') return value.es ?? value.en

  return value.en
}

export const getLocalizedCredits = (
  value: LocalizedCredits,
  locale: AppLocale,
): ProjectCredits | undefined => {
  if (locale === 'cs') return value.cs
  if (locale === 'es') return value.es ?? value.en ?? value.cs

  return value.en ?? value.cs
}
