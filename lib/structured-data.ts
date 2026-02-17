import type { AppLocale } from '@/i18n/locales'
import { type Project } from '@/types/project'
import { SITE_NAME, SITE_URL } from '@/lib/seo'

interface JsonLdBase {
  '@context': 'https://schema.org'
  '@type': string
}

interface PersonSchema extends JsonLdBase {
  '@type': 'Person'
  name: string
  url: string
  image: string
  jobTitle: string
  sameAs: string[]
  knowsAbout: string[]
}

interface WebSiteSchema extends JsonLdBase {
  '@type': 'WebSite'
  name: string
  url: string
  inLanguage: string
}

interface ContactPointSchema extends JsonLdBase {
  '@type': 'ContactPoint'
  contactType: string
  email: string
  telephone: string
  availableLanguage: string[]
  url: string
}

interface BreadcrumbItem {
  name: string
  item: string
}

interface BreadcrumbListSchema extends JsonLdBase {
  '@type': 'BreadcrumbList'
  itemListElement: Array<{
    '@type': 'ListItem'
    position: number
    name: string
    item: string
  }>
}

interface SoftwareSourceCodeSchema extends JsonLdBase {
  '@type': 'SoftwareSourceCode'
  name: string
  description: string
  url: string
  inLanguage: string
  creator: {
    '@type': 'Person'
    name: string
  }
  image: string
  keywords: string
  codeRepository?: string
}

interface CreativeWorkSchema extends JsonLdBase {
  '@type': 'CreativeWork'
  name: string
  description: string
  url: string
  inLanguage: string
  creator: {
    '@type': 'Person'
    name: string
  }
  image: string
  keywords: string
}

const localeLanguageByCode: Record<AppLocale, string> = {
  cs: 'cs-CZ',
  en: 'en-US',
  es: 'es-ES',
}

export const buildPersonSchema = (): PersonSchema => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/home/hero.webp`,
    jobTitle: 'Fullstack Developer',
    sameAs: [
      'https://www.linkedin.com/in/baudys/',
      'https://www.github.com/baudys/',
      'https://www.instagram.com/baudys.me/',
      'https://www.youtube.com/channel/UCblA_CnykG2Dw_6IMwZ9z9A',
    ],
    knowsAbout: [
      'Next.js',
      'TypeScript',
      'Technical SEO',
      'Web Development',
      'UI Engineering',
    ],
  }
}

export const buildWebSiteSchema = (
  locale: AppLocale,
  localizedHomeUrl: string,
): WebSiteSchema => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: localizedHomeUrl,
    inLanguage: localeLanguageByCode[locale],
  }
}

export const buildContactPointSchema = (
  locale: AppLocale,
  contactUrl: string,
): ContactPointSchema => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'daniel@baudys.dev',
    telephone: '+420777530096',
    availableLanguage: [localeLanguageByCode[locale]],
    url: contactUrl,
  }
}

export const buildBreadcrumbListSchema = (
  items: BreadcrumbItem[],
): BreadcrumbListSchema => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  }
}

export const buildProjectSchema = (
  project: Project,
  description: string,
  locale: AppLocale,
  projectUrl: string,
): SoftwareSourceCodeSchema | CreativeWorkSchema => {
  const base = {
    '@context': 'https://schema.org' as const,
    name: project.name,
    description,
    url: projectUrl,
    inLanguage: localeLanguageByCode[locale],
    creator: {
      '@type': 'Person' as const,
      name: SITE_NAME,
    },
    image: `${SITE_URL}${project.images[0] ?? '/logo.webp'}`,
    keywords: [
      project.seo?.primaryKeyword,
      ...(project.seo?.secondaryKeywords ?? []),
      ...project.technologies,
    ]
      .filter(Boolean)
      .join(', '),
  }

  if (project.github) {
    return {
      ...base,
      '@type': 'SoftwareSourceCode',
      codeRepository: project.github,
    }
  }

  return {
    ...base,
    '@type': 'CreativeWork',
  }
}
