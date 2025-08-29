import { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Magazine',
  description:
    'Explore my magazine featuring photography books, creative projects, and personal experiences. Discover stories behind my work and creative journey.',
  keywords: [
    'Magazine',
    'Photography Books',
    'Creative Projects',
    'Personal Experience',
    'Creative Journey',
    'Photography Stories',
    'Creative Portfolio',
    'Artistic Work',
    'Visual Stories',
  ],
  openGraph: {
    title: 'Magazine | Daniel Anthony Baudyš',
    description:
      'Explore my magazine featuring photography books, creative projects, and personal experiences.',
    url: 'https://baudys.dev/magazine',
    siteName: siteConfig.name,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Daniel Anthony Baudyš Magazine',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Magazine | Daniel Anthony Baudyš',
    description:
      'Explore my magazine featuring photography books, creative projects, and personal experiences.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/magazine',
  },
}

export default function MagazineLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
