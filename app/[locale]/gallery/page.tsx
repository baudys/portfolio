'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Contact } from '@/components/contact'
import { Container } from '@/components/container'
import { Photo } from '@/components/gallery/photo'
import { Button } from '@/components/ui/button'
import { gallery } from '@/database/gallery'
import type { Category } from '@/types/category'
import { ChevronDown } from 'lucide-react'

const filterCategories: Array<Exclude<Category, ''>> = [
  'cars',
  'travel',
  'people',
  'animals',
  'nature',
  'retro',
  'posters',
]

export default function GalleryPage() {
  const t = useTranslations('gallery')
  const tMeta = useTranslations('meta.gallery')

  const [filtersVisible, setFiltersVisible] = useState<boolean>(false)
  const [filters, setFilters] = useState<Category[]>([])

  const filteredGallery = gallery.filter((item) =>
    filters.length === 0
      ? true
      : item.categories.some((category: Category) => filters.includes(category)),
  )

  const totalItems = filteredGallery.length
  const itemsPer2Column = Math.ceil(totalItems / 2)
  const itemsPer3Column = Math.ceil(totalItems / 3)

  const toggleFilter = (category: Category) => {
    setFilters((prev) =>
      prev.includes(category)
        ? prev.filter((currentCategory) => currentCategory !== category)
        : [...prev, category],
    )
  }

  return (
    <main className='mt-28 space-y-20 lg:mt-32 lg:space-y-40'>
      <Container>
        <h1 className='sr-only'>{tMeta('title')}</h1>

        <section className='mb-2 md:mb-3'>
          <Button
            onClick={() => setFiltersVisible((prev) => !prev)}
            variant='ghost'
          >
            {t('filters')}
            <ChevronDown size={20} className='ml-2' />
          </Button>

          {filtersVisible && (
            <div className='mt-1.5 flex flex-wrap gap-2'>
              {filterCategories.map((category) => (
                <Button
                  key={category}
                  onClick={() => toggleFilter(category)}
                  variant={filters.includes(category) ? 'default' : 'secondary'}
                >
                  {t(category)}
                </Button>
              ))}
            </div>
          )}
        </section>

        <section>
          <div className='grid grid-cols-2 gap-2 md:hidden'>
            <div className='flex flex-col gap-2'>
              {filteredGallery.slice(0, itemsPer2Column).map((item, index) => (
                <Photo key={`${item.image}-${index}`} photo={item} />
              ))}
            </div>

            <div className='flex flex-col gap-2'>
              {filteredGallery.slice(itemsPer2Column).map((item, index) => (
                <Photo key={`${item.image}-${index}`} photo={item} />
              ))}
            </div>
          </div>

          <div className='hidden grid-cols-3 gap-6 md:grid'>
            <div className='flex flex-col gap-6'>
              {filteredGallery.slice(0, itemsPer3Column).map((item, index) => (
                <Photo key={`${item.image}-${index}`} photo={item} />
              ))}
            </div>

            <div className='flex flex-col gap-6'>
              {filteredGallery
                .slice(itemsPer3Column, itemsPer3Column * 2)
                .map((item, index) => (
                  <Photo key={`${item.image}-${index}`} photo={item} />
                ))}
            </div>

            <div className='flex flex-col gap-6'>
              {filteredGallery
                .slice(itemsPer3Column * 2, itemsPer3Column * 3)
                .map((item, index) => (
                  <Photo key={`${item.image}-${index}`} photo={item} />
                ))}
            </div>
          </div>
        </section>
      </Container>

      <Contact />
    </main>
  )
}
