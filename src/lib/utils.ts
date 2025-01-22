import ky from "ky";
import type { Variants } from "framer-motion";

export const animateVariants = (variants: Variants) => {
  return {
    variants,
    initial: "initial",
    animate: "enter",
    exit: "exit",
  };
};

export const convertScore = (score: number) => {
  return score >= 8.5
    ? 5
    : score >= 7.5
    ? 4
    : Math.round((score / 10) * 5 * 10) / 10;
};

export const formatVoteCount = (voteCount: number) => {
  if (voteCount >= 1000) {
    const countInK = voteCount / 1000;
    return `${countInK.toFixed(1)}k`;
  }
  return voteCount.toString();
};

export const fetchData = async <T>(query: string): Promise<T> => {
  const joinString = query.includes("?") ? "&" : "?";
  const data = await ky(
    `https://api.themoviedb.org/3/${query}${joinString}api_key=${process.env
      .NEXT_PUBLIC_TMDB_API_KEY!}`,
    {
      retry: {
        limit: 0,
      },
      timeout: 3000,
    }
  ).json();
  return data as T;
};

export const getVideoTrailer = (
  videoResults: Array<VideoResult>
): VideoResult => {
  let result: VideoResult | undefined = undefined;
  videoResults.forEach((video) => {
    if (video.type === "Trailer" || video.type === "trailer") {
      result = video;
    }
  });

  return result || videoResults[0];
};

export const formatDuration = (duration: number, h = "h", m = "m"): string => {
  if (duration < 60) {
    return `${duration}${m}`;
  }
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  if (minutes > 0) {
    return `${hours}${h}${minutes}${m}`;
  }
  return `${hours}${h}`;
};

export const formatDateDifference = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();

  const millisecondsDifference = date.getTime() - now.getTime();
  const secondsDifference = Math.abs(millisecondsDifference) / 1000;
  const minutesDifference = secondsDifference / 60;
  const hoursDifference = minutesDifference / 60;
  const daysDifference = hoursDifference / 24;
  const monthsDifference = daysDifference / 30;
  const yearsDifference = daysDifference / 365;

  if (millisecondsDifference > 0) {
    if (yearsDifference >= 1) {
      return `${Math.floor(yearsDifference)} year${
        Math.floor(yearsDifference) !== 1 ? "s" : ""
      } from now`;
    }
    if (monthsDifference >= 1) {
      return `${Math.floor(monthsDifference)} month${
        Math.floor(monthsDifference) !== 1 ? "s" : ""
      } from now`;
    }
    if (daysDifference >= 1) {
      return `${Math.floor(daysDifference)} day${
        Math.floor(daysDifference) !== 1 ? "s" : ""
      } from now`;
    }
    if (hoursDifference >= 1) {
      return `${Math.floor(hoursDifference)} hour${
        Math.floor(hoursDifference) !== 1 ? "s" : ""
      } from now`;
    }
    if (minutesDifference >= 1) {
      return `${Math.floor(minutesDifference)} minute${
        Math.floor(minutesDifference) !== 1 ? "s" : ""
      } from now`;
    }
    return `${Math.floor(secondsDifference)} second${
      Math.floor(secondsDifference) !== 1 ? "s" : ""
    } from now`;
  }
  if (millisecondsDifference < 0) {
    if (yearsDifference >= 1) {
      return `${Math.floor(yearsDifference)} year${
        Math.floor(yearsDifference) !== 1 ? "s" : ""
      } ago`;
    }
    if (monthsDifference >= 1) {
      return `${Math.floor(monthsDifference)} month${
        Math.floor(monthsDifference) !== 1 ? "s" : ""
      } ago`;
    }
    if (daysDifference >= 1) {
      return `${Math.floor(daysDifference)} day${
        Math.floor(daysDifference) !== 1 ? "s" : ""
      } ago`;
    }
    if (hoursDifference >= 1) {
      return `${Math.floor(hoursDifference)} hour${
        Math.floor(hoursDifference) !== 1 ? "s" : ""
      } ago`;
    }
    if (minutesDifference >= 1) {
      return `${Math.floor(minutesDifference)} minute${
        Math.floor(minutesDifference) !== 1 ? "s" : ""
      } ago`;
    }
    return `${Math.floor(secondsDifference)} second${
      Math.floor(secondsDifference) !== 1 ? "s" : ""
    } ago`;
  }
  return "Just now";
};

export const truncate = (input: string, maxLength: number): string =>
  input.length <= maxLength
    ? input
    : `${input.slice(0, input.lastIndexOf(" ", maxLength) || maxLength)}...`;

export const findLastCanonUrl = (urls: string[]) => {
  // Reverse the array to start from the last URL
  const reversedUrls = urls.slice().reverse();

  // Find the index of the last URL that does not include '/movie/' or '/tv/'
  const lastIndex = reversedUrls.findIndex(
    (url) => !url.includes("/movie/") && !url.includes("/tv/")
  );

  // If lastIndex is -1, it means all URLs contain '/movie/' or '/tv/'
  if (lastIndex === -1) {
    return undefined;
  }

  // Get the URL using the index found and reverse it back to original order
  const lastNonMediaUrl = reversedUrls[lastIndex];

  return lastNonMediaUrl;
};

export const detectNullSeasons = (
  seasons: Array<Season>,
  prefix = "season-"
) => {
  const seasonsWithNullAirDate: Array<string> = [];
  seasons.forEach((season) => {
    if (!season.air_date || new Date(season.air_date) > new Date()) {
      seasonsWithNullAirDate.push(`${prefix}${season.season_number}`);
    }
  });
  return seasonsWithNullAirDate;
};

export const parseSeasonAndEpisode = (url: string) => {
  const match = url.match(/^\/tv\/\d+\/watch\/(\d+)\/(\d+)/);
  if (match) {
    const season = Number.parseInt(match[1], 10);
    const episode = Number.parseInt(match[2], 10);
    return [season, episode];
  }
  return null;
};

export const getNextEpisodeUrl = (url: string): string => {
  const parts = url.split("/");
  const episode = Number.parseInt(parts[parts.length - 1]) + 1;
  parts[parts.length - 1] = episode.toString();
  return parts.join("/");
};

export const formatLocale = (locale: string) => {
  switch (locale) {
    case "en":
      return "en-US";
    case "de":
      return "de-DE";
    case "es":
      return "es-ES";
    case "el":
      return "el-GR";
    case "zh":
      return "zh-CN";
    case "ko":
      return "ko-KR";
    case "ja":
      return "ja-JP";
    default:
      throw new Error("Invalid locale provided");
  }
};
