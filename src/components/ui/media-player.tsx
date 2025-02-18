'use client'

import React, {
  type DetailedHTMLProps,
  type HTMLAttributes,
  useState,
} from 'react'

import { useScreenSize } from '@/lib/hooks'
import { animateVariants, fetchData, formatLocale } from '@/lib/utils'
import { cn } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useIdle } from '@uidotdev/usehooks'
import { motion as Motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { useLocale } from 'next-intl'
import { useRouter } from '@/components/i18n/navigation'

import LoadingSpinner from '@/components/misc/spinner'
import Title from '@/components/ui/title'
import { useSourceStore } from '@/stores/source'

const MediaPlayer = ({
  mediaType,
  id,
  season,
  episode,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  mediaType: MediaType
  id: string
  season?: string
  episode?: string
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const router = useRouter()
  const idle = useIdle(4000)
  const screenSize = useScreenSize()
  const locale = useLocale()

  const { getSource } = useSourceStore()

  const queryFn =
    mediaType === 'movie'
      ? fetchData<MovieDetailsWithImageAndVideos>(
          `${mediaType}/${id}?language=${formatLocale(locale)}`,
        )
      : fetchData<TvDetailsWithImageAndVideos>(
          `${mediaType}/${id}?language=${formatLocale(locale)}`,
        )

  const { data } = useQuery({
    queryKey: [`${mediaType}/${id}/details?language=${formatLocale(locale)}`],
    queryFn: async () => queryFn,
    staleTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  return (
    <React.Fragment>
      {!isLoaded && <LoadingSpinner />}
      <div
        aria-hidden={isLoaded ? 'false' : 'true'}
        aria-label={'media-wrapper'}
        className={cn(
          'absolute h-screen w-screen top-0 left-0 z-0 bg-black opacity-0 transition-all !duration-1000',
          isLoaded ? 'opacity-100' : 'opacity-0',
          idle
            ? 'w-screen lg:-translate-x-24'
            : 'lg:w-[calc(100vw-96px)] lg:translate-x-0',
          className,
        )}
        {...props}
      >
        <iframe
          title={data?.original_title ?? 'media-player'}
          className={'w-full h-screen'}
          onLoadedData={() => setIsLoaded(true)}
          onLoad={() => setIsLoaded(true)}
          src={getSource(id, mediaType, season, episode).source}
          allowFullScreen
        />
      </div>
      {data && (
        <Motion.div
          aria-label={'media-titlebar'}
          key={`media-namebar-${id}`}
          {...animateVariants({
            initial: {
              transition: {
                delay: 1,
              },
              opacity: 0,
            },
            enter: {
              transition: {
                delay: 1,
              },
              opacity: 1,
            },
            exit: {
              opacity: 0,
              transition: {
                delay: 1,
                ease: 'easeOut',
              },
            },
          })}
        >
          <div
            className={cn(
              'absolute flex items-start w-screen h-36 top-0 left-0 z-10 px-3 md:px-9 pt-7',
              'bg-gradient-to-b from-black from-25% via-black/60 via-60% to-transparent transition-all !duration-1000',
              idle && screenSize.width >= 768
                ? 'opacity-0 -translate-x-24'
                : 'opacity-100 translate-x-0',
            )}
          >
            <div className={'flex items-center gap-4'}>
              <button
                type={'button'}
                aria-label={'Back'}
                onClick={() => router.back()}
              >
                <ChevronLeft className={'md:w-10 md:h-10 w-8 h-8'} />
              </button>
              <Title onModal className={'!p-0'}>
                {/* @ts-ignore */}
                {mediaType === 'movie' ? data?.title! : data?.name!}
                {season && episode && ` — S${season}E${episode}`}
              </Title>
            </div>
          </div>
        </Motion.div>
      )}
    </React.Fragment>
  )
}

export default MediaPlayer
