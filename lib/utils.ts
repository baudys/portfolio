import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function seedRandom(seed: number) {
  let m = 0x80000000,
    a = 1103515245,
    c = 12345

  seed = seed % m

  return function () {
    seed = (a * seed + c) % m
    return seed / m
  }
}

export function shuffle<T>(array: T[], seed: number): T[] {
  const random = seedRandom(seed)

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }

  return array
}
