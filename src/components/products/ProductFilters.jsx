import { RotateCcw } from "lucide-react";
import Button from "../common/Button.jsx";

export function ProductFilters({
  categories = [],
  selectedCategory,
  onSelectCategory,
  priceRange,
  onPriceChange,
  onResetFilters,
  hasActiveFilters,
}) {
  return (
    <aside className="w-full space-y-8 divide-y divide-slate-100">
      {/* Category Filter */}
      <div className="pt-2">
        <h4 className="text-xs uppercase tracking-widest font-semibold text-slate-900 mb-4">
          Categories
        </h4>
        <ul className="space-y-2 text-sm">
          <li>
            <button
              onClick={() => onSelectCategory("")}
              className={`w-full text-left py-1 transition-colors ${
                !selectedCategory
                  ? "font-semibold text-navy-950 underline underline-offset-4"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Collections
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat._id}>
              <button
                onClick={() => onSelectCategory(cat.slug || cat._id)}
                className={`w-full text-left py-1 transition-colors ${
                  selectedCategory === (cat.slug || cat._id)
                    ? "font-semibold text-navy-950 underline underline-offset-4"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div className="pt-6">
        <h4 className="text-xs uppercase tracking-widest font-semibold text-slate-900 mb-4">
          Price Range (USD)
        </h4>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-2.5 top-2 text-xs text-slate-400">$</span>
            <input
              type="number"
              placeholder="Min"
              min="0"
              value={priceRange.min}
              onChange={(e) => onPriceChange("min", e.target.value)}
              className="w-full pl-6 pr-2 py-1.5 text-xs rounded border border-slate-200 focus:outline-none focus:border-navy-900"
            />
          </div>
          <span className="text-slate-300">—</span>
          <div className="relative flex-1">
            <span className="absolute left-2.5 top-2 text-xs text-slate-400">$</span>
            <input
              type="number"
              placeholder="Max"
              min="0"
              value={priceRange.max}
              onChange={(e) => onPriceChange("max", e.target.value)}
              className="w-full pl-6 pr-2 py-1.5 text-xs rounded border border-slate-200 focus:outline-none focus:border-navy-900"
            />
          </div>
        </div>
      </div>

      {/* Reset Filter Button */}
      {hasActiveFilters && (
        <div className="pt-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onResetFilters}
            icon={RotateCcw}
            className="w-full text-xs text-slate-500 hover:text-slate-900"
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </aside>
  );
}

export default ProductFilters;
