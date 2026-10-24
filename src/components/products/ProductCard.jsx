import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { useCart } from "../../context/CartContext.jsx";
import { formatCurrency } from "../../utils/formatCurrency.js";
import ProductRating from "./ProductRating.jsx";

export function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  if (!product) return null;

  const inWishlist = isInWishlist(product._id);
  const isOutOfStock = product.stock <= 0;
  const isSale = product.compareAtPrice && product.compareAtPrice > product.price;
  const mainImage = product.images?.[0] || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80";
  const categoryName = typeof product.category === "object" ? product.category?.name : "Exclusive";

  return (
    <div className="group relative flex flex-col bg-white border border-slate-100 rounded-sm overflow-hidden transition-all duration-300 hover:shadow-card hover:border-slate-200">
      {/* Product Image Stage */}
      <div className="relative aspect-[4/5] bg-slate-50 overflow-hidden">
        <Link to={`/products/${product._id}`} className="block w-full h-full">
          <img
            src={mainImage}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {isOutOfStock ? (
            <span className="px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider bg-slate-900 text-white rounded-xs">
              Sold Out
            </span>
          ) : isSale ? (
            <span className="px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider bg-amber-500 text-slate-950 rounded-xs shadow-xs">
              Special Offer
            </span>
          ) : product.isNewArrival ? (
            <span className="px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider bg-blue-600 text-white rounded-xs shadow-xs">
              New Arrival
            </span>
          ) : null}
        </div>

        {/* Action Buttons Floating Overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={() => toggleWishlist(product)}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors shadow-sm ${
              inWishlist
                ? "bg-rose-50 text-rose-600 hover:bg-rose-100"
                : "bg-white/90 backdrop-blur-xs text-slate-700 hover:bg-white hover:text-navy-950"
            }`}
          >
            <Heart className={`w-4 h-4 ${inWishlist ? "fill-rose-600" : ""}`} />
          </button>

          <Link
            to={`/products/${product._id}`}
            aria-label="Quick view"
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs text-slate-700 hover:bg-white hover:text-navy-950 flex items-center justify-center transition-colors shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>

        {/* Quick Add Button Reveal on Hover */}
        {!isOutOfStock && (
          <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <button
              onClick={() => addToCart(product, 1)}
              className="w-full py-2.5 bg-blue-600/95 hover:bg-blue-700 text-white text-xs uppercase tracking-widest font-semibold rounded-xs shadow-md backdrop-blur-xs flex items-center justify-center gap-2 transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Quick Add</span>
            </button>
          </div>
        )}
      </div>

      {/* Product Content */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold mb-1 truncate">
          {categoryName}
        </p>

        <h3 className="font-editorial text-base font-medium text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-1.5">
          <Link to={`/products/${product._id}`}>{product.name}</Link>
        </h3>

        <div className="mb-3">
          <ProductRating rating={product.rating || 5} count={product.numReviews} size="sm" />
        </div>

        <div className="mt-auto flex items-baseline gap-2">
          <span className="text-sm font-semibold text-slate-900 tracking-tight">
            {formatCurrency(product.price)}
          </span>
          {isSale && (
            <span className="text-xs text-slate-400 line-through">
              {formatCurrency(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
