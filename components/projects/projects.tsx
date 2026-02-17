import { projectCards } from '@/lib/project-cards'
import { Container } from '../container'
import { Project } from '../project'

export const Projects = () => {
  return (
    <Container className='grid gap-x-20 gap-y-40 sm:grid-cols-2'>
      {projectCards.map((project) => (
        <Project key={project.slug} project={project} />
      ))}
    </Container>
  )
}
