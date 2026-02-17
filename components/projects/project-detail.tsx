'use client'

import { motion } from 'framer-motion'
import {
  SiFramer,
  SiGithub,
  SiLeaflet,
  SiMongodb,
  SiMui,
  SiNextdotjs,
  SiPrisma,
  SiRadixui,
  SiReact,
  SiSanity,
  SiShadcnui,
  SiTailwindcss,
  SiThreedotjs,
  SiTypeform,
  SiTypescript,
  SiVite,
  SiZod,
} from 'react-icons/si'
import { useLocale, useTranslations } from 'next-intl'
import { Breadcrumb } from '@/components/breadcrumb'
import { Container } from '@/components/container'
import { Cursor } from '@/components/cursor'
import { Title } from '@/components/title'
import { Marquee } from '@/components/ui/marquee'
import { ImageWithSkeleton } from '@/components/ui/image-with-skeleton'
import type { AppLocale } from '@/i18n/locales'
import { getLocalizedList, getLocalizedText } from '@/lib/projects-localization'
import type { Project } from '@/types/project'

interface ProjectDetailProps {
  project: Project
}

const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: { delay: 0.3 },
}

function formatUrl(url: string): string {
  if (!url || url === '-') return url

  return url
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '')
    .replace(/\.vercel\.app$/, '')
}

function renderTechnology(technology: string): React.ReactNode {
  if (technology === 'react') {
    return (
      <>
        <SiReact size={45} className='size-10 fill-sky-400 md:size-12' />
        <span className='ml-3'>React</span>
      </>
    )
  }

  if (technology === 'vite') {
    return (
      <>
        <SiVite size={45} className='size-10 fill-purple-700 md:size-12' />
        <span className='ml-3'>Vite</span>
      </>
    )
  }

  if (technology === 'nextjs') {
    return (
      <>
        <SiNextdotjs className='size-10 md:size-12' />
        <span className='ml-3'>Next</span>
      </>
    )
  }

  if (technology === 'typescript') {
    return (
      <>
        <SiTypescript size={45} className='size-10 fill-blue-500 md:size-12' />
        <span className='ml-3'>Typescript</span>
      </>
    )
  }

  if (technology === 'framer') {
    return (
      <>
        <SiFramer size={45} className='size-10 md:size-12' />
        <span className='ml-3'>Framer Motion</span>
      </>
    )
  }

  if (technology === 'shadcn') {
    return (
      <>
        <SiShadcnui className='size-10 md:size-12' />
        <span className='ml-3'>Shadcn</span>
      </>
    )
  }

  if (technology === 'radixui') {
    return (
      <>
        <SiRadixui className='size-10 md:size-12' />
        <span className='ml-3'>Radix UI</span>
      </>
    )
  }

  if (technology === 'mui') {
    return (
      <>
        <SiMui className='size-10 fill-blue-500 md:size-12' />
        <span className='ml-3'>MUI</span>
      </>
    )
  }

  if (technology === 'three') {
    return (
      <>
        <SiThreedotjs className='size-10 md:size-12' />
        <span className='ml-3'>Three</span>
      </>
    )
  }

  if (technology === 'tailwind') {
    return (
      <>
        <SiTailwindcss className='size-10 fill-sky-500 md:size-12' />
        <span className='ml-3'>Tailwind</span>
      </>
    )
  }

  if (technology === 'prisma') {
    return (
      <>
        <SiPrisma className='size-10 fill-blue-600 md:size-12' />
        <span className='ml-3'>Prisma</span>
      </>
    )
  }

  if (technology === 'mongodb') {
    return (
      <>
        <SiMongodb className='size-10 fill-green-400 md:size-12' />
        <span className='ml-3'>MongoDB</span>
      </>
    )
  }

  if (technology === 'typeform') {
    return <SiTypeform className='size-24 md:size-32' />
  }

  if (technology === 'zod') {
    return (
      <>
        <SiZod className='size-10 fill-blue-600 md:size-12' />
        <span className='ml-3'>Zod</span>
      </>
    )
  }

  if (technology === 'leaflet') {
    return (
      <>
        <SiLeaflet className='size-10 fill-green-500 md:size-12' />
        <span className='ml-3'>Leaflet</span>
      </>
    )
  }

  if (technology === 'sanity') {
    return (
      <>
        <SiSanity className='size-10 fill-red-500 md:size-12' />
        <span className='ml-3'>Sanity</span>
      </>
    )
  }

  return <span className='capitalize'>{technology}</span>
}

