import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CreditCard, Banknote, Lock, User } from "lucide-react";
import { useCart } from "../../context/CartContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import orderService from "../../services/orderService.js";
import { formatCurrency } from "../../utils/formatCurrency.js";
import PageContainer from "../../components/layout/PageContainer.jsx";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";

export function Checkout() {
  const { items, subtotal, shipping, tax, total, coupon, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: user?.addresses?.[0]?.phone || "+1 (555) 019-2834",
    street: user?.addresses?.[0]?.street || "128 Beacon Street, Penthouse 4",
    city: user?.addresses?.[0]?.city || "Boston",
    state: user?.addresses?.[0]?.state || "MA",
    postalCode: user?.addresses?.[0]?.postalCode || "02116",
    country: "United States",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod"); // 'cod' | 'test_card'
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderError, setOrderError] = useState("");

  useEffect(() => {
    if (items.length === 0) {
      navigate("/cart");
    }
  }, [items, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate("/login", { state: { from: { pathname: "/checkout" } } });
      return;
    }

    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.street.trim()) newErrors.street = "Street address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State/Province is required";
    if (!formData.postalCode.trim()) newErrors.postalCode = "Postal code is required";
    if (!formData.phone.trim()) newErrors.phone = "Contact phone is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setOrderError("");

    try {
      const payload = {
        items: items.map((item) => ({
          productId: item.product._id,
          quantity: item.quantity,
        })),
        shippingAddress: {
          fullName: formData.fullName,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
          phone: formData.phone,
        },
        paymentMethod,
        couponCode: coupon?.code,
      };

      const res = await orderService.createOrder(payload);
      if (res?.data) {
        clearCart();
        navigate("/order-success", { state: { order: res.data } });
      }
    } catch (err) {
      setOrderError(err.message || "Failed to finalize order. Please review information.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <div className="mb-10 text-center max-w-xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-2">
          Secure Finalization
        </p>
        <h1 className="font-editorial text-3xl font-medium text-slate-900">
          Client Checkout
        </h1>
      </div>

      {!isAuthenticated && (
        <div className="mb-8 p-4 bg-navy-950 text-white rounded-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-blue-400" />
            <p className="text-xs">
              Holding a ClickLanka profile? Sign in for rapid address pre-fill and order tracking.
            </p>
          </div>
          <Link to="/login" state={{ from: { pathname: "/checkout" } }}>
            <Button variant="secondary" size="sm" className="text-xs">
              Sign In
            </Button>
          </Link>
        </div>
      )}

      {orderError && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded">
          {orderError}
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Shipping Coordinates & Payment Method */}
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Address */}
          <div className="bg-white border border-slate-200/80 rounded-sm p-6 sm:p-8 shadow-subtle space-y-5">
            <h3 className="font-editorial text-lg font-medium text-slate-900 border-b border-slate-100 pb-3">
              1. Delivery Coordinates
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Recipient Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
                required
              />
              <Input
                label="Contact Telephone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                required
              />
            </div>

            <Input
              label="Street Address & Suite"
              name="street"
              value={formData.street}
              onChange={handleChange}
              error={errors.street}
              required
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Input
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                error={errors.city}
                required
              />
              <Input
                label="State / Province"
                name="state"
                value={formData.state}
                onChange={handleChange}
                error={errors.state}
                required
              />
              <div className="col-span-2 sm:col-span-1">
                <Input
                  label="Postal Code"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  error={errors.postalCode}
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white border border-slate-200/80 rounded-sm p-6 sm:p-8 shadow-subtle space-y-5">
            <h3 className="font-editorial text-lg font-medium text-slate-900 border-b border-slate-100 pb-3">
              2. Settlement Method
            </h3>

            <div className="space-y-3">
              {/* Cash on Delivery option */}
              <label
                className={`flex items-start gap-4 p-4 rounded-sm border cursor-pointer transition-colors ${
                  paymentMethod === "cod"
                    ? "border-navy-950 bg-slate-50 ring-1 ring-navy-950"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="mt-1 text-navy-900 focus:ring-navy-900"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Banknote className="w-4 h-4 text-slate-700" />
                    <span className="text-sm font-semibold text-slate-900">
                      Cash on Delivery (White-Glove Handover)
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Pay securely upon personal receipt and verification of the consignment.
                  </p>
                </div>
              </label>

              {/* Test Sandbox Card option */}
              <label
                className={`flex items-start gap-4 p-4 rounded-sm border cursor-pointer transition-colors ${
                  paymentMethod === "test_card"
                    ? "border-navy-950 bg-slate-50 ring-1 ring-navy-950"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="test_card"
                  checked={paymentMethod === "test_card"}
                  onChange={() => setPaymentMethod("test_card")}
                  className="mt-1 text-navy-900 focus:ring-navy-900"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-slate-700" />
                    <span className="text-sm font-semibold text-slate-900">
                      Sandbox Test Payment (Simulated Card Authorization)
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Instantly authorizes order in test environment without live card charge.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Consignment Review & Submit */}
        <div className="lg:col-span-1 bg-slate-50 border border-slate-200 rounded-sm p-6 space-y-6">
          <h3 className="font-editorial text-lg font-medium text-slate-900 border-b border-slate-200 pb-3">
            Consignment Review
          </h3>

          {/* Mini items list */}
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.product._id} className="flex gap-3 text-xs">
                <img
                  src={item.product.images?.[0]}
                  alt=""
                  className="w-12 h-14 object-cover rounded-xs border border-slate-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 truncate">
                    {item.product.name}
                  </p>
                  <p className="text-slate-500">
                    Qty: {item.quantity} × {formatCurrency(item.product.price)}
                  </p>
                </div>
                <div className="font-medium text-slate-900">
                  {formatCurrency(item.product.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="space-y-2 text-xs text-slate-600 border-t border-slate-200 pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-slate-900">{formatCurrency(subtotal)}</span>
            </div>
            {coupon && (
              <div className="flex justify-between text-emerald-600">
                <span>Promo ({coupon.code})</span>
                <span>-{formatCurrency(coupon.discountAmount || 0)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Logistics</span>
              <span>{shipping === 0 ? "Complimentary" : formatCurrency(shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax (8%)</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between items-baseline pt-2 border-t border-slate-200 text-sm font-semibold text-slate-900">
              <span>Grand Total</span>
              <span className="text-xl font-editorial font-bold">{formatCurrency(total)}</span>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            className="w-full uppercase tracking-widest text-xs font-semibold py-4"
            icon={Lock}
          >
            Authorize & Place Order
          </Button>

          <p className="text-[11px] text-center text-slate-400">
            Encrypted TLS transmission. Order totals calculated on server.
          </p>
        </div>
      </form>
    </PageContainer>
  );
}

export default Checkout;
