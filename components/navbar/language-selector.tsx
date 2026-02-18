'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'
import { Command, CommandGroup, CommandItem } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from '@/i18n/navigation'
import type { AppLocale } from '@/i18n/locales'
import { cn } from '@/lib/utils'

const languages: Array<{ value: AppLocale; src: string; label: string }> = [
  { value: 'cs', src: '/flags/cs.svg', label: 'Čeština' },
  { value: 'en', src: '/flags/en.svg', label: 'English' },
  { value: 'es', src: '/flags/es.svg', label: 'Español' },
]

const LanguageSelector = () => {
  const t = useTranslations('nav')
  const locale = useLocale() as AppLocale
  const pathname = usePathname()
  const router = useRouter()
  const params = useParams()
  const [open, setOpen] = useState<boolean>(false)

  const pushPreservingScroll = (targetLocale: AppLocale): void => {
    if (pathname === '/projects/[slug]') {
      const slug = params.slug

      if (typeof slug === 'string') {
        router.push(
          {
            pathname,
            params: { slug },
          },
          { locale: targetLocale, scroll: false },
        )
        return
      }
    }

    if (pathname === '/') {
      router.push('/', { locale: targetLocale, scroll: false })
      return
    }

    if (pathname === '/projects') {
      router.push('/projects', { locale: targetLocale, scroll: false })
      return
    }

    if (pathname === '/gallery') {
      router.push('/gallery', { locale: targetLocale, scroll: false })
      return
    }

    if (pathname === '/contact') {
      router.push('/contact', { locale: targetLocale, scroll: false })
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          name={t('language')}
          aria-label={t('language')}
          aria-expanded={open}
          className='w-[64px] border-none bg-transparent p-0'
        >
          <Image
            src={
              languages.find((item) => item.value === locale)?.src ??
              '/flags/en.svg'
            }
            width={30}
            height={20}
            alt={locale}
            className='h-5 w-[30px] rounded-sm'
          />
          <ChevronsUpDown className='my-2 ml-1 size-4 shrink-0 text-zinc-900 dark:text-zinc-100' />
        </Button>
      </PopoverTrigger>

      <PopoverContent className='z-[1001] w-[170px] p-2 backdrop-blur-lg'>
        <Command className='!bg-transparent'>
          <CommandGroup className='space-y-2'>
            {languages.map(({ src, value, label }) => (
              <CommandItem
                key={value}
                onSelect={() => {
                  if (value === locale) {
                    setOpen(false)
                    return
                  }

                  pushPreservingScroll(value)
                  setOpen(false)
                }}
                className='mb-2 grid w-full cursor-pointer grid-cols-[16px_30px_1fr] items-center gap-2 hover:!bg-muted-foreground/10'
              >
                <Check
                  className={cn(
                    'h-4 w-4 text-zinc-900 dark:text-zinc-100',
                    locale === value ? 'opacity-100' : 'opacity-0',
                  )}
                />
                <Image
                  src={src}
                  width={30}
                  height={20}
                  alt={value}
                  className='h-5 w-[30px] rounded-sm'
                />
                <span className='text-sm'>{label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default LanguageSelector
