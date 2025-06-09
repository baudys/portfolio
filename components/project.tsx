'use client'

import Link from 'next/link'
import { FC } from 'react'
import { motion } from 'framer-motion'
import { Cursor } from './cursor'
import { useLanguage } from '@/store/use-language'

interface ProjectProps {
  name: string
  year: number
  image: string
  href: string
  badgesCs: string[]
  badgesEn: string[]
}

export const Project: FC<ProjectProps> = ({
  name,
  year,
  image,
  href,
  badgesCs,
  badgesEn,
}) => {
  const { language } = useLanguage()

  return (
    <Cursor type='project'>
      <Link href={href} className='cursor-none'>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <img src={image} alt={name} />

          <div className='mt-3 flex items-center justify-between'>
            <h3 className='italic'>
              {name}{' '}
              <span className='text-sm font-light not-italic text-muted-foreground'>
                | {year}
              </span>
            </h3>
            <div className='flex gap-2 text-xs text-zinc-600'>
              {language === 'en'
                ? badgesEn.map((badge: string) => (
                    <span
                      key={badge}
                      className='rounded-md bg-cyan-500/20 px-1 py-0.5'
                    >
                      {badge}
                    </span>
                  ))
                : badgesCs.map((badge: string) => (
                    <span
                      key={badge}
                      className='rounded-md bg-cyan-500/20 px-1 py-0.5'
                    >
                      {badge}
                    </span>
                  ))}
            </div>
          </div>
        </motion.div>
      </Link>
    </Cursor>
  )
}
