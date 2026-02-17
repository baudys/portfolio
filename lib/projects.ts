import { projects } from '@/database/projects'
import type { Project } from '@/types/project'
export {
  getLocalizedCredits,
  getLocalizedList,
  getLocalizedText,
} from '@/lib/projects-localization'

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((project) => project.slug === slug)
}
