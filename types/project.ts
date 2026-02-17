export interface ProjectCredits {
  label: string
  action: string
  href: string
}

export interface ProjectSeo {
  primaryKeyword: string
  secondaryKeywords: string[]
}

export interface Project {
  name: string
  slug: string
  url: string
  href: string
  year: number
  updatedAt: string
  descriptionEn: string
  descriptionCs: string
  descriptionEs?: string
  mockup: string
  iphone: string
  macbook: string
  featuresCs: string[]
  featuresEn: string[]
  featuresEs?: string[]
  badgesCs: string[]
  badgesEn: string[]
  badgesEs?: string[]
  technologies: string[]
  images: string[]
  seo?: ProjectSeo
  github?: string
  creditsCs?: ProjectCredits
  creditsEn?: ProjectCredits
  creditsEs?: ProjectCredits
}

export type ProjectCard = Pick<
  Project,
  | 'name'
  | 'slug'
  | 'year'
  | 'mockup'
  | 'badgesCs'
  | 'badgesEn'
  | 'badgesEs'
  | 'creditsCs'
  | 'creditsEn'
  | 'creditsEs'
>
