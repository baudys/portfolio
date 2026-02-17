import { notFound } from 'next/navigation'
import { Contact } from '@/components/contact'
import { ProjectDetail } from '@/components/projects/project-detail'
import { getProjectBySlug } from '@/lib/projects'

interface PageProps {
  params: Promise<{ slug: string }>
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
