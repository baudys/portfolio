'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

interface SeeAllProps {
  href: '/projects' | '/gallery'
}

export const SeeAll = ({ href }: SeeAllProps) => {
  const t = useTranslations('common')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <Link
        href={href}
        prefetch
        className='relative flex items-center gap-2 text-lg font-semibold text-muted-foreground after:absolute after:-bottom-1 after:left-0 after:right-0 after:z-10 after:h-[3px] after:w-full after:origin-left after:scale-x-0 after:rounded-lg after:bg-muted-foreground after:opacity-0 after:transition after:hover:scale-x-100 after:hover:opacity-100'
      >
        {t('seeAll')}
        <ArrowRight className='h-5 w-5 stroke-muted-foreground' />
      </Link>
    </motion.div>
  )
}
