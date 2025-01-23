import React from 'react'

import WatchWrapper from '@/components/layout/watch-wrapper'
import MediaPlayer from '@/components/ui/media-player'

export async function generateMetadata({
  params: { id },
}: { params: { id: string } }) {
  const data: Response<TvResult> = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env
      .NEXT_PUBLIC_TMDB_API_KEY!}`,
  )
  const tv: TvResult = await data.json()
  return {
    title: `${tv.name} | Streamlite`,
  }
}

const Page = ({
  params,
}: {
  params: { id: string; season: string; episode: string }
}) => {
  return (
    <React.Fragment>
      <WatchWrapper />
      <MediaPlayer
        mediaType={'tv'}
        id={params.id}
        season={params.season}
        episode={params.episode}
      />
    </React.Fragment>
  )
}

export default Page
