'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { ImageWithSkeleton } from '@/components/ui/image-with-skeleton'

export default function LocaleNotFound() {
  const t = useTranslations('notFound')

  return (
    <div className='mb-20 mt-40 grid place-content-center lg:mb-32 lg:mt-60'>
      <ImageWithSkeleton
        src='/logo.webp'
        alt='Daniel Anthony Baudyš logo'
        width={200}
        height={200}
        className='mx-auto mb-10'
      />
      <h2 className='text-center text-4xl font-bold sm:text-5xl lg:text-6xl'>
        {t('title')}
      </h2>
      <Link href='/' className='text-center underline'>
        {t('back')}
      </Link>
    </div>
  )
}
