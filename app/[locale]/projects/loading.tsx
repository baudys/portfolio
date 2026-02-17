import { Container } from '@/components/container'

const SKELETON_CARD_COUNT = 6

export default function ProjectsLoading() {
  return (
    <main className='mt-28 space-y-20 lg:mt-32 lg:space-y-40'>
      <Container>
        <div className='mb-6 h-10 w-48 rounded-md bg-muted/40 skeleton-shimmer' aria-hidden='true' />

        <div className='grid gap-x-20 gap-y-20 sm:grid-cols-2'>
          {Array.from({ length: SKELETON_CARD_COUNT }, (_, index) => (
            <article key={index} className='space-y-3' aria-hidden='true'>
              <div className='h-56 w-full rounded-lg bg-muted/40 skeleton-shimmer md:h-72' />
              <div className='h-5 w-2/3 rounded bg-muted/40 skeleton-shimmer' />
              <div className='h-4 w-1/3 rounded bg-muted/40 skeleton-shimmer' />
            </article>
          ))}
        </div>
      </Container>
    </main>
  )
}
