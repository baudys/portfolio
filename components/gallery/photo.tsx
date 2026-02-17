'use client'

import { Cursor } from '../cursor'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface PhotoProps {
  photo: string
}

export const Photo = ({ photo }: PhotoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <Dialog>
        <DialogTrigger>
          <Cursor type='photo'>
            <Image
              src={photo}
              alt='photo'
              width={1200}
              height={800}
              sizes='(max-width: 768px) 50vw, 33vw'
              className='rounded-lg'
            />
          </Cursor>
        </DialogTrigger>
        <DialogContent className='max-h-[90vh] max-w-[95vw]'>
          <Image
            src={photo}
            alt='photo'
            width={1920}
            height={1280}
            sizes='95vw'
            className='max-h-[90vh] max-w-[95vw] rounded-lg'
          />
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
