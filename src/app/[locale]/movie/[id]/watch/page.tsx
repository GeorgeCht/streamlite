import React from 'react'

import WatchWrapper from '@/components/layout/watch-wrapper'
import MediaPlayer from '@/components/ui/media-player'

export async function generateMetadata({
  params: { id },
}: { params: { id: string } }) {
  const data: Response<MovieResult> = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env
      .NEXT_PUBLIC_TMDB_API_KEY!}`,
  )
  const movie: MovieResult = await data.json()
  const year = new Date(movie.release_date).getFullYear()
  return {
    title: `${movie.title}, ${year} | Streamlite`,
  }
}

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <React.Fragment>
      <WatchWrapper />
      <MediaPlayer mediaType={'movie'} id={params.id} />
    </React.Fragment>
  )
}

export default Page
