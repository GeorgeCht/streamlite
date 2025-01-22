import { cn } from '@nextui-org/react'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'

import type { Metadata, Viewport } from 'next'

import MainWrapper from '@/components/layout/main-wrapper'
import MobileNavigation from '@/components/layout/mobile-navigation'
import Navigation from '@/components/layout/navigation'
import ProgressiveBackground from '@/components/layout/progressive-bg'
import Providers from '@/components/layout/providers'
import NoSsr from '@/components/misc/no-ssr'
import SearchBar from '@/components/search/searchbar'
import LoadingSpinner from '@/components/misc/spinner'

import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WMovies | by GeorgeCht',
  description: 'Watch your favorite movies online',
  keywords: 'movies, watch, streaming, streaming movies',
}

export const viewport: Viewport = {
  themeColor: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function LocaleLayout({
  children,
  modal,
  params: { locale },
}: {
  children: React.ReactNode
  modal: React.ReactNode
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)
  const messages = useMessages()

  return (
    <html lang={locale}>
      <body className={cn(inter.className, 'dark bg-black min-h-screen')}>
        <Suspense fallback={<LoadingSpinner />}>
          <NextIntlClientProvider messages={messages}>
            <Providers>
              <Suspense fallback={<LoadingSpinner />}>
                <Navigation />
                <div className={'w-full h-full'}>
                  <ProgressiveBackground />
                  <div
                    className={
                      'fixed block w-full h-full top-0 left-0 bg-gradient-to-t from-black to-black/40'
                    }
                  />
                  <MainWrapper>
                    <MobileNavigation />
                    <SearchBar />
                    <Suspense fallback={<LoadingSpinner />}>
                      {children}
                    </Suspense>
                    <NoSsr>{modal}</NoSsr>
                  </MainWrapper>
                </div>
              </Suspense>
            </Providers>
          </NextIntlClientProvider>
        </Suspense>
      </body>
    </html>
  )
}
