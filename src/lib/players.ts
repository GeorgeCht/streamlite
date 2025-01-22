interface ServerPlayer {
  title: string
  source: string
}

export function getSourcePlayers<T extends MediaType>(
  id: string,
  mediaType: T,
  season?: T extends 'movie' ? undefined : string,
  episode?: T extends 'movie' ? undefined : string,
): Array<ServerPlayer> {
  return mediaType === 'movie'
    ? [
        {
          title: 'VidLink',
          source: `https://vidlink.pro/movie/${id}?primaryColor=006fee&autoplay=false`,
        },
        {
          title: '<Embed>',
          source: `https://embed.su/embed/movie/${id}`,
        },
        {
          title: 'SuperEmbed',
          source: `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1`,
        },
        {
          title: 'FilmKu',
          source: `https://filmku.stream/embed/${id}`,
        },
        {
          title: 'NontonGo',
          source: `https://www.nontongo.win/embed/movie/${id}`,
        },
        {
          title: 'AutoEmbed',
          source: `https://autoembed.co/movie/tmdb/${id}`,
        },
        {
          title: '2Embed',
          source: `https://www.2embed.cc/embed/${id}`,
        },
        {
          title: 'VidSrc 1',
          source: `https://vidsrc.xyz/embed/movie/${id}`,
        },
        {
          title: 'VidSrc 2',
          source: `https://vidsrc.to/embed/movie/${id}`,
        },
        {
          title: 'MoviesAPI',
          source: `https://moviesapi.club/movie/${id}`,
        },
      ]
    : [
        {
          title: 'VidLink',
          source: `https://vidlink.pro/tv/${id}/${season}/${episode}`,
        },
        {
          title: '<Embed>',
          source: `https://embed.su/embed/tv/${id}/${season}/${episode}`,
        },
        {
          title: 'SuperEmbed',
          source: `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1&s=${season}&e=${episode}`,
        },
        {
          title: 'FilmKu',
          source: `https://filmku.stream/embed/series?tmdb=${id}&sea=${season}&epi=${episode}`,
        },
        {
          title: 'NontonGo',
          source: `https://www.NontonGo.win/embed/tv/${id}/${season}/${episode}`,
        },
        {
          title: 'AutoEmbed',
          source: `https://autoembed.co/tv/tmdb/${id}-${season}-${episode}`,
        },
        {
          title: '2Embed',
          source: `https://www.2embed.cc/embedtv/${id}&s=${season}&e=${episode}`,
        },
        {
          title: 'VidSrc 1',
          source: `https://vidsrc.xyz/embed/tv/${id}/${season}/${episode}`,
        },
        {
          title: 'VidSrc 2',
          source: `https://vidsrc.to/embed/tv/${id}/${season}/${episode}`,
        },
        {
          title: 'MoviesAPI',
          source: `https://moviesapi.club/tv/${id}/${season}/${episode}`,
        },
      ]
}
