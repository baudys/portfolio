'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function ProjectSlugError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations('projectDetail.error')

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='mx-auto flex max-w-lg flex-col items-center gap-6 px-4 py-24 text-center md:py-32'>
      <h1 className='text-2xl font-semibold tracking-tight md:text-3xl'>{t('title')}</h1>
      <p className='text-sm text-zinc-600 dark:text-zinc-400'>{t('description')}</p>
      <div className='flex flex-wrap items-center justify-center gap-4'>
        <button
          type='button'
          onClick={reset}
          className='rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium dark:border-zinc-700 dark:bg-zinc-900'
        >
          {t('retry')}
        </button>
        <Link
          href='/projects'
          className='text-sm font-medium underline underline-offset-4'
        >
          {t('backToProjects')}
        </Link>
      </div>
    </div>
  )
}
