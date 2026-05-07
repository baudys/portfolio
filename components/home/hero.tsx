'use client'

import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { Container } from '@/components/container'
import { ImageWithSkeleton } from '@/components/ui/image-with-skeleton'
import { LiveClock } from '@/components/ui/live-clock'
import WordRotate from '../ui/word-rotate'

export const Hero = () => {
  const t = useTranslations('home')
  const locale = useLocale()

  return (
    <section>
      <Container className='grid gap-4 md:grid-cols-2 md:gap-10'>
        <div className='flex flex-col justify-center'>
          <p className='flex items-center gap-1 text-sm text-muted-foreground/80 md:text-base'>
            <MapPin className='size-5' />
            {t('location')}
            <span>
              (
              <LiveClock
                locale={locale}
                timeZone='Europe/Prague'
              />
              )
            </span>
          </p>

          <h1 className='text-4xl font-bold lg:text-5xl 2xl:text-6xl'>
            <WordRotate words={['Ahoj,', 'Hola,', 'Ahoy,', 'Ciao,']} />
            {t('greeting')}
          </h1>

          <p className='mb-6 mt-4 text-zinc-950 dark:text-zinc-50 lg:text-lg 2xl:text-xl'>
            <b>{t('roleStrongStart')}</b> {t('roleConnector')}{' '}
            <b>{t('roleStrongEnd')}</b>
          </p>

          <p className='text-justify text-sm text-zinc-800 dark:text-zinc-200 lg:text-base 2xl:text-lg'>
            {t('intro')}
          </p>
        </div>

        <motion.div>
          <ImageWithSkeleton
            src='/home/hero.webp'
            alt='Portrait of Daniel Anthony Baudyš'
            width={1200}
            height={1200}
            sizes='(max-width: 768px) 100vw, 50vw'
            className='h-auto w-full rounded-full'
            wrapperClassName='rounded-full'
          />
        </motion.div>
      </Container>
    </section>
  )
}
