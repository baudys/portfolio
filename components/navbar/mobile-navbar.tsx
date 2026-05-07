'use client'

import { FC } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { MobileNavItem } from './mobile-nav-item'
import ShinyButton from '../ui/shiny-button'

interface MobileNavbarProps {
  setIsOpen: (bool: boolean) => void
}

export const MobileNavbar: FC<MobileNavbarProps> = ({ setIsOpen }) => {
  const t = useTranslations('nav')

  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{
        scaleY: 1,
        transition: {
          duration: 0.5,
          ease: [0.12, 0, 0.39, 0]
        }
      }}
      exit={{
        scaleY: 0,
        transition: {
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1]
        }
      }}
      className='fixed left-0 top-0 z-50 grid h-screen w-screen origin-top justify-between bg-background'
    >
      <X
        onClick={() => setIsOpen(false)}
        className='absolute right-6 top-6 cursor-pointer'
      />

      <motion.ul
        initial={{ y: 50, opacity: 0, x: '-50%' }}
        animate={{ y: 0, opacity: 1, x: '-50%' }}
        transition={{ delay: 0.5 }}
        className='absolute left-1/2 top-60 flex -translate-x-1/2 flex-col items-center gap-6 text-center'
      >
        <MobileNavItem
          label={t('projects')}
          href='/projects'
          setIsOpen={setIsOpen}
        />
        <MobileNavItem
          label={t('gallery')}
          href='/gallery'
          setIsOpen={setIsOpen}
        />

        <li onClick={() => setIsOpen(false)}>
          <Link href='/contact'>
            <ShinyButton className='flex flex-nowrap items-center gap-2 rounded-lg text-4xl'>
              {t('talk')}
              <ArrowRight className='h-8 w-8' />
            </ShinyButton>
          </Link>
        </li>
      </motion.ul>
    </motion.div>
  )
}
