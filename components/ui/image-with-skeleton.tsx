'use client'

import Image, { type ImageProps } from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ImageWithSkeletonProps extends Omit<ImageProps, 'alt'> {
  alt: string
  wrapperClassName?: string
  skeletonClassName?: string
}

export const ImageWithSkeleton = ({
  alt,
  wrapperClassName,
  skeletonClassName,
  className,
  onLoad,
  onError,
  ...props
}: ImageWithSkeletonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  return (
    <div className={cn('relative overflow-hidden rounded-[inherit]', wrapperClassName)}>
      <Image
        {...props}
        alt={alt}
        onLoad={(event) => {
          setIsLoading(false)
          onLoad?.(event)
        }}
        onError={(event) => {
          setIsLoading(false)
          onError?.(event)
        }}
        className={cn(
          'transition-opacity duration-500',
          isLoading ? 'opacity-0' : 'opacity-100',
          className,
        )}
      />

      <div
        className={cn(
          'pointer-events-none absolute inset-0 transition-opacity duration-500',
          isLoading ? 'opacity-100' : 'opacity-0',
          skeletonClassName,
        )}
        aria-hidden='true'
      >
        <div className='skeleton-shimmer h-full w-full rounded-[inherit] bg-muted/40' />
      </div>
    </div>
  )
}
