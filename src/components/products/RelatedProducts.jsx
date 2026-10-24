import ProductCard from "./ProductCard.jsx";

export function RelatedProducts({ products = [], title = "You May Also Admire" }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="mt-20 pt-12 border-t border-slate-200">
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-2">
          Curated Recommendations
        </p>
        <h2 className="font-editorial text-2xl md:text-3xl font-medium text-slate-900">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default RelatedProducts;
