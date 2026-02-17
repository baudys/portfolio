'use client'

import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'

export const ThemeToggle = () => {
  return (
    <AnimatedThemeToggler className='inline-flex h-9 w-9 items-center justify-center rounded-md border border-transparent text-zinc-900 transition hover:bg-muted/70 dark:text-zinc-100' />
  )
}
