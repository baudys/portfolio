'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { flushSync } from 'react-dom'

import { cn } from '@/lib/utils'

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<'button'> {
  duration?: number
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const [isDark, setIsDark] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const isTransitioningRef = useRef(false)

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }

    updateTheme()

    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current || isTransitioningRef.current) return

    if (typeof document.startViewTransition !== 'function') {
      const newTheme = !isDark
      setIsDark(newTheme)
      document.documentElement.classList.toggle('dark')
      localStorage.setItem('theme', newTheme ? 'dark' : 'light')
      return
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReducedMotion) {
      const newTheme = !isDark
      setIsDark(newTheme)
      document.documentElement.classList.toggle('dark')
      localStorage.setItem('theme', newTheme ? 'dark' : 'light')
      return
    }

    isTransitioningRef.current = true
    const root = document.documentElement
    const { top, left, width, height } = buttonRef.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top),
    )

    root.style.setProperty('--theme-transition-x', `${x}px`)
    root.style.setProperty('--theme-transition-y', `${y}px`)

    try {
      const transition = document.startViewTransition(() => {
        flushSync(() => {
          const newTheme = !isDark
          setIsDark(newTheme)
          root.classList.toggle('dark')
          localStorage.setItem('theme', newTheme ? 'dark' : 'light')
        })
      })

      await transition.ready

      const animation = root.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        },
      )

      await animation.finished.catch(() => undefined)
      await transition.finished.catch(() => undefined)
    } finally {
      root.style.removeProperty('--theme-transition-x')
      root.style.removeProperty('--theme-transition-y')
      isTransitioningRef.current = false
    }
  }, [isDark, duration])

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(className)}
      {...props}
    >
      {isDark ? <Sun size={22} /> : <Moon size={22} />}
      <span className='sr-only'>Toggle theme</span>
    </button>
  )
}
