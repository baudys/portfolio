'use client'

import type { ElementType, FC } from 'react'
import { motion } from 'framer-motion'

interface TitleProps {
  label: string
  as?: 'h2' | 'h3'
}

export const Title: FC<TitleProps> = ({ label, as = 'h2' }) => {
  const Component = as as ElementType

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <Component className='mb-2 py-1 text-2xl font-bold md:text-3xl lg:text-4xl xl:text-5xl'>
        {label}
      </Component>
    </motion.div>
  )
}
