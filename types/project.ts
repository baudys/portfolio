export interface ProjectCredits {
  label: string
  action: string
  href: string
}

export interface Project {
  name: string
  slug: string
  url: string
  href: string
  year: number
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
  github?: string
  creditsCs?: ProjectCredits
  creditsEn?: ProjectCredits
  creditsEs?: ProjectCredits
}
