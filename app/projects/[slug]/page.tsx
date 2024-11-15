'use client'

import { Contact } from '@/components/contact'
import { Container } from '@/components/container'
import { projects } from '@/database/projects'
import { useLanguage } from '@/store/use-language'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Title } from '@/components/title'
import { Breadcrumb } from '@/components/breadcrumb'
import { Cursor } from '@/components/cursor'
import { Marquee } from '@/components/ui/marquee'
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiSanity,
  SiTypeform,
  SiFramer,
  SiShadcnui,
  SiRadixui,
  SiLeaflet,
  SiZod,
  SiMui,
  SiReact,
  SiThreedotjs,
  SiVite,
  SiPrisma,
  SiMongodb,
} from 'react-icons/si'

interface PageProps {
  params: {
    slug: string
  }
}

export default function Page({ params }: PageProps) {
  const { language } = useLanguage()

  const {
    images,
    name,
    url,
    year,
    iphone,
    macbook,
    descriptionEn,
    descriptionCs,
    technologies,
    featuresEn,
    featuresCs,
  } = projects.filter((data: any) => data.slug === params.slug)[0]

  return (
    <div>
      <Container className='pb-40 lg:pb-60 xl:pb-80'>
        <Breadcrumb
          base={language === 'en' ? 'projects' : 'projekty'}
          url='/projects'
          current={name}
        />

        <div className='mb-10 grid gap-32 md:grid-cols-[3fr_1fr] lg:mb-20 xl:mb-32'>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className='flex flex-col md:justify-center'
          >
            <h1 className='mb-14 hidden text-center font-semibold md:text-left lg:block lg:text-6xl xl:text-7xl'>
              {name}
            </h1>

            <div className='flex flex-col justify-between gap-4 md:flex-row md:justify-normal md:gap-20'>
              <div className='flex flex-col'>
                <h4 className='font-medium uppercase text-zinc-400'>
                  {language === 'en' && 'web'}
                  {language === 'cs' && 'web'}
                </h4>
                <Cursor type='external'>
                  <Link
                    href={url}
                    target='_blank'
                    className='cursor-none text-2xl font-light underline lg:text-3xl'
                  >
                    {url}
                  </Link>
                </Cursor>
              </div>

              <div className='flex flex-col'>
                <h4 className='font-medium uppercase text-zinc-400'>
                  {language === 'en' && 'year'}
                  {language === 'cs' && 'rok'}
                </h4>
                <p className='text-2xl font-light lg:text-3xl'>{year}</p>
              </div>
            </div>

            <p className='mt-4 text-justify text-lg md:mt-12'>
              {language === 'en' && descriptionEn}
              {language === 'cs' && descriptionCs}
            </p>
          </motion.div>

          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            src={iphone}
            alt={name}
            className='mt-10 lg:mt-0'
          />
        </div>

        <Title label={language === 'en' ? 'Technologies' : 'Technologie'} />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Marquee className='-mt-8 mb-10 lg:mb-20 lg:mt-0 xl:mb-32'>
            {technologies?.map((technology) => (
              <div
                key={technology}
                className='relative mx-[4rem] flex h-full w-fit items-center justify-start whitespace-nowrap text-xl font-semibold md:text-3xl'
              >
                {technology === 'react' && (
                  <>
                    <SiReact
                      size={45}
                      className='size-10 fill-sky-400 md:size-12'
                    />
                    <span className='ml-3'>React</span>
                  </>
                )}
                {technology === 'vite' && (
                  <>
                    <SiVite
                      size={45}
                      className='size-10 fill-purple-700 md:size-12'
                    />
                    <span className='ml-3'>Vite</span>
                  </>
                )}
                {technology === 'nextjs' && (
                  <>
                    <SiNextdotjs className='size-10 md:size-12' />
                    <span className='ml-3'>Next</span>
                  </>
                )}
                {technology === 'typescript' && (
                  <>
                    <SiTypescript
                      size={45}
                      className='size-10 fill-blue-500 md:size-12'
                    />
                    <span className='ml-3'>Typescript</span>
                  </>
                )}
                {technology === 'framer' && (
                  <>
                    <SiFramer size={45} className='size-10 md:size-12' />
                    <span className='ml-3'>Framer Motion</span>
                  </>
                )}
                {technology === 'shadcn' && (
                  <>
                    <SiShadcnui className='size-10 md:size-12' />
                    <span className='ml-3'>Shadcn</span>
                  </>
                )}
                {technology === 'radixui' && (
                  <>
                    <SiRadixui className='size-10 md:size-12' />
                    <span className='ml-3'>Radix UI</span>
                  </>
                )}
                {technology === 'mui' && (
                  <>
                    <SiMui className='size-10 fill-blue-500 md:size-12' />
                    <span className='ml-3'>Mui</span>
                  </>
                )}
                {technology === 'three' && (
                  <>
                    <SiThreedotjs className='size-10 md:size-12' />
                    <span className='ml-3'>Three</span>
                  </>
                )}
                {technology === 'tailwind' && (
                  <>
                    <SiTailwindcss className='size-10 fill-sky-500 md:size-12' />
                    <span className='ml-3'>Tailwind</span>
                  </>
                )}
                {technology === 'prisma' && (
                  <>
                    <SiPrisma className='size-10 fill-blue-600 md:size-12' />
                    <span className='ml-3'>Prisma</span>
                  </>
                )}
                {technology === 'mongodb' && (
                  <>
                    <SiMongodb className='size-10 fill-green-400 md:size-12' />
                    <span className='ml-3'>Mongo DB</span>
                  </>
                )}
                {technology === 'typeform' && (
                  <>
                    <SiTypeform className='size-24 md:size-32' />
                  </>
                )}
                {technology === 'zod' && (
                  <>
                    <SiZod className='size-10 fill-blue-600 md:size-12' />
                    <span className='ml-3'>Zod</span>
                  </>
                )}
                {technology === 'leaflet' && (
                  <>
                    <SiLeaflet className='size-10 fill-green-500 md:size-12' />
                    <span className='ml-3'>Leaflet</span>
                  </>
                )}
                {technology === 'sanity' && (
                  <>
                    <SiSanity className='size-10 fill-red-500 md:size-12' />
                    <span className='ml-3'>Sanity</span>
                  </>
                )}
              </div>
            ))}
          </Marquee>
        </motion.div>

        <Title label={language === 'en' ? 'Features' : 'Obsahuje'} />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className='mb-10 lg:mb-20 xl:mb-32'
        >
          {language === 'en' ? (
            <>
              {featuresEn?.map((feature) => (
                <h3 className='text-2xl'>~ {feature}</h3>
              ))}
            </>
          ) : (
            <>
              {featuresCs?.map((feature) => (
                <h3 className='text-2xl'>~ {feature}</h3>
              ))}
            </>
          )}
        </motion.div>

        <Title label={language === 'en' ? 'Showcase' : 'Ukázka'} />
        <motion.img
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          src={macbook}
          alt={name}
          className='mb-10'
        />
        {images.map((image) => (
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            key={image}
            src={image}
            alt='image'
            className='mb-10 last:mb-0 lg:mb-20'
          />
        ))}
      </Container>
      <Contact />
    </div>
  )
}
