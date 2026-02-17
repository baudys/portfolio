import { LucideIcon } from 'lucide-react'
import { FC } from 'react'
import { IconType } from 'react-icons/lib'

interface FooterIconProps {
  icon: LucideIcon | IconType
  href: string
  name: string
}

export const FooterIcon: FC<FooterIconProps> = ({ icon: Icon, href, name }) => {
  return (
    <a href={href} target='_blank' rel='noopener noreferrer'>
      <Icon className='h-6 w-6 stroke-zinc-500 text-zinc-500 transition hover:stroke-zinc-700 hover:text-zinc-700 dark:stroke-zinc-400 dark:text-zinc-400 dark:hover:stroke-zinc-600 dark:hover:text-zinc-600' />
      <p className='sr-only'>{name}</p>
    </a>
  )
}
