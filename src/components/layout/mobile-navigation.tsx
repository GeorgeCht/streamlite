'use client'

import React, {
  type DetailedHTMLProps,
  type HTMLAttributes,
  useState,
} from 'react'

import { Link } from '@/components/i18n/navigation'
import { animateVariants } from '@/lib/utils'
import { Button, cn } from '@nextui-org/react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { Github, Menu, X } from 'lucide-react'
import { useTranslations } from 'next-intl'

import LangSwitch from '@/components/i18n/lang-switch'

const MobileNavigation = ({
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  const [showMenu, setShowMenu] = useState(false)
  const t = useTranslations('footer')
  const tNav = useTranslations('navigation')

  return (
    <React.Fragment>
      <AnimatePresence mode={'wait'}>
        {showMenu && (
          <Motion.div
            key={'tv-series-controlls'}
            {...animateVariants({
              initial: {
                opacity: 0,
                transition: { duration: 0.275 },
              },
              enter: {
                opacity: 1,
                transition: { duration: 0.275 },
              },
              exit: {
                opacity: 0,
                transition: {
                  delay: 0.085,
                  duration: 0.275,
                  ease: 'easeOut',
                },
              },
            })}
            className={
              'bg-black fixed lg:hidden top-0 left-0 w-full h-full z-50'
            }
          >
            <div className={'flex flex-col gap-5 p-7'}>
              <div>
                <img
                  src={'/icon-512x512.png'}
                  alt={'logo'}
                  className={'size-16'}
                />
                <ul className={'flex flex-col gap-2.5 pt-10'}>
                  <li
                    className={
                      'text-white text-3xl font-semibold tracking-tighter leading-none'
                    }
                  >
                    <Link href={'/movies'} onClick={() => setShowMenu(false)}>
                      {tNav('movies')}
                    </Link>
                  </li>
                  <li
                    className={
                      'text-white text-3xl font-semibold tracking-tighter leading-none'
                    }
                  >
                    <Link
                      href={'/tv-series'}
                      onClick={() => setShowMenu(false)}
                    >
                      {tNav('tv')}
                    </Link>
                  </li>
                  <li
                    className={
                      'text-white text-3xl font-semibold tracking-tighter leading-none'
                    }
                  >
                    <Link href={'/trending'} onClick={() => setShowMenu(false)}>
                      {tNav('trending')}
                    </Link>
                  </li>
                  <li
                    className={
                      'text-white text-3xl font-semibold tracking-tighter leading-none'
                    }
                  >
                    <Link href={'/search'} onClick={() => setShowMenu(false)}>
                      {tNav('search')}
                    </Link>
                  </li>
                </ul>
              </div>
              <div className={'flex flex-col gap-4'}>
                <div className={'mt-10'}>
                  <span className={'inline-block'}>
                    <Link
                      href={'https://github.com/georgecht/streamlite'}
                      target={'_blank'}
                      className={'group relative inline-block'}
                    >
                      <Github
                        width={24}
                        height={24}
                        className={
                          'group-hover:opacity-100 transition-all opacity-60'
                        }
                      />
                    </Link>
                  </span>
                </div>
                <div className={'flex flex-col gap-0.5'}>
                  <p className={'text-sm sm:text-[15px] cursor-default'}>
                    ©{new Date().getFullYear()} Streamlite. By GeorgeCht.
                  </p>
                  <ul className={'flex gap-2.5 child:text-white/50'}>
                    <li className={'text-sm sm:text-[15px]'}>
                      <Link
                        href={'https://github.com/georgecht/streamlite/issues'}
                        target={'_blank'}
                      >
                        {t('feedback')}
                      </Link>
                    </li>
                    <li className={'text-sm sm:text-[15px]'}>
                      <Link href={'/'} target={'_blank'}>
                        {t('disclaimer')}
                      </Link>
                    </li>
                  </ul>
                </div>
                <LangSwitch extended />
              </div>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
      <nav
        className={cn(
          'lg:hidden block fixed top-0 right-0 z-50 lg:py-8 py-5 xl:px-24 px-4 lg:px-16',
          className,
        )}
        {...props}
      >
        <Button
          aria-label={'Toggle menu'}
          onClick={() => setShowMenu((state) => !state)}
          className={
            'text-white backdrop-blur backdrop-blur-fix z-[999] rounded-full bg-white/10 px-0 py-3 !w-12 min-w-12 !h-12 min-h-12'
          }
        >
          {showMenu ? (
            <X className={'w-6 h-6 z-10'} />
          ) : (
            <Menu className={'w-6 h-6 z-10'} />
          )}
          <span className={'sr-only'}>Toggle menu</span>
        </Button>
      </nav>
    </React.Fragment>
  )
}

export default MobileNavigation
