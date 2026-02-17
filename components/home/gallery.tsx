import { getTranslations } from 'next-intl/server'
import { vertical } from '@/database/gallery'
import { Container } from '../container'
import { Photo } from '../gallery/photo'
import { SeeAll } from '../see-all'
import { Title } from '../title'

interface HomeGalleryProps {
  locale: string
}

export const Gallery = async ({ locale }: HomeGalleryProps) => {
  const t = await getTranslations({ locale, namespace: 'home' })

  return (
    <section>
      <Container>
        <Title label={t('galleryTitle')} />

        <div className='hidden md:grid md:grid-cols-3 md:gap-6'>
          {vertical.slice(0, 3).map((photo) => (
            <Photo key={photo.image} photo={photo} />
          ))}
        </div>

        <div className='grid grid-cols-2 gap-2 md:hidden'>
          {vertical.slice(0, 2).map((photo) => (
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
