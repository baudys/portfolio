import Link from 'next/link'
import { ImageWithSkeleton } from '@/components/ui/image-with-skeleton'

export default function GlobalNotFoundPage() {
  return (
    <div className='mb-20 mt-40 grid place-content-center lg:mb-32 lg:mt-60'>
      <ImageWithSkeleton
        src='/logo.webp'
        alt='logo'
        width={200}
        height={200}
        className='mx-auto mb-10'
      />
      <h2 className='text-center text-4xl font-bold sm:text-5xl lg:text-6xl'>
        Page not found
      </h2>
      <Link href='/' className='text-center underline'>
        Back home
      </Link>
    </div>
  )
}
