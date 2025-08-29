'use client'

import { Container } from '@/components/container'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/store/use-language'
import {
  Camera,
  FolderKanban,
  Github,
  Globe,
  Instagram,
  Linkedin,
  LucideIcon,
  Youtube,
} from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { IconType } from 'react-icons/lib'
import { FaTiktok } from 'react-icons/fa6'

interface LinkItemProps {
  icon: LucideIcon | IconType
  label: string
  href: string
  color?: string
}

const LinkItem: FC<LinkItemProps> = ({ icon: Icon, label, href, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className='w-full'
    >
      <Button
        className={cn(
          'w-full border border-zinc-200/50 text-lg font-semibold text-zinc-200 lg:w-1/2',
          color ? color : 'bg-zinc-800/80 text-zinc-200 hover:bg-zinc-900/70',
        )}
      >
        <Link
          href={href}
          target='_blank'
          className='inline-flex w-full items-center justify-center gap-2'
        >
          <Icon />
          {label}
        </Link>
      </Button>
    </motion.div>
  )
}

export default function Page() {
  const { language } = useLanguage()

  return (
    <Container className='flex w-full flex-col text-center'>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className='w-full'
      >
        <Avatar className='mx-auto mb-4 h-32 w-32 lg:h-60 lg:w-60'>
          <AvatarImage src='/links/avatar.webp' />
          <AvatarFallback className='text-3xl font-bold md:text-4xl lg:text-5xl'>
            DAB
          </AvatarFallback>
        </Avatar>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className='mb-1 text-xl font-bold md:text-2xl lg:text-3xl xl:text-4xl'
      >
        Daniel Anthony Baudyš
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className='mb-10 md:mb-14'
      >
        {language === 'en' && 'Programmer | Designer | Photographer'}
        {language === 'cs' && 'Programátor | Designer | Fotograf'}
      </motion.p>

      <div className='flex flex-col items-center justify-center space-y-3 md:space-y-4'>
        <LinkItem href='/' label='Web' icon={Globe} />
        <LinkItem
          href='/projects'
          label={language === 'en' ? 'Projects' : 'Projekty'}
          icon={FolderKanban}
        />
        <LinkItem
          href='/gallery'
          label={language === 'en' ? 'Gallery' : 'Galerie'}
          icon={Camera}
        />
        <LinkItem
          href='https://www.instagram.com/baudys.dev/'
          label='Instagram'
          icon={Instagram}
          color='bg-teal-600/80 hover:bg-teal-700/80'
        />
        <LinkItem
          href='https://www.tiktok.com/@baudys.dev'
          label='Tiktok'
          icon={FaTiktok}
          color='bg-teal-600/80 hover:bg-teal-700/80'
        />
        <LinkItem
          href='https://www.youtube.com/channel/UCblA_CnykG2Dw_6IMwZ9z9A'
          label='YouTube'
          icon={Youtube}
          color='bg-teal-600/80 hover:bg-teal-700/80'
        />
        <LinkItem
          href='https://www.linkedin.com/in/ton1czech/'
          label='Linkedin'
          icon={Linkedin}
          color='bg-teal-600/80 hover:bg-teal-700/80'
        />
        <LinkItem
          href='https://github.com/ton1czech/'
          label='Github'
          icon={Github}
          color='bg-fuchsia-700/80 hover:bg-fuchsia-800/80'
        />
      </div>
    </Container>
  )
}