export const ProjectDetail = ({ project }: ProjectDetailProps) => {
  const locale = useLocale() as AppLocale
  const t = useTranslations()

  const description = getLocalizedText(
    {
      cs: project.descriptionCs,
      en: project.descriptionEn,
      es: project.descriptionEs,
    },
    locale,
  )

  const features = getLocalizedList(
    {
      cs: project.featuresCs,
      en: project.featuresEn,
      es: project.featuresEs,
    },
    locale,
  )

  return (
    <Container className='pb-40 lg:pb-60 xl:pb-80'>
      <Breadcrumb base={t('projectDetail.base')} href='/projects' current={project.name} />

      <div className='mb-10 grid gap-32 md:grid-cols-[3fr_1fr] lg:mb-20 xl:mb-32'>
        <motion.div {...fadeIn} className='flex flex-col md:justify-center'>
          <h1 className='text-center font-semibold md:text-left lg:text-6xl xl:text-7xl'>
            {project.name}
          </h1>

          <div className='mt-14 flex flex-col justify-between gap-4 md:flex-row md:justify-normal md:gap-20'>
            <div className='flex flex-col'>
              <h4 className='font-medium uppercase text-zinc-400'>
                {t('common.web')}
              </h4>

              <div className='flex items-center gap-3'>
                <Cursor type='external'>
                  {project.url === '-' ? (
                    <span className='text-2xl font-light lg:text-3xl'>-</span>
                  ) : (
                    <a
                      href={project.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='cursor-none text-2xl font-light underline lg:text-3xl'
                    >
                      {formatUrl(project.url)}
                    </a>
                  )}
                </Cursor>
              </div>
            </div>

            {project.github && (
              <div className='flex flex-col'>
                <h4 className='font-medium uppercase text-zinc-400'>GitHub</h4>

                <Cursor type='external'>
                  <a
                    href={project.github}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-2xl font-light lg:text-3xl'
                  >
                    <SiGithub />
                  </a>
                </Cursor>
              </div>
            )}

            <div className='flex flex-col'>
              <h4 className='font-medium uppercase text-zinc-400'>
                {t('common.year')}
              </h4>
              <p className='text-2xl font-light lg:text-3xl'>{project.year}</p>
            </div>
          </div>

          <p className='mt-4 text-justify text-lg md:mt-12'>{description}</p>
        </motion.div>

        <motion.div {...fadeIn} className='mt-10 lg:mt-0'>
          <ImageWithSkeleton
            src={project.iphone}
            alt={project.name}
            width={900}
            height={1600}
            sizes='(max-width: 768px) 100vw, 25vw'
            className='h-auto w-full'
          />
        </motion.div>
      </div>

      <Title label={t('projectDetail.technologies')} />
      <motion.div {...fadeIn}>
        <Marquee className='mb-10 lg:mb-20 xl:mb-32'>
          {project.technologies.map((technology) => (
            <div
              key={technology}
              className='relative mx-[4rem] flex h-full w-fit items-center justify-start whitespace-nowrap text-xl font-semibold md:text-3xl'
            >
              {renderTechnology(technology)}
            </div>
          ))}
        </Marquee>
      </motion.div>

      <Title label={t('projectDetail.features')} />
      <motion.div {...fadeIn} className='mb-10 lg:mb-20 xl:mb-32'>
        {features.map((feature) => (
          <h3 key={feature} className='text-2xl'>
            ~ {feature}
          </h3>
        ))}
      </motion.div>

      <Title label={t('projectDetail.showcase')} />
      <motion.div {...fadeIn} className='mb-10'>
        <ImageWithSkeleton
          src={project.macbook}
          alt={project.name}
          width={1920}
          height={1080}
          sizes='100vw'
          className='h-auto w-full'
        />
      </motion.div>
      {project.images.map((image) => (
        <motion.div
          key={image}
          className='mb-10 last:mb-0 lg:mb-20'
          {...fadeIn}
        >
          <ImageWithSkeleton
            src={image}
            alt={`${project.name} showcase screenshot`}
            width={1920}
            height={1080}
            sizes='100vw'
            className='h-auto w-full'
          />
        </motion.div>
      ))}
    </Container>
  )
}
