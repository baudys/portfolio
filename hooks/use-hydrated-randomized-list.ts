'use client'

import { useEffect, useMemo, useState } from 'react'
import { shuffle } from '@/lib/utils'

const createRandomSeed = (): number => {
  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
    const randomBuffer = new Uint32Array(1)
    crypto.getRandomValues(randomBuffer)

    return randomBuffer[0] ?? Date.now()
  }

  return Date.now()
}

export const useHydratedRandomizedList = <TItem>(
  items: TItem[],
): TItem[] => {
  const [seed, setSeed] = useState<number | null>(null)

  useEffect(() => {
    setSeed(createRandomSeed())
  }, [])

  return useMemo(() => {
    if (seed === null) {
      return items
    }

    return shuffle([...items], seed)
  }, [items, seed])
}
