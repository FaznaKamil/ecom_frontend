import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Package, ArrowRight, Clock } from "lucide-react";
import orderService from "../../services/orderService.js";
import { formatCurrency } from "../../utils/formatCurrency.js";
import { formatDate } from "../../utils/formatDate.js";
import Loader from "../../components/common/Loader.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import Button from "../../components/common/Button.jsx";

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await orderService.getMyOrders();
        if (res?.data) setOrders(res.data);
      } catch (err) {
        console.error("Failed to load customer orders", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (isLoading) {
    return <Loader text="Retrieving order history..." />;
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white border border-slate-200/80 rounded-sm p-8 shadow-subtle">
        <EmptyState
          title="No Orders on Record"
          description="You have not yet commissioned any creations with the Maison."
          actionText="Browse Boutique"
          actionLink="/shop"
          icon={Package}
        />
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const map = {
      pending: "bg-slate-100 text-slate-700",
      processing: "bg-blue-50 text-blue-700 border border-blue-200",
      shipped: "bg-amber-50 text-amber-800 border border-amber-200",
      delivered: "bg-emerald-50 text-emerald-800 border border-emerald-200",
      cancelled: "bg-rose-50 text-rose-700 border border-rose-200",
    };
    return (
      <span
        className={`px-2.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
          map[status] || map.pending
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-sm p-6 sm:p-8 shadow-subtle space-y-6">
      <div>
        <h2 className="font-editorial text-xl font-medium text-slate-900">
          Order Archives
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Review historical consignments, fulfillment statuses, and courier manifests.
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border border-slate-200 rounded-sm p-5 hover:border-slate-300 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-sm text-slate-900">
                  {order.orderNumber}
                </span>
                {getStatusBadge(order.orderStatus)}
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Placed on {formatDate(order.createdAt)}</span>
                <span>•</span>
                <span>{order.items?.length || 0} items</span>
              </p>
              {order.trackingNumber && (
                <p className="text-[11px] text-slate-500 font-mono">
                  Tracking: {order.trackingNumber}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
              <div className="text-left md:text-right">
                <p className="text-[10px] uppercase tracking-wider text-slate-400">Total</p>
                <p className="font-editorial text-base font-semibold text-slate-900">
                  {formatCurrency(order.totalPrice)}
                </p>
              </div>

              <Link to={`/account/orders/${order._id || order.orderNumber}`}>
                <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                  Details
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
