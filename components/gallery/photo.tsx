'use client'

import { useLocale } from 'next-intl'
import { Cursor } from '../cursor'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { motion } from 'framer-motion'
import { ImageWithSkeleton } from '../ui/image-with-skeleton'
import type { GalleryItem } from '@/database/gallery'
import type { AppLocale } from '@/i18n/locales'

interface PhotoProps {
  photo: GalleryItem
}

const DEFAULT_PHOTO_WIDTH = 1600
const DEFAULT_PHOTO_HEIGHT = 1067

export const Photo = ({ photo }: PhotoProps) => {
  const locale = useLocale() as AppLocale
  const altText =
    locale === 'cs'
      ? photo.alt.cs
      : locale === 'es'
        ? photo.alt.es
        : photo.alt.en

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: 0.3 }}
    >
      <Dialog>
        <DialogTrigger>
          <Cursor type='photo'>
            <ImageWithSkeleton
              src={photo.image}
              alt={altText}
              width={DEFAULT_PHOTO_WIDTH}
              height={DEFAULT_PHOTO_HEIGHT}
              sizes='(max-width: 768px) 50vw, 33vw'
              className='h-auto w-full rounded-lg'
              wrapperClassName='rounded-lg'
            />
          </Cursor>
        </DialogTrigger>
        <DialogContent className='h-[96vh] w-[98vw] max-h-[96vh] max-w-[98vw] border-none bg-transparent p-0 shadow-none sm:max-w-[98vw]'>
          <DialogTitle className='sr-only'>Photo preview</DialogTitle>
          <div className='relative h-full w-full overflow-hidden rounded-lg'>
            <ImageWithSkeleton
              src={photo.image}
              alt={altText}
              fill
              sizes='95vw'
              className='object-contain'
              wrapperClassName='h-full w-full rounded-lg'
            />
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
