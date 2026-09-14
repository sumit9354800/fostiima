import { Quote, Star } from "lucide-react";
import type { Review } from "@/data/reviews";

type ReviewCardProps = {
  review: Review;
};

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="group relative flex h-full min-h-[270px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#102a56] via-[#c31e3b] to-[#eab308]" />

      {/* Quote */}
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#102a56]/5 text-[#c31e3b]">
          <Quote className="h-5 w-5" />
        </div>

        {/* Rating */}
        <div
          className="flex items-center gap-0.5"
          aria-label={`${review.rating} out of 5 stars`}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`h-4 w-4 ${
                index < review.rating
                  ? "fill-[#eab308] text-[#eab308]"
                  : "text-slate-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Review */}
      <p className="mt-5 line-clamp-5 text-sm leading-7 text-slate-600">
        “{review.review}”
      </p>

      {/* Student */}
      <div className="mt-auto border-t border-slate-100 pt-5">
        <p className="text-sm font-bold text-[#102a56]">
          {review.name}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          {review.programme} • {review.batch}
        </p>
      </div>
    </article>
  );
}