import 'server-only'

import { projects } from '@/database/projects'
import type { ProjectCard } from '@/types/project'

const toProjectCard = ({
  name,
  slug,
  year,
  mockup,
  badgesCs,
  badgesEn,
  badgesEs,
  creditsCs,
  creditsEn,
  creditsEs,
}: (typeof projects)[number]): ProjectCard => ({
  name,
  slug,
  year,
  mockup,
  badgesCs,
  badgesEn,
  badgesEs,
  creditsCs,
  creditsEn,
  creditsEs,
})

export const projectCards: ProjectCard[] = projects.map(toProjectCard)
export const featuredProjectCards: ProjectCard[] = projectCards.slice(0, 2)
