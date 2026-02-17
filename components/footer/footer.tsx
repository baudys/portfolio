'use client'

import { motion } from 'framer-motion'
import { Github, Instagram, Linkedin, Youtube } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FaTiktok } from 'react-icons/fa6'
import { Container } from '../container'
import { FooterIcon } from './footer-icon'

export const Footer = () => {
  const t = useTranslations('footer')

  return (
    <footer className='pb-12 pt-8 lg:pt-12'>
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className='mb-14 flex justify-center gap-4'
        >
          <FooterIcon
            name='instagram'
            icon={Instagram}
            href='https://www.instagram.com/baudys.me/'
          />
          <FooterIcon
            name='tiktok'
            icon={FaTiktok}
            href='https://www.tiktok.com/@baudys.cars'
          />
          <FooterIcon
            name='youtube'
            icon={Youtube}
            href='https://www.youtube.com/channel/UCblA_CnykG2Dw_6IMwZ9z9A'
          />
          <FooterIcon
            name='linkedin'
            icon={Linkedin}
            href='https://www.linkedin.com/in/baudys/'
          />
          <FooterIcon
            name='github'
            icon={Github}
            href='https://www.github.com/baudys/'
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className='text-light mt-12 text-center text-xs sm:mt-4 md:text-base'
        >
          &copy;{new Date().getFullYear()} Daniel Anthony Baudyš. {t('rights')}
        </motion.p>
      </Container>
    </footer>
  )
}
