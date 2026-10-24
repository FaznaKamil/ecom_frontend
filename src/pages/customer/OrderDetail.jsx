import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import orderService from "../../services/orderService.js";
import { formatCurrency } from "../../utils/formatCurrency.js";
import { formatDateTime } from "../../utils/formatDate.js";
import Loader from "../../components/common/Loader.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";

export function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrder() {
      setIsLoading(true);
      setError("");
      try {
        const res = await orderService.getOrderById(id);
        if (res?.data) setOrder(res.data);
      } catch (err) {
        setError(err.message || "Failed to retrieve order details");
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrder();
  }, [id]);

  if (isLoading) return <Loader text="Loading order dossier..." />;
  if (error || !order) {
    return (
      <div className="bg-white p-8 rounded border border-slate-200">
        <ErrorMessage message={error || "Order not found"} />
        <div className="text-center mt-4">
          <Link to="/account/orders" className="text-xs text-navy-900 font-semibold hover:underline">
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const statuses = ["pending", "processing", "shipped", "delivered"];
  const currentIdx = statuses.indexOf(order.orderStatus);

  return (
    <div className="bg-white border border-slate-200/80 rounded-sm p-6 sm:p-8 shadow-subtle space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <Link
            to="/account/orders"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-500 hover:text-navy-950 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Orders</span>
          </Link>
          <h2 className="font-editorial text-2xl font-medium text-slate-900">
            Order Dossier {order.orderNumber}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Registered on {formatDateTime(order.createdAt)}
          </p>
        </div>

        {order.trackingNumber && (
          <div className="p-3 bg-slate-50 border border-slate-200 rounded text-right">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
              Logistics Tracking
            </span>
            <span className="font-mono text-xs font-bold text-slate-800">
              {order.trackingNumber}
            </span>
          </div>
        )}
      </div>

      {/* Status Timeline */}
      {order.orderStatus !== "cancelled" ? (
        <div className="py-4">
          <p className="text-xs uppercase tracking-wider font-semibold text-slate-700 mb-6">
            Transit Pipeline
          </p>
          <div className="grid grid-cols-4 gap-2 text-center relative">
            {statuses.map((st, idx) => {
              const isPastOrCurrent = currentIdx >= idx;
              return (
                <div key={st} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-2 transition-colors ${
                      isPastOrCurrent
                        ? "bg-navy-900 text-white"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <span className="text-[11px] uppercase font-semibold text-slate-800 tracking-wider">
                    {st}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded text-xs font-semibold uppercase tracking-wider text-center">
          Order Status: Cancelled
        </div>
      )}

      {/* Items Table */}
      <div className="space-y-4">
        <h3 className="font-editorial text-lg font-medium text-slate-900">
          Commissioned Pieces
        </h3>
        <div className="border border-slate-200 rounded-sm divide-y divide-slate-100">
          {order.items?.map((item, idx) => (
            <div key={idx} className="p-4 flex items-center gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-20 object-cover rounded-xs border border-slate-100"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-slate-900 truncate">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500">
                  Quantity: {item.quantity} × {formatCurrency(item.price)}
                </p>
              </div>
              <div className="text-sm font-semibold text-slate-900 text-right">
                {formatCurrency(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Financials & Delivery Coordinates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-100 text-xs">
        {/* Recipient Details */}
        <div className="space-y-2">
          <h4 className="font-editorial text-base font-medium text-slate-900">
            Delivery Address
          </h4>
          <p className="font-semibold text-slate-800">{order.shippingAddress?.fullName}</p>
          <p className="text-slate-600">{order.shippingAddress?.street}</p>
          <p className="text-slate-600">
            {order.shippingAddress?.city}, {order.shippingAddress?.state}{" "}
            {order.shippingAddress?.postalCode}
          </p>
          <p className="text-slate-600">{order.shippingAddress?.country}</p>
          <p className="text-slate-500 pt-1">Phone: {order.shippingAddress?.phone}</p>
        </div>

        {/* Breakdown */}
        <div className="space-y-2.5 bg-slate-50 p-5 rounded border border-slate-200">
          <h4 className="font-editorial text-base font-medium text-slate-900 mb-2">
            Settlement Summary
          </h4>
          <div className="flex justify-between text-slate-600">
            <span>Items Subtotal</span>
            <span>{formatCurrency(order.itemsPrice)}</span>
          </div>
          {order.discountAmount > 0 && (
            <div className="flex justify-between text-emerald-600">
              <span>Promotional Discount</span>
              <span>-{formatCurrency(order.discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between text-slate-600">
            <span>Insured Shipping</span>
            <span>{order.shippingPrice === 0 ? "Complimentary" : formatCurrency(order.shippingPrice)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Sales Tax</span>
            <span>{formatCurrency(order.taxPrice)}</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
            <span>Total Authorized</span>
            <span className="font-editorial text-base">{formatCurrency(order.totalPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
