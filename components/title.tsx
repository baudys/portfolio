'use client'

import { FC } from 'react'
import { motion } from 'framer-motion'

interface TitleProps {
  label: string
}

export const Title: FC<TitleProps> = ({ label }) => {
  return (
    <motion.h3
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className='mb-2 py-1 text-2xl font-bold md:text-3xl lg:text-4xl xl:text-5xl'
    >
      {label}
    </motion.h3>
  )
}
