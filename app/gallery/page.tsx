'use client'

import { Contact } from '@/components/contact'
import { Container } from '@/components/container'
import { Photo } from '@/components/gallery/photo'
import { Button } from '@/components/ui/button'
import { gallery } from '@/database/gallery'
import { shuffle } from '@/lib/utils'
import { useLanguage } from '@/store/use-language'
import { Category } from '@/types/category'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function GalleryPage() {
  const { language } = useLanguage()

  const [filtersVisible, setFiltersVisible] = useState<boolean>(false)
  const [filter, setFilter] = useState<Category>('')

  const shuffledGallery = shuffle([...gallery], 3892437)

  const filteredGallery = shuffledGallery.filter((item) =>
    filter === ''
      ? true
      : item.categories.some((category: Category) => category === filter),
  )

  const totalItems = filteredGallery.length
  const itemsPer2Column = Math.ceil(totalItems / 2)
  const itemsPer3Column = Math.ceil(totalItems / 3)

  return (
    <main className='mt-28 space-y-20 lg:mt-32 lg:space-y-40'>
      <Container>
        <section className='mb-2 md:mb-6'>
          <Button
            onClick={() => setFiltersVisible((prev) => !prev)}
            variant='ghost'
          >
            {language === 'en' && 'Filters'}
            {language === 'cs' && 'Filtry'}
            <ChevronDown size={20} className='ml-2' />
          </Button>
          {filtersVisible && (
            <div className='mt-1.5 flex gap-2'>
              <Button
                onClick={() => setFilter('')}
                variant={filter === '' ? 'default' : 'secondary'}
              >
                {language === 'cs' && 'Bez Filtru'}
                {language === 'en' && 'No Filter'}
              </Button>
              <Button
                onClick={() => setFilter('cars')}
                variant={filter === 'cars' ? 'default' : 'secondary'}
              >
                {language === 'cs' && 'Auta'}
                {language === 'en' && 'Cars'}
              </Button>
              <Button
                onClick={() => setFilter('travel')}
                variant={filter === 'travel' ? 'default' : 'secondary'}
              >
                {language === 'cs' && 'Cestování'}
                {language === 'en' && 'Travel'}
              </Button>
              <Button
                onClick={() => setFilter('people')}
                variant={filter === 'people' ? 'default' : 'secondary'}
              >
                {language === 'cs' && 'Lidé'}
                {language === 'en' && 'People'}
              </Button>
              <Button
                onClick={() => setFilter('animals')}
                variant={filter === 'animals' ? 'default' : 'secondary'}
              >
                {language === 'cs' && 'Zvířata'}
                {language === 'en' && 'Animals'}
              </Button>
              <Button
                onClick={() => setFilter('nature')}
                variant={filter === 'nature' ? 'default' : 'secondary'}
              >
                {language === 'cs' && 'Příroda'}
                {language === 'en' && 'Nature'}
              </Button>
              <Button
                onClick={() => setFilter('retro')}
                variant={filter === 'retro' ? 'default' : 'secondary'}
              >
                {language === 'cs' && 'Retro'}
                {language === 'en' && 'Retro'}
              </Button>
            </div>
          )}
        </section>

        <section>
          <div className='grid grid-cols-2 gap-2 md:hidden'>
            <div className='flex flex-col gap-2'>
              {filteredGallery.slice(0, itemsPer2Column).map((item) => (
                <Photo key={item} photo={item.image} />
              ))}
            </div>
            <div className='flex flex-col gap-2'>
              {filteredGallery.slice(itemsPer2Column).map((item) => (
                <Photo key={item} photo={item.image} />
              ))}
            </div>
          </div>

          <div className='hidden grid-cols-3 gap-6 md:grid'>
            <div className='flex flex-col gap-6'>
              {filteredGallery.slice(0, itemsPer3Column).map((item) => (
                <Photo key={item} photo={item.image} />
              ))}
            </div>
            <div className='flex flex-col gap-6'>
              {filteredGallery
                .slice(itemsPer3Column, itemsPer3Column * 2)
                .map((item) => (
                  <Photo key={item} photo={item.image} />
                ))}
            </div>
            <div className='flex flex-col gap-6'>
              {filteredGallery
                .slice(itemsPer3Column * 2, itemsPer3Column * 3)
                .map((item) => (
                  <Photo key={item} photo={item.image} />
                ))}
            </div>
          </div>
        </section>
      </Container>
      <Contact />
    </main>
  )
}
