import { useState } from "react";
import { Link } from "react-router-dom";
import { Tag, ArrowRight, Check, X } from "lucide-react";
import { useCart } from "../../context/CartContext.jsx";
import { formatCurrency } from "../../utils/formatCurrency.js";
import Button from "../common/Button.jsx";

export function CartSummary({ showCheckoutButton = true }) {
  const {
    subtotal,
    shipping,
    tax,
    total,
    coupon,
    couponError,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [inputCode, setInputCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    setIsApplying(true);
    await applyCoupon(inputCode.trim());
    setIsApplying(false);
    setInputCode("");
  };

  const discountAmount = coupon
    ? coupon.discountType === "percentage"
      ? (subtotal * coupon.discountRate) / 100
      : Math.min(coupon.discountAmount, subtotal)
    : 0;

  const freeShippingThreshold = 500;
  const progressToFreeShipping = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-sm p-6 space-y-6">
      <h3 className="font-editorial text-lg font-medium text-slate-900 border-b border-slate-200 pb-3">
        Order Summary
      </h3>

      {/* Free Shipping Tracker */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-slate-600">
          <span>
            {subtotal >= freeShippingThreshold ? (
              <span className="text-emerald-700 font-medium">
                Complimentary White-Glove Shipping Unlocked
              </span>
            ) : (
              `Add ${formatCurrency(freeShippingThreshold - subtotal)} more for free delivery`
            )}
          </span>
          <span className="font-semibold">{progressToFreeShipping}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-navy-900 transition-all duration-500"
            style={{ width: `${progressToFreeShipping}%` }}
          />
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="space-y-3 text-sm text-slate-600 border-b border-slate-200 pb-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium text-slate-900">{formatCurrency(subtotal)}</span>
        </div>

        {coupon && (
          <div className="flex justify-between text-emerald-600">
            <span className="flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" />
              <span>Promo ({coupon.code})</span>
            </span>
            <span>-{formatCurrency(discountAmount)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Estimated Delivery</span>
          <span className="font-medium text-slate-900">
            {shipping === 0 ? "Complimentary" : formatCurrency(shipping)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Estimated Sales Tax (8%)</span>
          <span className="font-medium text-slate-900">{formatCurrency(tax)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-baseline pt-1">
        <span className="text-base font-semibold text-slate-900">Grand Total</span>
        <span className="text-2xl font-editorial font-semibold text-slate-900">
          {formatCurrency(total)}
        </span>
      </div>

      {/* Coupon Form */}
      <div>
        {coupon ? (
          <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Coupon <strong>{coupon.code}</strong> active</span>
            </span>
            <button
              onClick={removeCoupon}
              className="p-1 hover:text-rose-600"
              aria-label="Remove coupon"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleApply} className="flex gap-2">
            <input
              type="text"
              placeholder="Promotional Code"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.toUpperCase())}
              className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded uppercase tracking-wider focus:outline-none focus:border-navy-900"
            />
            <Button
              type="submit"
              variant="outline"
              size="sm"
              isLoading={isApplying}
              disabled={!inputCode.trim()}
            >
              Apply
            </Button>
          </form>
        )}
        {couponError && <p className="text-xs text-rose-500 mt-1.5">{couponError}</p>}
      </div>

      {/* Checkout Button */}
      {showCheckoutButton && (
        <Link to="/checkout" className="block w-full">
          <Button
            variant="primary"
            size="lg"
            className="w-full uppercase tracking-widest text-xs font-semibold py-3.5"
            icon={ArrowRight}
            iconPosition="right"
            disabled={subtotal <= 0}
          >
            Proceed to Checkout
          </Button>
        </Link>
      )}
    </div>
  );
}

export default CartSummary;
