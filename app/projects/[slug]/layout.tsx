import { Metadata } from 'next'
import { projects } from '@/database/projects'
import { siteConfig } from '@/config/site'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = projects.filter((data: any) => data.slug === slug)[0]

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    }
  }

  return {
    title: `${project.name} | Daniel Anthony Baudyš`,
    description:
      project.descriptionEn ||
      project.descriptionCs ||
      `Explore ${project.name} - a web development project showcasing modern technologies and innovative solutions.`,
    keywords: [
      project.name,
      'Web Development',
      'Project',
      'Portfolio',
      'React',
      'Next.js',
      'Fullstack Development',
      'Web Application',
      ...(project.technologies || []),
    ],
    openGraph: {
      title: `${project.name} | Daniel Anthony Baudyš`,
      description:
        project.descriptionEn ||
        project.descriptionCs ||
        `Explore ${project.name} - a web development project.`,
      url: `https://baudys.dev/projects/${slug}`,
      siteName: siteConfig.name,
      images: [
        {
          url: project.images?.[0] || '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${project.name} Project Screenshot`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.name} | Daniel Anthony Baudyš`,
      description:
        project.descriptionEn ||
        project.descriptionCs ||
        `Explore ${project.name} - a web development project.`,
      images: [project.images?.[0] || '/og-image.jpg'],
    },
    alternates: {
      canonical: `/projects/${slug}`,
    },
  }
}

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
