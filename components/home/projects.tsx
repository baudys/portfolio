'use client'

import { useTranslations } from 'next-intl'
import { projects } from '@/database/projects'
import { Container } from '../container'
import { Project } from '../project'
import { SeeAll } from '../see-all'
import { Title } from '../title'

export const Projects = () => {
  const t = useTranslations('home')

  return (
    <Container>
      <Title label={t('projectsTitle')} />

      <div className='grid gap-20 sm:grid-cols-2'>
        {projects.slice(0, 2).map((project) => (
          <Project key={project.slug} project={project} />
        ))}
      </div>

      <div className='mt-4 flex justify-end'>
        <SeeAll href='/projects' />
      </div>
    </Container>
  )
}
