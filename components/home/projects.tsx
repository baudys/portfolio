import { getTranslations } from 'next-intl/server'
import { featuredProjectCards } from '@/lib/project-cards'
import { Container } from '../container'
import { Project } from '../project'
import { SeeAll } from '../see-all'
import { Title } from '../title'

interface HomeProjectsProps {
  locale: string
}

export const Projects = async ({ locale }: HomeProjectsProps) => {
  const t = await getTranslations({ locale, namespace: 'home' })

  return (
    <Container>
      <Title label={t('projectsTitle')} />

      <div className='grid gap-20 sm:grid-cols-2'>
        {featuredProjectCards.map((project) => (
          <Project key={project.slug} project={project} />
        ))}
      </div>

      <div className='mt-4 flex justify-end'>
        <SeeAll href='/projects' />
      </div>
    </Container>
  )
}
