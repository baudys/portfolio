import { unstable_noStore as noStore } from 'next/cache'
import { gallery } from '@/database/gallery'
import { shuffleArray } from '@/lib/utils'
import { GalleryClient } from './gallery-client'

export default function GalleryPage() {
  noStore()
  const orderedGallery = shuffleArray(gallery)

  return <GalleryClient orderedGallery={orderedGallery} />
}
