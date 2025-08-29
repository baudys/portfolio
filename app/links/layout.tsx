import { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Links',
  description:
    'Quick access to my social media profiles, portfolio links, and professional networks. Connect with me across different platforms.',
  keywords: [
    'Links',
    'Social Media',
    'Professional Networks',
    'Portfolio Links',
    'Social Profiles',
    'Connect',
    'Professional Links',
    'Social Networks',
  ],
  openGraph: {
    title: 'Links | Daniel Anthony Baudyš',
    description:
      'Quick access to my social media profiles, portfolio links, and professional networks.',
    url: 'https://baudys.dev/links',
    siteName: siteConfig.name,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Daniel Anthony Baudyš Links Page',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Links | Daniel Anthony Baudyš',
    description:
      'Quick access to my social media profiles, portfolio links, and professional networks.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/links',
  },
}

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
