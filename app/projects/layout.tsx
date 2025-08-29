import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore my portfolio of fullstack development projects including web applications, mobile apps, and innovative digital solutions built with React, Next.js, and modern technologies.',
  keywords: [
    'Projects',
    'Portfolio',
    'Web Applications',
    'React Projects',
    'Next.js Projects',
    'Fullstack Development',
    'Web Development Projects',
    'Mobile Apps',
    'Digital Solutions',
  ],
  openGraph: {
    title: 'Projects | Daniel Anthony Baudyš',
    description:
      'Explore my portfolio of fullstack development projects including web applications, mobile apps, and innovative digital solutions.',
    url: 'https://baudys.dev/projects',
    siteName: siteConfig.name,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Daniel Anthony Baudyš Projects Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Daniel Anthony Baudyš',
    description:
      'Explore my portfolio of fullstack development projects including web applications, mobile apps, and innovative digital solutions.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/projects',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main className='mt-28 lg:mt-32'>{children}</main>
}
