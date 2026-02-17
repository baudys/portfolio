'use client'

import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'

interface BreadcrumbProps {
  base: string
  href: '/projects'
  current: string
}

export const Breadcrumb = ({ base, href, current }: BreadcrumbProps) => {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className='mb-4 inline-flex items-center gap-2 text-zinc-400'
    >
      <Link href={href} className='hover:underline'>
        {base}
      </Link>
      <ChevronRight size={18} />
      <span className='font-bold'>{current}</span>
    </motion.p>
  )
}
