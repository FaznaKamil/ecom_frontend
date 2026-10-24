import { useState } from "react";

export function ProductGallery({ images = [], title = "Product" }) {
  const displayImages = images.length > 0 ? images : ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80"];
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnail Strip */}
      {displayImages.length > 1 && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[580px] shrink-0 scrollbar-none py-1">
          {displayImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedIdx(index)}
              className={`relative w-16 h-20 md:w-20 md:h-24 rounded-xs overflow-hidden border transition-all shrink-0 ${
                selectedIdx === index
                  ? "border-navy-950 ring-1 ring-navy-950 shadow-sm"
                  : "border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-300"
              }`}
              aria-label={`View image ${index + 1} of ${displayImages.length}`}
            >
              <img src={img} alt={`${title} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Main Image Stage */}
      <div className="relative flex-1 aspect-[4/5] bg-slate-50 rounded-sm border border-slate-100 overflow-hidden group">
        <img
          src={displayImages[selectedIdx]}
          alt={`${title} view ${selectedIdx + 1}`}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </div>
  );
}

export default ProductGallery;
