import { Star } from "lucide-react";

export function ProductRating({ rating = 0, count, showCount = true, size = "sm" }) {
  const numericRating = Number(rating) || 0;
  const starSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const starSize = starSizes[size] || starSizes.sm;

  return (
    <div className="flex items-center gap-1.5" aria-label={`Rating: ${numericRating} out of 5 stars`}>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= Math.round(numericRating)
                ? "text-amber-400 fill-amber-400"
                : "text-slate-200 fill-slate-200"
            }`}
          />
        ))}
      </div>
      {showCount && count !== undefined && (
        <span className="text-xs text-slate-500 font-normal">
          ({count})
        </span>
      )}
    </div>
  );
}

export default ProductRating;
