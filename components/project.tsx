'use client'

import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import { Cursor } from './cursor'
import { Link } from '@/i18n/navigation'
import type { AppLocale } from '@/i18n/locales'
import { getLocalizedCredits, getLocalizedList } from '@/lib/projects'
import type { Project as ProjectRecord } from '@/types/project'
import { ImageWithSkeleton } from './ui/image-with-skeleton'

interface ProjectProps {
  project: ProjectRecord
}

export const Project = ({ project }: ProjectProps) => {
  const locale = useLocale() as AppLocale

  const badges = getLocalizedList(
    {
      cs: project.badgesCs,
      en: project.badgesEn,
      es: project.badgesEs,
    },
    locale,
  )

  const credits = getLocalizedCredits(
    {
      cs: project.creditsCs,
      en: project.creditsEn,
      es: project.creditsEs,
    },
    locale,
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <Link
        href={{ pathname: '/projects/[slug]', params: { slug: project.slug } }}
      >
        <Cursor type='project'>
          <ImageWithSkeleton
            src={project.mockup}
            alt={project.name}
            width={1600}
            height={900}
            sizes='(max-width: 768px) 100vw, 50vw'
            className='h-auto w-full'
          />
        </Cursor>
      </Link>

      <div className='mt-3 flex items-center justify-between'>
        <h3 className='italic'>
          <Link
            href={{ pathname: '/projects/[slug]', params: { slug: project.slug } }}
            className='hover:underline'
          >
            {project.name}
          </Link>{' '}
          <span className='text-sm font-light not-italic text-muted-foreground'>
            | {project.year}
          </span>
        </h3>

        <div className='flex gap-2 text-xs text-zinc-700 dark:text-zinc-100'>
          {credits && (
            <Cursor type='external'>
              <a
                href={credits.href}
                target='_blank'
                rel='noopener noreferrer'
                className='cursor-none rounded-md bg-zinc-400/20 px-1 py-0.5 dark:bg-white/20'
              >
                {credits.label}{' '}
                <span className='font-bold underline'>{credits.action}</span>
              </a>
            </Cursor>
          )}

          {badges.map((badge) => (
            <span
              key={badge}
              className='rounded-md bg-zinc-400/20 px-1 py-0.5 dark:bg-white/20'
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
