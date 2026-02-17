'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Camera, ExternalLink } from 'lucide-react'

interface CursorProps {
  type: 'project' | 'external' | 'photo'
  children: React.ReactNode
}

export const Cursor = ({ type, children }: CursorProps) => {
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const pendingPositionRef = useRef<{ x: number; y: number } | null>(null)
  const frameIdRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (frameIdRef.current !== null) {
        window.cancelAnimationFrame(frameIdRef.current)
      }
    }
  }, [])

  const setCursorPosition = (x: number, y: number): void => {
    const cursorElement = cursorRef.current

    if (!cursorElement) {
      return
    }

    cursorElement.style.setProperty('--cursor-x', `${x - 40}px`)
    cursorElement.style.setProperty('--cursor-y', `${y - 40}px`)
  }

  const applyCursorPosition = (x: number, y: number): void => {
    pendingPositionRef.current = { x, y }

    if (frameIdRef.current !== null) {
      return
    }

    frameIdRef.current = window.requestAnimationFrame(() => {
      frameIdRef.current = null

      const cursorElement = cursorRef.current
      const nextPosition = pendingPositionRef.current

      if (!cursorElement || !nextPosition) {
        return
      }

      setCursorPosition(nextPosition.x, nextPosition.y)
    })
  }

  return (
    <div
      onMouseEnter={(event) => {
        setCursorPosition(event.clientX, event.clientY)
        setIsHovering(true)
        applyCursorPosition(event.clientX, event.clientY)
      }}
      onMouseMove={(event) => {
        applyCursorPosition(event.clientX, event.clientY)
      }}
      onMouseLeave={() => setIsHovering(false)}
      className='!cursor-none'
    >
      {children}
      <div
        ref={cursorRef}
        className='pointer-events-none fixed left-0 top-0 z-[9998] hidden rounded-full backdrop-blur-lg sm:block'
        style={{
          height: 80,
          width: 80,
          opacity: isHovering ? 1 : 0,
          transform: 'translate3d(var(--cursor-x, -100px), var(--cursor-y, -100px), 0)',
          transition: 'opacity 0.2s ease',
        }}
      >
        <div
          className={`pointer-events-none absolute inset-0 z-[9999] grid h-full w-full place-content-center rounded-full border border-zinc-300/70 bg-black/40 transition-transform duration-200 ${
            isHovering ? 'scale-100' : 'scale-0'
          }`}
        >
          {type === 'project' && <ArrowRight className='stroke-white' />}
          {type === 'external' && <ExternalLink className='stroke-white' />}
          {type === 'photo' && <Camera className='stroke-white' />}
        </div>
      </div>
    </div>
  )
}
