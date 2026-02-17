import { getTranslations } from 'next-intl/server'
import { Contact } from '@/components/contact'

interface ContactPageProps {
  params: Promise<{ locale: string }>
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.contact' })

  return (
    <div className='space-y-20 lg:space-y-40'>
      <h1 className='sr-only'>{t('title')}</h1>

      <Contact />
    </div>
  )
}
