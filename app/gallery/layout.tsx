import { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Browse my photography portfolio featuring automotive photography, landscapes, portraits, and creative visual storytelling. Explore my passion for capturing moments through the lens.',
  keywords: [
    'Photography',
    'Gallery',
    'Automotive Photography',
    'Landscape Photography',
    'Portrait Photography',
    'Creative Photography',
    'Visual Storytelling',
    'Photography Portfolio',
    'Artistic Photography',
  ],
  openGraph: {
    title: 'Gallery | Daniel Anthony Baudyš',
    description:
      'Browse my photography portfolio featuring automotive photography, landscapes, portraits, and creative visual storytelling.',
    url: 'https://baudys.dev/gallery',
    siteName: siteConfig.name,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Daniel Anthony Baudyš Photography Gallery',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gallery | Daniel Anthony Baudyš',
    description:
      'Browse my photography portfolio featuring automotive photography, landscapes, portraits, and creative visual storytelling.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/gallery',
  },
}

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
