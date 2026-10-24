export function ProductSort({ value = "createdAt", onChange, totalItems = 0 }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 border-b border-slate-100">
      <p className="text-xs text-slate-500 uppercase tracking-widest font-medium">
        Showing <span className="font-semibold text-slate-900">{totalItems}</span> Luxury Masterpieces
      </p>

      <div className="flex items-center gap-2">
        <label htmlFor="product-sort-select" className="text-xs uppercase tracking-wider text-slate-500 shrink-0">
          Sort By:
        </label>
        <select
          id="product-sort-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-xs font-medium text-slate-900 bg-white border border-slate-200 rounded px-3 py-1.5 focus:outline-none focus:border-navy-900 cursor-pointer"
        >
          <option value="createdAt">Newest Arrivals</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Customer Rating</option>
        </select>
      </div>
    </div>
  );
}

export default ProductSort;
