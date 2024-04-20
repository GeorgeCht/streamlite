'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './carousel'
import { Skeleton, cn } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { fetchData, formatLocale } from '@/lib/utils'
import { useInView } from 'framer-motion'
import { useLocale } from 'next-intl'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import MovieCard from './movie-card'

const MovieCarousel = ({
  mediaType = 'movie',
  id,
  query = '/recommendations',
  onModal = false,
  queryFlag = false,
  className,
}: {
  mediaType?: MediaType
  id?: string
  query?: string
  onModal?: boolean
  queryFlag?: boolean
  className?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    margin: '-80px',
  })
  const [api, setApi] = useState<CarouselApi>()
  const locale = useLocale()
  const joinString = query.includes('?') ? '&' : '?'
  const { isPending: loading, data } = useQuery({
    queryKey: [
      queryFlag
        ? `${query}${joinString}language=${formatLocale(locale)}`
        : `${mediaType}/${id}${query}${joinString}language=${formatLocale(locale)}`,
    ],
    queryFn: async () =>
      fetchData<Response<MovieResult>>(
        queryFlag
          ? `${query}${joinString}language=${formatLocale(locale)}`
          : `${mediaType}/${id}${query}${joinString}language=${formatLocale(locale)}`,
      ),
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: isInView,
  })

  useEffect(() => {
    if (!api) {
      return
    }
  }, [api])

  if (loading) {
    return (
      <React.Fragment>
        <div ref={ref} className={'flex w-full mb-6 overflow-hidden'}>
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              className={cn(
                'min-w-0 shrink-0 grow-0 basis-full',
                onModal
                  ? '!basis-[55%] sm:!basis-[33.333%] lg:pr-3 pr-2.5'
                  : '!basis-[55%] sm:!basis-[300px] lg:pr-6 pr-2.5',
              )}
              key={index}
            >
              <AspectRatio ratio={3 / 4.5} className={'mb-5'}>
                <Skeleton
                  className={'w-full h-full object-cover rounded-2xl'}
                />
              </AspectRatio>
              <Skeleton className={'w-[67%] rounded-lg *:rounded-lg'}>
                <div className={'h-4'} />
              </Skeleton>
            </div>
          ))}
        </div>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Carousel
        opts={{
          align: 'start',
          loop: false,
        }}
        setApi={setApi}
        className={cn(
          'group/carousel w-full sm:max-w-prefered max-w-[calc(100vw-32px)]',
          className,
        )}
      >
        <CarouselContent>
          {data?.results.map((movie) => (
            <React.Fragment key={movie.id}>
              {movie.poster_path !== null && (
                <CarouselItem
                  key={movie.id}
                  className={cn(
                    onModal
                      ? '!basis-[55%] sm:!basis-[33.333%] lg:pr-3 pr-2.5'
                      : '!basis-[55%] sm:!basis-[300px] lg:pr-6 pr-2.5',
                  )}
                >
                  <MovieCard
                    id={movie.id}
                    width={onModal ? 333 : 300}
                    height={onModal ? 500 : 450}
                    title={movie.title}
                    image={movie.poster_path}
                    releaseYear={movie.release_date.split('-')[0]}
                  />
                </CarouselItem>
              )}
            </React.Fragment>
          ))}
        </CarouselContent>
        <CarouselNext
          className={
            'group-hover/carousel:opacity-100 md:opacity-0 opacity-100 transition-opacity'
          }
        />
        <CarouselPrevious
          className={
            'group-hover/carousel:opacity-100 md:opacity-0 opacity-100 transition-opacity'
          }
        />
      </Carousel>
    </React.Fragment>
  )
}

export default MovieCarousel
