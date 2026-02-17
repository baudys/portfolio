import { notFound } from 'next/navigation'
import { Contact } from '@/components/contact'
import { ProjectDetail } from '@/components/projects/project-detail'
import { projects } from '@/database/projects'
import { locales } from '@/i18n/locales'
import { getProjectBySlug } from '@/lib/projects'

export const dynamicParams = false

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projects.map((project) => ({
      locale,
      slug: project.slug,
    })),
  )
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params

  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <div>
      <ProjectDetail project={project} />
      <Contact />
    </div>
  )
}
