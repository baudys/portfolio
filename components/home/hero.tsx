'use client'

import { Container } from '@/components/container'
import { useLanguage } from '@/store/use-language'
import { MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import WordRotate from '../ui/word-rotate'
import Clock from 'react-live-clock'

export const Hero = () => {
  const { language } = useLanguage()

  return (
    <section>
      <Container className='grid gap-4 md:grid-cols-2 md:gap-10'>
        <div className='flex flex-col justify-center'>
          <p className='flex items-center gap-1 text-sm text-muted-foreground/80 md:text-base'>
            <MapPin className='size-5' />
            {language === 'cs' && 'Plzeňský kraj, Česká republika'}
            {language === 'en' && 'Pilsen region, Czech republic'}
            <span>
              (
              <Clock
                format={'HH:mm:ss'}
                ticking={true}
                timezone={'Europe/Prague'}
              />
              )
            </span>
          </p>
          <h1 className='text-4xl font-bold lg:text-5xl 2xl:text-6xl'>
            <WordRotate words={['Ahoj,', 'Hola,', 'Ahoy,', 'Ciao,']} />
            {language === 'en' && "I'm Daniel! 👋 "}
            {language === 'cs' && 'jsem Daniel! 👋 '}
          </h1>
          <p className='mb-6 mt-4 text-zinc-950 dark:text-zinc-50 lg:text-lg 2xl:text-xl'>
            {language === 'en' && (
              <>
                <b>Web developer</b> and <b>photographer</b>
              </>
            )}
            {language === 'cs' && (
              <>
                <b>Webový vývojář</b> a <b>fotograf</b>
              </>
            )}
          </p>
          <p className='text-justify text-sm text-zinc-800 dark:text-zinc-200 lg:text-base 2xl:text-lg'>
            {language === 'cs' && (
              <>
                Mám rád kreativitu i techničnost, a proto tvořím estetické{' '}
                <br className='hidden md:block' /> a funkční weby a zachycuji
                svět skrz objektiv fotoaparátu.
              </>
            )}
            {language === 'en' && (
              <>
                I enjoy creativity and technicality, which is why I create
                aesthetic and functional websites and capture the world through
                my camera lens.
              </>
            )}
          </p>
        </div>
        <motion.img
          src='/home/hero.webp'
          alt='portrait photo'
          className='w-full rounded-full'
        />
      </Container>
    </section>
  )
}
