import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext.jsx";
import { formatCurrency } from "../../utils/formatCurrency.js";
import PageContainer from "../../components/layout/PageContainer.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import Button from "../../components/common/Button.jsx";

export function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  return (
    <PageContainer>
      <div className="mb-10 text-center max-w-xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-2">
          Private Selection
        </p>
        <h1 className="font-editorial text-3xl font-medium text-slate-900">
          Saved Wishlist ({wishlist.length})
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Creations reserved for future acquisition.
        </p>
      </div>

      {wishlist.length === 0 ? (
        <EmptyState
          title="Your Wishlist is Empty"
          description="Explore our curated collection to save pieces you admire."
          actionText="Discover Creations"
          actionLink="/shop"
          icon={Heart}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-slate-200 rounded-sm overflow-hidden flex flex-col justify-between shadow-subtle hover:shadow-card transition-all"
            >
              <div className="relative aspect-[4/5] bg-slate-50">
                <Link to={`/products/${product._id}`}>
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-rose-600 hover:bg-white transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
                <div>
                  <h3 className="font-editorial text-sm font-medium text-slate-900 line-clamp-1 hover:text-blue-600">
                    <Link to={`/products/${product._id}`}>{product.name}</Link>
                  </h3>
                  <p className="text-sm font-semibold text-slate-900 mt-1">
                    {formatCurrency(product.price)}
                  </p>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => addToCart(product, 1)}
                  className="w-full uppercase tracking-wider text-[11px]"
                  icon={ShoppingBag}
                >
                  Add to Bag
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageContainer>
  );
}

export default Wishlist;
