import { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Get in touch with me for collaboration opportunities, project inquiries, or just to say hello. I'm always open to discussing new ideas and creative projects.",
  keywords: [
    'Contact',
    'Get in Touch',
    'Collaboration',
    'Project Inquiries',
    'Hire Developer',
    'Freelance Work',
    'Web Development',
    'Creative Projects',
    'Portfolio Contact',
  ],
  openGraph: {
    title: 'Contact | Daniel Anthony Baudyš',
    description:
      'Get in touch with me for collaboration opportunities, project inquiries, or just to say hello.',
    url: 'https://baudys.dev/contact',
    siteName: siteConfig.name,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Daniel Anthony Baudyš Contact Page',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Daniel Anthony Baudyš',
    description:
      'Get in touch with me for collaboration opportunities, project inquiries, or just to say hello.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/contact',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main className='mt-28 lg:mt-32'>{children}</main>
}
