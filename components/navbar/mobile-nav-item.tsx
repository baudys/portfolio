import { cn } from '@/lib/utils'
import { FC } from 'react'
import { Link, usePathname } from '@/i18n/navigation'

interface MobileNavItemProps {
  label: string
  href: '/' | '/projects' | '/gallery' | '/contact'
  setIsOpen: (bool: boolean) => void
}

export const MobileNavItem: FC<MobileNavItemProps> = ({
  label,
  href,
  setIsOpen,
}) => {
  const pathname = usePathname()
  const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <li>
      <Link
        href={href}
        onClick={() => setIsOpen(false)}
        className={cn(
          'relative text-4xl font-medium after:absolute after:-bottom-1 after:left-0 after:right-0 after:z-10 after:h-[3px] after:w-full after:scale-x-0 after:rounded-lg after:bg-muted-foreground after:opacity-0 after:transition after:hover:scale-x-100 after:hover:opacity-100',
          isActive && 'font-bold',
        )}
      >
        {label}
      </Link>
    </li>
  )
}
