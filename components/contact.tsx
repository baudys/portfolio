'use client'

import { motion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { Container } from './container'
import { Title } from './title'
import { cn } from '@/lib/utils'
import { BorderBeam } from './ui/border-beam'
import { ImageWithSkeleton } from './ui/image-with-skeleton'
import { MagicCard } from './ui/magic-card'

export const Contact = () => {
  const tContact = useTranslations('contact')
  const tCommon = useTranslations('common')
  const { theme } = useTheme()

  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setClicked(false)
    }, 3000)

    return () => clearTimeout(timeout)
  }, [clicked])

  return (
    <Container>
      <Title label={tContact('title')} />

      <MagicCard
        className='rounded-2xl bg-zinc-100 dark:bg-zinc-900'
        gradientColor={theme === 'dark' ? '#262626' : '#E0E0E0'}
      >
        <BorderBeam className='rounded-2xl' />

        <div className='p-4 shadow-sm md:p-10'>
          <div className='grid gap-4 md:grid-cols-2 md:gap-10'>
            <div className='flex flex-col justify-between'>
              <div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className='text-lg font-semibold md:text-xl'>
                    Daniel Anthony Baudyš
                  </h3>
                  <p className='text-sm text-zinc-800 dark:text-zinc-200'>
                    Hájek 29
                  </p>
                  <p className='text-sm text-zinc-800 dark:text-zinc-200'>
                    345 06 Kdyně
                  </p>
                  <p className='mt-4 font-semibold'>
                    {tContact('idNo')} 199 333 12
                  </p>
                  <p className='text-sm text-zinc-800 dark:text-zinc-200'>
                    {tContact('legalType')}
                  </p>
                  <p className='text-sm text-zinc-800 dark:text-zinc-200'>
                    {tContact('vat')}
                  </p>
                </motion.div>
              </div>

              <div className='mt-8 space-y-1'>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className='flex flex-nowrap items-center gap-2 text-center text-sm md:text-base'
                >
                  <Phone className='h-4 w-4' />
                  <a
                    href='tel:+420777530096'
                    className='relative font-bold after:absolute after:-bottom-1 after:left-0 after:right-0 after:z-10 after:h-[3px] after:w-full after:origin-left after:scale-x-0 after:rounded-lg after:bg-black after:opacity-0 after:transition after:hover:scale-x-100 after:hover:opacity-100 dark:after:bg-white'
                  >
                    +420 777 530 096
                  </a>
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className='flex flex-nowrap items-center gap-2 text-center text-sm md:text-base'
                >
                  <Mail className='h-4 w-4' />
                  <span
                    onClick={() => {
                      setClicked(true)
                      navigator.clipboard.writeText('daniel@baudys.dev')
                    }}
                    className='relative cursor-pointer font-bold after:absolute after:-bottom-1 after:left-0 after:right-0 after:z-10 after:h-[3px] after:w-full after:origin-left after:scale-x-0 after:rounded-lg after:bg-black after:opacity-0 after:transition after:hover:scale-x-100 after:hover:opacity-100 dark:after:bg-white'
                  >
                    daniel@baudys.dev
                  </span>

                  <motion.span
                    className={cn(
                      'absolute -translate-y-[25px] translate-x-[180px] rounded bg-white/60 px-1 py-0.5 text-right text-xs text-zinc-900/80 opacity-0 transition lg:translate-x-[220px]',
                      clicked && 'opacity-100',
                    )}
                  >
                    {tCommon('copied')}
                  </motion.span>
                </motion.p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <ImageWithSkeleton
                src='/contact/contact.webp'
                alt={tContact('imageAlt')}
                width={1200}
                height={1200}
                sizes='(max-width: 768px) 100vw, 50vw'
                className='h-auto w-full rounded-2xl'
                wrapperClassName='rounded-2xl'
              />
            </motion.div>
          </div>
        </div>
      </MagicCard>
    </Container>
  )
}
