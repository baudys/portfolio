import { Contact } from '@/components/contact'
import { Container } from '@/components/container'
import { Photo } from '@/components/gallery/photo'
import { gallery } from '@/database/gallery'
import { shuffle } from '@/lib/utils'

export default function GalleryPage() {
  const shuffledGallery = shuffle([...gallery], Math.floor(Math.random() * 250))

  const totalItems = shuffledGallery.length
  const itemsPer2Column = Math.ceil(totalItems / 2)
  const itemsPer3Column = Math.ceil(totalItems / 3)

  return (
    <main className='mt-28 space-y-20 lg:mt-32 lg:space-y-40'>
      <Container>
        <div className='grid grid-cols-2 gap-2 md:hidden'>
          <div className='flex flex-col gap-2'>
            {shuffledGallery.slice(0, itemsPer2Column).map((item) => (
              <Photo key={item} photo={item.image} />
            ))}
          </div>
          <div className='flex flex-col gap-2'>
            {shuffledGallery.slice(itemsPer2Column).map((item) => (
              <Photo key={item} photo={item.image} />
            ))}
          </div>
        </div>

        <div className='hidden grid-cols-3 gap-6 md:grid'>
          <div className='flex flex-col gap-6'>
            {shuffledGallery.slice(0, itemsPer3Column).map((item) => (
              <Photo key={item} photo={item.image} />
            ))}
          </div>
          <div className='flex flex-col gap-6'>
            {shuffledGallery
              .slice(itemsPer3Column, itemsPer3Column * 2)
              .map((item) => (
                <Photo key={item} photo={item.image} />
              ))}
          </div>
          <div className='flex flex-col gap-6'>
            {shuffledGallery
              .slice(itemsPer3Column * 2, itemsPer3Column * 3)
              .map((item) => (
                <Photo key={item} photo={item.image} />
              ))}
          </div>
        </div>
      </Container>
      <Contact />
    </main>
  )
}
