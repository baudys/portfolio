'use client'

import { useTranslations } from 'next-intl'
import { vertical } from '@/database/gallery'
import { useHydratedRandomizedList } from '@/hooks/use-hydrated-randomized-list'
import { Container } from '../container'
import { Photo } from '../gallery/photo'
import { SeeAll } from '../see-all'
import { Title } from '../title'

export const Gallery = () => {
  const t = useTranslations('home')

  const shuffledGallery = useHydratedRandomizedList(vertical)

  return (
    <section>
      <Container>
        <Title label={t('galleryTitle')} />

        <div className='hidden md:grid md:grid-cols-3 md:gap-6'>
          {shuffledGallery.slice(0, 3).map((photo) => (
            <Photo key={photo.image} photo={photo} />
          ))}
        </div>

        <div className='grid grid-cols-2 gap-2 md:hidden'>
          {shuffledGallery.slice(0, 2).map((photo) => (
            <Photo key={photo.image} photo={photo} />
          ))}
        </div>

        <div className='mt-2 flex justify-end'>
          <SeeAll href='/gallery' />
        </div>
      </Container>
    </section>
  )
}
