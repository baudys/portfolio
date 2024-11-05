import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface MarqueeProps {
  children: ReactNode
  className?: string
}

export const Marquee: React.FC<MarqueeProps> = ({ children, className }) => {
  return (
    <div className={cn('z-10 w-full overflow-hidden', className)}>
      <div className='relative flex overflow-hidden py-1'>
        <div className='animate-marquee flex w-max [--duration:30s]'>
          {children}
          {children}
        </div>
      </div>
    </div>
  )
}
