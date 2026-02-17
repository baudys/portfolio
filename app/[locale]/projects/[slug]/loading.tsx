import { Container } from '@/components/container'

const SHOWCASE_SKELETON_COUNT = 3

export default function ProjectDetailLoading() {
  return (
    <div>
      <Container className='pb-40 lg:pb-60 xl:pb-80'>
        <div className='mb-10 h-4 w-40 rounded bg-muted/40 skeleton-shimmer lg:mb-16' aria-hidden='true' />

        <div className='mb-10 grid gap-10 md:grid-cols-[3fr_1fr] lg:mb-20 xl:mb-32 xl:gap-32'>
          <div className='flex flex-col'>
            <div className='h-12 w-3/4 rounded bg-muted/40 skeleton-shimmer lg:h-16 xl:h-20' aria-hidden='true' />

            <div className='mt-10 grid gap-4 sm:grid-cols-3'>
              <div className='h-16 rounded bg-muted/40 skeleton-shimmer' aria-hidden='true' />
              <div className='h-16 rounded bg-muted/40 skeleton-shimmer' aria-hidden='true' />
              <div className='h-16 rounded bg-muted/40 skeleton-shimmer' aria-hidden='true' />
            </div>

            <div className='mt-8 space-y-2'>
              <div className='h-4 w-full rounded bg-muted/40 skeleton-shimmer' aria-hidden='true' />
              <div className='h-4 w-11/12 rounded bg-muted/40 skeleton-shimmer' aria-hidden='true' />
              <div className='h-4 w-10/12 rounded bg-muted/40 skeleton-shimmer' aria-hidden='true' />
              <div className='h-4 w-9/12 rounded bg-muted/40 skeleton-shimmer' aria-hidden='true' />
            </div>
          </div>

          <div className='h-[420px] rounded bg-muted/40 skeleton-shimmer md:h-[520px]' aria-hidden='true' />
        </div>

        <section className='mb-10 lg:mb-20 xl:mb-32'>
          <div className='mb-4 h-9 w-56 rounded bg-muted/40 skeleton-shimmer' aria-hidden='true' />
          <div className='h-24 rounded bg-muted/40 skeleton-shimmer md:h-28' aria-hidden='true' />
        </section>

        <section className='mb-10 lg:mb-20 xl:mb-32'>
          <div className='mb-4 h-9 w-40 rounded bg-muted/40 skeleton-shimmer' aria-hidden='true' />
          <div className='space-y-3'>
            <div className='h-7 w-2/3 rounded bg-muted/40 skeleton-shimmer' aria-hidden='true' />
            <div className='h-7 w-3/5 rounded bg-muted/40 skeleton-shimmer' aria-hidden='true' />
            <div className='h-7 w-1/2 rounded bg-muted/40 skeleton-shimmer' aria-hidden='true' />
          </div>
        </section>

        <section className='mb-10'>
          <div className='mb-4 h-9 w-44 rounded bg-muted/40 skeleton-shimmer' aria-hidden='true' />
          <div className='h-[260px] rounded bg-muted/40 skeleton-shimmer md:h-[420px]' aria-hidden='true' />
        </section>

        <div className='space-y-10 lg:space-y-20'>
          {Array.from({ length: SHOWCASE_SKELETON_COUNT }, (_, index) => (
            <div
              key={index}
              className='h-[240px] rounded bg-muted/40 skeleton-shimmer md:h-[420px]'
              aria-hidden='true'
            />
          ))}
        </div>
      </Container>
    </div>
  )
}
