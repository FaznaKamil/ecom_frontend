import ProductCard from "./ProductCard.jsx";

export function ProductGrid({ products = [], isLoading = false, skeletonCount = 8 }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: skeletonCount }).map((_, idx) => (
          <div key={idx} className="bg-white border border-slate-100 rounded-sm overflow-hidden animate-pulse">
            <div className="aspect-[4/5] bg-slate-200" />
            <div className="p-4 space-y-3">
              <div className="h-2.5 bg-slate-200 rounded w-1/3" />
              <div className="h-4 bg-slate-200 rounded w-3/4" />
              <div className="h-3 bg-slate-200 rounded w-1/2" />
              <div className="h-4 bg-slate-200 rounded w-1/4 mt-2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
