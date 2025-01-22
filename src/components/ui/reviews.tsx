import { fetchData, formatVoteCount } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import React from "react";
import ReviewCarousel from "./review-carousel";

const Reviews = ({
  mediaType,
  id,
  onModal = false,
}: {
  mediaType: MediaType;
  id: string;
  onModal?: boolean;
}) => {
  const { isPending: reviewsLoading, data: reviewsData } = useQuery({
    queryKey: [`${mediaType}/${id}/reviews`],
    queryFn: async () => fetchData<Review>(`${mediaType}/${id}/reviews`),
    staleTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { data: detailsData } = useQuery({
    queryKey: [`${mediaType}/${id}/details`],
    queryFn: async () =>
      fetchData<MovieDetailsWithImageAndVideos | TvDetailsWithImageAndVideos>(
        `${mediaType}/${id}`
      ),
    staleTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const tMessage = useTranslations("messages");
  const tTitle = useTranslations("titles");

  return (
    <React.Fragment>
      {detailsData && (
        <div className={"flex justify-between w-full items-end"}>
          <div className={"flex items-end gap-2 w-1/3"}>
            <h3
              className={
                "md:text-6xl sm:text-5xl text-[2.5rem] font-semibold leading-none tracking-tighter cursor-default -mb-1.5"
              }
            >
              {detailsData?.vote_average!.toFixed(1) || "N/A"}
            </h3>
            <span
              className={
                "text-sm font-medium text-white/50 leading-none cursor-default"
              }
            >
              {tMessage("out_of_10")}
            </span>
          </div>
          <span
            className={
              "flex justify-end w-1/3 text-xs font-semibold text-white/50 leading-none pt-1 cursor-default"
            }
          >
            {formatVoteCount(detailsData?.vote_count!) || "N/A"}{" "}
            {tMessage("ratings")} • {reviewsData?.total_results}{" "}
            {tTitle("reviews")}
          </span>
        </div>
      )}
      <ReviewCarousel
        loading={reviewsLoading}
        data={reviewsData}
        onModal={onModal}
      />
    </React.Fragment>
  );
};

export default Reviews;
