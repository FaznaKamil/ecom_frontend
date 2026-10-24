import { useLocation, Link, Navigate } from "react-router-dom";
import { CheckCircle2, Package, ArrowRight } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency.js";
import PageContainer from "../../components/layout/PageContainer.jsx";
import Button from "../../components/common/Button.jsx";

export function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/account/orders" replace />;
  }

  return (
    <PageContainer size="narrow">
      <div className="bg-white border border-slate-200 rounded-sm p-8 sm:p-12 shadow-card text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <span className="text-[11px] uppercase tracking-widest text-emerald-700 font-bold">
            Consignment Confirmed
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-medium text-slate-900 mt-1">
            Thank You For Your Patronage
          </h1>
          <p className="text-xs text-slate-500 mt-2">
            Your consignment has been authorized and dispatched to our New York fulfillment vault.
          </p>
        </div>

        {/* Order Details Badge */}
        <div className="bg-slate-50 border border-slate-200/80 rounded p-6 text-left space-y-3 max-w-md mx-auto text-xs">
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-slate-500">Order Reference</span>
            <span className="font-mono font-bold text-slate-900">{order.orderNumber}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-slate-500">Logistics Tracking</span>
            <span className="font-mono text-slate-700">{order.trackingNumber || "Pending Dispatch"}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-slate-500">Settlement Method</span>
            <span className="font-semibold text-slate-900 uppercase">
              {order.paymentMethod === "test_card" ? "Sandbox Test Card" : "Cash on Delivery"}
            </span>
          </div>
          <div className="flex justify-between pt-1 font-semibold text-slate-900 text-sm">
            <span>Total Authorized</span>
            <span>{formatCurrency(order.totalPrice)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link to={`/account/orders/${order._id || order.orderNumber}`}>
            <Button variant="primary" size="md" icon={Package}>
              Inspect Order Dossier
            </Button>
          </Link>
          <Link to="/shop">
            <Button variant="outline" size="md" icon={ArrowRight} iconPosition="right">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}

export default OrderSuccess;
