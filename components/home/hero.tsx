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
          <p className='my-2 text-zinc-950 lg:text-lg 2xl:text-xl'>
            {language === 'en' && (
              <>
                <b>Web developer</b>, <b>programmer</b>, <b>photographer</b> and{' '}
                <b>designer</b>.
              </>
            )}
            {language === 'cs' && (
              <>
                <b>Webový vývojář</b>, <b>programátor</b>, <b>fotograf</b> a{' '}
                <b>designer</b>
              </>
            )}
          </p>
          <p className='max-w-[80ch] text-justify text-sm text-zinc-800 dark:text-zinc-200 lg:text-base 2xl:text-lg'>
            {language === 'cs' &&
              'Rád spojuji technické dovednosti s kreativitou, abych vytvářel funkční a estetické projekty. Baví mě přinášet nápady k životu – jak v digitálním světě, tak skrze objektiv fotoaparátu.'}
            {language === 'en' &&
              'I like to combine technical skills with creativity to create functional and aesthetic projects. I enjoy bringing ideas to life - both in the digital world and through the lens of a camera.'}
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
