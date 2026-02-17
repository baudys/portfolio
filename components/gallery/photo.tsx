'use client'

import { useEffect, useState } from 'react'
import { Cursor } from '../cursor'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { motion } from 'framer-motion'
import { ImageWithSkeleton } from '../ui/image-with-skeleton'

interface PhotoProps {
  photo: string
}

interface PhotoDimensions {
  width: number
  height: number
}

export const Photo = ({ photo }: PhotoProps) => {
  const [dimensions, setDimensions] = useState<PhotoDimensions>({
    width: 3,
    height: 2,
  })

  useEffect(() => {
    let mounted = true
    const image = new window.Image()

    image.src = photo
    image.onload = () => {
      if (!mounted) return

      setDimensions({
        width: image.naturalWidth || 3,
        height: image.naturalHeight || 2,
      })
    }

    return () => {
      mounted = false
    }
  }, [photo])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <Dialog>
        <DialogTrigger>
          <Cursor type='photo'>
            <ImageWithSkeleton
              src={photo}
              alt='photo'
              width={dimensions.width}
              height={dimensions.height}
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
              src={photo}
              alt='photo'
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
