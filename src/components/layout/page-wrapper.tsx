'use client'

import HeroMovieDetails from '@/components/ui/hero-movie-details'
import React from 'react'

import { fetchData } from '@/lib/utils'
import { Skeleton, cn } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'

const PageWrapper = ({
  query,
  mediaType,
  multiple = false,
  showMoreInfo = true,
  className,
  children,
}: {
  query: string
  mediaType?: MediaType
  single?: boolean
  multiple?: boolean
  showMoreInfo?: boolean
  className?: string
  children?: React.ReactNode
}) => {
  const { data } = useQuery({
    queryKey: [`${query}`],
    queryFn: async () => fetchData<Response<MovieResult>>(`${query}`),
    staleTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  const random = Math.floor(Math.random() * 10)

  return (
    <React.Fragment>
      <div
        className={cn(
          'flex flex-col justify-end h-[50vh] min-h-[482px] xl:mb-24 lg:mb-20 mb-10',
          className,
        )}
      >
        {data ? (
          <React.Fragment>
            <HeroMovieDetails
              // @ts-expect-error: id is not infered
              id={multiple ? (data.results[random].id as number) : data.id}
              mediaType={
                multiple ? data.results[random].media_type : mediaType!
              }
              showMoreInfo={showMoreInfo}
            />
          </React.Fragment>
        ) : (
          <div className={'flex flex-col lg:w-[1024px] w-full gap-1 z-20'}>
            <div className={'w-full max-w-[596px]'}>
              <div className={'flex gap-2 pb-3'}>
                <Skeleton className={'rounded-full *:rounded-full w-24'}>
                  <div className={'w-24 h-8'} />
                </Skeleton>
                <Skeleton className={'rounded-full *:rounded-full w-20'}>
                  <div className={'w-20 h-8'} />
                </Skeleton>
              </div>
              <Skeleton
                className={
                  'rounded-lg *:rounded-lg mb-10 w-full sm:w-[27rem] h-12'
                }
              />
              <div className={'space-y-3 mb-10'}>
                <Skeleton
                  className={'w-full sm:w-[90%] h-4 rounded-lg *:rounded-lg'}
                />
                <Skeleton
                  className={'w-full sm:w-[94%] h-4 rounded-lg *:rounded-lg'}
                />
                <Skeleton
                  className={'w-full sm:w-[92%] h-4 rounded-lg *:rounded-lg'}
                />
              </div>
              <div className={'flex gap-3'}>
                <Skeleton className={'w-56 h-16 rounded-full *:rounded-full'} />
                {showMoreInfo && (
                  <Skeleton
                    className={' w-48 h-16 rounded-full *:rounded-full '}
                  />
                )}
                <Skeleton className={'rounded-full *:rounded-full h-16'}>
                  <div className={'w-16 h-16'} />
                </Skeleton>
              </div>
            </div>
          </div>
        )}
      </div>
      {children}
    </React.Fragment>
  )
}

export default PageWrapper
