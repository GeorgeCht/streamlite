type ContentType = 'movie' | 'tvseries'

interface Source {
  source: {
    url: string
    requiresBlob?: boolean
  }
  server: string
  type: 'm3u8' | 'mp4' | 'mkv'
  quality:
    | '4K'
    | '1440p'
    | '1080p'
    | '808p'
    | '720p'
    | '480p'
    | '360p'
    | '240p'
    | '144p'
    | '720p/1080p'
    | 'Unknown'
  proxySettings?: {
    type: 'mp4' | 'm3u8'
    referer?: string
    origin?: string | null
    userAgent?: string
  }
  subtitles?: undefined
  thumbnails?: {
    url: string
    requiresBlob?: boolean
  }
  isVlc?: boolean
  labels?: {
    hasSubtitles?: boolean
  }
}

export interface Extractor {
  name?: string
  url: string
  referer?: string
  extractUrl?: (url: string, serverName?: string) => Promise<Source | undefined>
  extractUrls?: (
    imdbId: string,
    type: ContentType,
    season?: number,
    episode?: number,
  ) => Promise<Array<Source>>
}
