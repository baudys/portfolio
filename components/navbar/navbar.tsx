'use client'

import { NavItem } from './nav-item'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import LanguageSelector from './language-selector'
import Link from 'next/link'
import { ArrowRightIcon, MenuIcon } from 'lucide-react'
import { useLanguage } from '@/store/use-language'
import { AnimatePresence } from 'framer-motion'
import { MobileNavbar } from './mobile-navbar'
import ShinyButton from '../ui/shiny-button'
import { ThemeToggle } from './theme-toggle'

export const Navbar = () => {
  const { language } = useLanguage()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isTopOfTheScreen, setIsTopOfTheScreen] = useState<boolean>(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfTheScreen(true)
      }
      if (window.scrollY !== 0) setIsTopOfTheScreen(false)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav
        className={cn(
          'fixed left-0 right-0 top-5 z-50 mx-auto grid h-14 items-center rounded-xl px-4 transition lg:max-w-screen-lg 2xl:max-w-screen-xl',
        )}
      >
        <div
          className={cn(
            'flex h-full w-full items-center justify-between rounded-xl border border-transparent px-2',
            !isTopOfTheScreen &&
              'border-muted-foreground/30 bg-zinc-100/60 shadow-sm backdrop-blur-lg dark:bg-zinc-800/40',
          )}
        >
          <Link href='/' className='transition duration-300'>
            <img
              src='/logo.webp'
              alt='logo'
              className='h-12 w-12 transition hover:rotate-6 hover:scale-[103%]'
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
                label={language === 'en' ? 'Projects' : 'Projekty'}
                href='/projects'
              />
              <NavItem
                label={language === 'en' ? 'Gallery' : 'Galerie'}
                href='/gallery'
              />
              <li>
                <Link href='/contact'>
                  <ShinyButton className='flex items-center gap-1 text-base'>
                    <div className='mr-2 size-3.5 rounded-full bg-green-500' />
                    {language === 'en' && <>Let&apos;s talk</>}
                    {language === 'cs' && <>Promluvme si</>}
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
