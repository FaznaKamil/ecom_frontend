import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import orderService from "../../services/orderService.js";
import { formatCurrency } from "../../utils/formatCurrency.js";
import { formatDateTime } from "../../utils/formatDate.js";
import Loader from "../../components/common/Loader.jsx";
import Button from "../../components/common/Button.jsx";

export function AdminOrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newStatus, setNewStatus] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    async function fetchOrder() {
      setIsLoading(true);
      try {
        const res = await orderService.getOrderById(id);
        if (res?.data) {
          setOrder(res.data);
          setNewStatus(res.data.orderStatus);
          setTrackingNumber(res.data.trackingNumber || "");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchOrder();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const res = await orderService.updateOrderStatus(id, {
        orderStatus: newStatus,
        trackingNumber,
      });
      if (res?.data) {
        setOrder(res.data);
        alert("Consignment status updated successfully");
      }
    } catch (err) {
      alert("Failed to update status: " + err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) return <Loader fullScreen text="Loading administrative dossier..." />;
  if (!order) return <p className="text-sm text-slate-500">Order not found</p>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link to="/admin/orders" className="p-1.5 text-slate-400 hover:text-slate-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="font-editorial text-2xl font-bold text-slate-900">
            Dossier {order.orderNumber}
          </h2>
          <p className="text-xs text-slate-500">
            Client: {order.user?.name} ({order.user?.email}) • Placed: {formatDateTime(order.createdAt)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <div className="bg-white border border-slate-200 rounded-sm p-6 shadow-subtle space-y-4">
            <h3 className="font-editorial text-base font-semibold text-slate-900 border-b border-slate-100 pb-2">
              Consignment Items
            </h3>
            <div className="divide-y divide-slate-100 text-xs">
              {order.items?.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center gap-4">
                  <img
                    src={item.image}
                    alt=""
                    className="w-12 h-14 object-cover rounded border border-slate-200 shrink-0"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="text-slate-500">
                      Qty: {item.quantity} × {formatCurrency(item.price)}
                    </p>
                  </div>
                  <div className="font-semibold text-slate-900">
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audit History */}
          <div className="bg-white border border-slate-200 rounded-sm p-6 shadow-subtle space-y-4">
            <h3 className="font-editorial text-base font-semibold text-slate-900 border-b border-slate-100 pb-2">
              Fulfillment Audit Trail
            </h3>
            <div className="space-y-3 text-xs">
              {order.statusHistory?.map((h, i) => (
                <div key={i} className="flex items-start gap-3 border-l-2 border-navy-900 pl-3">
                  <div>
                    <span className="font-bold uppercase text-[10px] text-navy-950">
                      {h.status}
                    </span>
                    <span className="text-[11px] text-slate-400 ml-2">
                      {formatDateTime(h.date)}
                    </span>
                    {h.note && <p className="text-slate-600 mt-0.5">{h.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Controls & Coordinates */}
        <div className="space-y-6">
          {/* Status Updater */}
          <form onSubmit={handleUpdate} className="bg-white border border-slate-200 rounded-sm p-6 shadow-subtle space-y-4">
            <h3 className="font-editorial text-base font-semibold text-slate-900 border-b border-slate-100 pb-2">
              Fulfillment Control
            </h3>

            <div>
              <label className="text-[11px] uppercase tracking-wider font-semibold text-slate-700 block mb-1">
                Status
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full text-xs p-2.5 rounded border border-slate-200 bg-white"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-wider font-semibold text-slate-700 block mb-1">
                Tracking Number
              </label>
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="TRK-..."
                className="w-full text-xs p-2 rounded border border-slate-200"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={isUpdating}
              className="w-full uppercase text-xs tracking-wider"
            >
              Update Dossier
            </Button>
          </form>

          {/* Delivery Coordinates */}
          <div className="bg-white border border-slate-200 rounded-sm p-6 shadow-subtle space-y-2 text-xs">
            <h3 className="font-editorial text-base font-semibold text-slate-900 border-b border-slate-100 pb-2">
              Recipient
            </h3>
            <p className="font-semibold text-slate-800">{order.shippingAddress?.fullName}</p>
            <p className="text-slate-600">{order.shippingAddress?.street}</p>
            <p className="text-slate-600">
              {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}
            </p>
            <p className="text-slate-500 pt-1">Tel: {order.shippingAddress?.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrderDetail;
