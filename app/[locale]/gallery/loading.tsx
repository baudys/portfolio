import { Container } from '@/components/container'
import { cn } from '@/lib/utils'

const MOBILE_COLUMN_ITEM_COUNT = 8
const DESKTOP_COLUMN_ITEM_COUNT = 7

const mobileHeights = [
  'h-32',
  'h-40',
  'h-36',
  'h-44',
  'h-52',
  'h-48',
] as const

const desktopHeights = [
  'h-44',
  'h-56',
  'h-52',
  'h-64',
  'h-48',
  'h-60',
] as const

const getColumnSkeletonItems = (count: number): number[] =>
  Array.from({ length: count }, (_, index) => index)

const ImageSkeleton = ({
  className,
}: {
  className?: string
}) => (
  <div
    className={cn(
      'relative overflow-hidden rounded-lg bg-muted/40',
      className,
    )}
    aria-hidden='true'
  >
    <div className='skeleton-shimmer h-full w-full rounded-[inherit] bg-muted/40' />
  </div>
)

export default function GalleryLoading() {
  return (
    <main className='mt-28 space-y-20 lg:mt-32 lg:space-y-40'>
      <Container>
        <section className='mb-2 md:mb-3'>
          <div
            className='skeleton-shimmer h-10 w-32 rounded-md bg-muted/40'
            aria-hidden='true'
          />
        </section>

        <section>
          <div className='grid grid-cols-2 gap-2 md:hidden'>
            <div className='flex flex-col gap-2'>
              {getColumnSkeletonItems(MOBILE_COLUMN_ITEM_COUNT).map((item) => (
                <ImageSkeleton
                  key={`mobile-left-${item}`}
                  className={mobileHeights[item % mobileHeights.length]}
                />
              ))}
            </div>

            <div className='flex flex-col gap-2'>
              {getColumnSkeletonItems(MOBILE_COLUMN_ITEM_COUNT).map((item) => (
                <ImageSkeleton
                  key={`mobile-right-${item}`}
                  className={mobileHeights[(item + 2) % mobileHeights.length]}
                />
              ))}
            </div>
          </div>

          <div className='hidden grid-cols-3 gap-6 md:grid'>
            <div className='flex flex-col gap-6'>
              {getColumnSkeletonItems(DESKTOP_COLUMN_ITEM_COUNT).map((item) => (
                <ImageSkeleton
                  key={`desktop-left-${item}`}
                  className={desktopHeights[item % desktopHeights.length]}
                />
              ))}
            </div>

            <div className='flex flex-col gap-6'>
              {getColumnSkeletonItems(DESKTOP_COLUMN_ITEM_COUNT).map((item) => (
                <ImageSkeleton
                  key={`desktop-center-${item}`}
                  className={desktopHeights[(item + 3) % desktopHeights.length]}
                />
              ))}
            </div>

            <div className='flex flex-col gap-6'>
              {getColumnSkeletonItems(DESKTOP_COLUMN_ITEM_COUNT).map((item) => (
                <ImageSkeleton
                  key={`desktop-right-${item}`}
                  className={desktopHeights[(item + 1) % desktopHeights.length]}
                />
              ))}
            </div>
          </div>
        </section>
      </Container>
    </main>
  )
}
