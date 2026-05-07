'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ArrowRightIcon, MenuIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { Link, useRouter } from '@/i18n/navigation'
import { MobileNavbar } from './mobile-navbar'
import { NavItem } from './nav-item'
import LanguageSelector from './language-selector'
import { ThemeToggle } from './theme-toggle'
import ShinyButton from '../ui/shiny-button'
import { ImageWithSkeleton } from '../ui/image-with-skeleton'

export const Navbar = () => {
  const t = useTranslations('nav')
  const router = useRouter()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isTopOfTheScreen, setIsTopOfTheScreen] = useState<boolean>(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfTheScreen(true)
        return
      }

      setIsTopOfTheScreen(false)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    void router.prefetch('/gallery')
    void router.prefetch('/projects')
  }, [router])

  return (
    <>
      <nav className='fixed left-0 right-0 top-5 z-50 mx-auto grid h-14 items-center rounded-xl px-4 transition lg:max-w-screen-lg 2xl:max-w-screen-xl'>
        <div
          className={cn(
            'flex h-full w-full items-center justify-between rounded-xl border border-transparent px-2',
            !isTopOfTheScreen &&
              'border-muted-foreground/30 bg-zinc-100/60 shadow-sm backdrop-blur-lg dark:bg-zinc-800/40'
          )}
        >
          <Link
            href='/'
            className='transition duration-300'
          >
            <ImageWithSkeleton
              src='/logo.webp'
              alt='Daniel Anthony Baudyš logo'
              width={48}
              height={48}
              className='h-12 w-12 transition hover:rotate-6 hover:scale-[103%]'
              wrapperClassName='h-12 w-12'
            />
          </Link>

          <div className='hidden items-center md:flex'>
            <div className='flex items-center gap-2'>
              <ThemeToggle />
              <LanguageSelector />
            </div>

            <hr className='ml-6 mr-8 h-8 w-px bg-muted-foreground/70' />

            <ul className='flex items-center gap-6'>
              <NavItem
                label={t('projects')}
                href='/projects'
              />
              <NavItem
                label={t('gallery')}
                href='/gallery'
              />
              <li>
                <Link href='/contact'>
                  <ShinyButton className='flex items-center gap-1 text-base'>
                    <div className='mr-2 size-3.5 rounded-full bg-green-500' />
                    {t('talk')}
                    <ArrowRightIcon className='h-4 w-4' />
                  </ShinyButton>
                </Link>
              </li>
            </ul>
          </div>

          <div className='flex items-center gap-2 md:hidden'>
            <ThemeToggle />
            <LanguageSelector />
            <MenuIcon
              onClick={() => setIsOpen(true)}
              className='cursor-pointer'
            />
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && <MobileNavbar setIsOpen={setIsOpen} />}
      </AnimatePresence>
    </>
  )
}
