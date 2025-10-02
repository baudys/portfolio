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
  creditsCs?: {
    label: string
    action: string
    href: string
  }
  creditsEn?: {
    label: string
    action: string
    href: string
  }
}

export const Project: FC<ProjectProps> = ({
  name,
  year,
  image,
  href,
  badgesCs,
  badgesEn,
  creditsCs,
  creditsEn,
}) => {
  const { language } = useLanguage()

  return (
    <Link href={href}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Cursor type='project'>
          <img src={image} alt={name} />
        </Cursor>

        <div className='mt-3 flex items-center justify-between'>
          <h3 className='italic'>
            {name}{' '}
            <span className='text-sm font-light not-italic text-muted-foreground'>
              | {year}
            </span>
          </h3>
          <div className='flex gap-2 text-xs text-zinc-700 dark:text-zinc-100'>
            <Cursor type='external'>
              {language === 'en'
                ? creditsEn && (
                    <Link
                      href={creditsEn?.href || '#'}
                      target='_blank'
                      rel='noopener noreferrer'
                      onClick={(e) => e.stopPropagation()}
                      className='cursor-none rounded-md bg-orange-500/20 px-1 py-0.5'
                    >
                      {creditsEn?.label}{' '}
                      <span className='font-bold underline'>
                        {creditsEn?.action}
                      </span>
                    </Link>
                  )
                : creditsCs && (
                    <Link
                      href={creditsCs?.href || '#'}
                      target='_blank'
                      rel='noopener noreferrer'
                      onClick={(e) => e.stopPropagation()}
                      className='cursor-none rounded-md bg-orange-500/20 px-1 py-0.5'
                    >
                      {creditsCs?.label}{' '}
                      <span className='font-bold underline'>
                        {creditsCs?.action}
                      </span>
                    </Link>
                  )}
            </Cursor>
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
                    className='rounded-md bg-cyan-500/20 px-1 py-0.5 dark:bg-cyan-600/40'
                  >
                    {badge}
                  </span>
                ))}
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
