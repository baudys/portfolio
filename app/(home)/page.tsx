import { Metadata } from 'next'
import { Contact } from '@/components/contact'
import { Gallery } from '@/components/home/gallery'
import { Hero } from '@/components/home/hero'
import { Projects } from '@/components/home/projects'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Welcome to my portfolio showcasing fullstack development projects, photography, and creative work. Explore my skills in React, Next.js, and modern web technologies.',
  keywords: [
    'Portfolio',
    'Home',
    'Fullstack Developer',
    'React Developer',
    'Next.js Developer',
    'Web Development',
    'Photography',
    'Creative Portfolio',
  ],
  openGraph: {
    title: 'Daniel Anthony Baudyš - Fullstack Developer Portfolio',
    description:
      'Welcome to my portfolio showcasing fullstack development projects, photography, and creative work.',
    url: 'https://baudys.dev',
    siteName: siteConfig.name,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Daniel Anthony Baudyš Portfolio Homepage',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daniel Anthony Baudyš - Fullstack Developer Portfolio',
    description:
      'Welcome to my portfolio showcasing fullstack development projects, photography, and creative work.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/',
  },
}

export default function Page() {
  return (
    <main className='mt-28 space-y-20 lg:mt-32 lg:space-y-40'>
      <Hero />
      <Projects />
      <Gallery />
      <Contact />
    </main>
  )
}
