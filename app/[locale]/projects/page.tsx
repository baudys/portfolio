import { getTranslations } from 'next-intl/server'
import { Contact } from '@/components/contact'
import { Projects } from '@/components/projects/projects'

interface ProjectsPageProps {
  params: Promise<{ locale: string }>
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.projects' })

  return (
    <div className='space-y-20 lg:space-y-40'>
      <h1 className='sr-only'>{t('title')}</h1>

      <Projects />
      <Contact />
    </div>
  )
}
