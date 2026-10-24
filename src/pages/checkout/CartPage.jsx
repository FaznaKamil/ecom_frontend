import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext.jsx";
import CartItem from "../../components/cart/CartItem.jsx";
import CartSummary from "../../components/cart/CartSummary.jsx";
import PageContainer from "../../components/layout/PageContainer.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";

export function CartPage() {
  const { items, totalItems, updateQuantity, removeFromCart, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <PageContainer>
        <EmptyState
          title="Your Shopping Bag is Empty"
          description="You have not yet added any creations to your selection."
          actionText="Explore Boutique"
          actionLink="/shop"
          icon={ShoppingBag}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">
            Curated Selection
          </p>
          <h1 className="font-editorial text-2xl sm:text-3xl font-medium text-slate-900">
            Shopping Bag ({totalItems} {totalItems === 1 ? "Item" : "Items"})
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-slate-400 hover:text-rose-600 transition-colors"
        >
          Clear All Items
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Items List */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-sm p-6 shadow-subtle divide-y divide-slate-100">
          {items.map((item) => (
            <CartItem
              key={item.product._id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />
          ))}

          <div className="pt-6 mt-6 flex items-center justify-between">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-slate-600 hover:text-navy-950 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Browsing Boutique</span>
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <CartSummary />
        </div>
      </div>
    </PageContainer>
  );
}

export default CartPage;
