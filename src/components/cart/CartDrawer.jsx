import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import { formatCurrency } from "../../utils/formatCurrency.js";
import CartItem from "./CartItem.jsx";
import Button from "../common/Button.jsx";

export function CartDrawer() {
  const {
    items,
    totalItems,
    subtotal,
    isDrawerOpen,
    setIsDrawerOpen,
    updateQuantity,
    removeFromCart,
  } = useCart();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-950/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-elevated flex flex-col transform transition-transform duration-300">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-navy-900" />
              <h2 className="font-editorial text-lg font-medium text-slate-900">
                Shopping Bag ({totalItems})
              </h2>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-700 transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 divide-y divide-slate-100">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <ShoppingBag className="w-12 h-12 text-slate-300 stroke-[1.2] mb-3" />
                <p className="font-editorial text-base text-slate-700 mb-1">
                  Your bag is currently empty
                </p>
                <p className="text-xs text-slate-400 mb-6 max-w-xs">
                  Discover our timeless creations designed for discerning connoisseurs.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <CartItem
                  key={item.product._id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-slate-100 px-6 py-5 bg-slate-50 space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-xs uppercase tracking-wider text-slate-600 font-semibold">
                  Subtotal
                </span>
                <span className="text-xl font-editorial font-semibold text-slate-900">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Taxes and complimentary shipping calculated at checkout.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  to="/cart"
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-full"
                >
                  <Button variant="outline" size="md" className="w-full text-xs uppercase tracking-wider">
                    View Cart
                  </Button>
                </Link>
                <Link
                  to="/checkout"
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-full"
                >
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full text-xs uppercase tracking-wider"
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    Checkout
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartDrawer;
