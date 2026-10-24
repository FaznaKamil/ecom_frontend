import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Eye, Edit } from "lucide-react";
import orderService from "../../services/orderService.js";
import { formatCurrency } from "../../utils/formatCurrency.js";
import { formatDate } from "../../utils/formatDate.js";
import DataTable from "../../components/admin/DataTable.jsx";
import Modal from "../../components/common/Modal.jsx";
import Button from "../../components/common/Button.jsx";
import Input from "../../components/common/Input.jsx";

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });
  const [isLoading, setIsLoading] = useState(true);

  // Status update modal
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("processing");
  const [statusNote, setStatusNote] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await orderService.getAllOrders({
        status: statusFilter || undefined,
        page,
        limit: 10,
      });
      if (res?.data) {
        setOrders(res.data);
        if (res.pagination) setPagination(res.pagination);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter, page]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const openUpdateModal = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.orderStatus);
    setStatusNote("");
    setTrackingNumber(order.trackingNumber || "");
  };

  const handleStatusSubmit = async (e) => {
    e.preventDefault();
    if (!selectedOrder) return;
    setIsUpdating(true);

    try {
      await orderService.updateOrderStatus(selectedOrder._id, {
        orderStatus: newStatus,
        note: statusNote || undefined,
        trackingNumber: trackingNumber || undefined,
      });
      setSelectedOrder(null);
      fetchOrders();
    } catch (err) {
      alert("Status update failed: " + err.message);
    } finally {
      setIsUpdating(false);
    }
  };

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

  const columns = [
    {
      header: "Consignment ID",
      render: (row) => (
        <div>
          <span className="font-mono font-bold text-slate-900">{row.orderNumber}</span>
          <p className="text-[11px] text-slate-400">{formatDate(row.createdAt)}</p>
        </div>
      ),
    },
    {
      header: "Client",
      render: (row) => (
        <div>
          <p className="font-semibold text-slate-900">{row.shippingAddress?.fullName || row.user?.name}</p>
          <p className="text-[11px] text-slate-400 truncate">{row.user?.email}</p>
        </div>
      ),
    },
    {
      header: "Status",
      render: (row) => getStatusBadge(row.orderStatus),
    },
    {
      header: "Settlement",
      render: (row) => (
        <span className="text-[11px] uppercase font-semibold text-slate-600">
          {row.paymentMethod === "test_card" ? "Sandbox Card" : "COD"}
        </span>
      ),
    },
    {
      header: "Total",
      render: (row) => (
        <span className="font-semibold text-slate-900">{formatCurrency(row.totalPrice)}</span>
      ),
    },
    {
      header: "Actions",
      className: "text-right",
      cellClassName: "text-right",
      render: (row) => (
        <div className="flex items-center justify-end gap-2">
          <Link
            to={`/admin/orders/${row._id}`}
            className="p-1.5 text-slate-400 hover:text-navy-950"
            title="Inspect Dossier"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <button
            onClick={() => openUpdateModal(row)}
            className="p-1.5 text-slate-400 hover:text-blue-600"
            title="Update Status"
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-editorial text-2xl font-bold text-slate-900">
            Consignment Ledger
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Supervise fulfillment pipelines, courier status updates, and client settlements.
          </p>
        </div>

        {/* Status Filter Tab */}
        <div className="flex items-center gap-1 bg-white p-1 border border-slate-200 rounded text-xs">
          {["", "pending", "processing", "shipped", "delivered"].map((st) => (
            <button
              key={st}
              onClick={() => {
                setStatusFilter(st);
                setPage(1);
              }}
              className={`px-3 py-1 rounded capitalize font-medium transition-colors ${
                statusFilter === st
                  ? "bg-navy-900 text-white"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {st || "All"}
            </button>
          ))}
        </div>
      </div>

      <DataTable
        columns={columns}
        data={orders}
        isLoading={isLoading}
        totalRecords={pagination.total}
        page={page}
        totalPages={pagination.pages}
        onPageChange={setPage}
      />

      {/* Status Update Modal */}
      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={`Update Order ${selectedOrder?.orderNumber}`}
      >
        <form onSubmit={handleStatusSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1">
              New Fulfillment Status
            </label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full text-xs p-2.5 rounded border border-slate-200 bg-white focus:outline-none focus:border-navy-900 cursor-pointer"
            >
              <option value="pending">Pending Review</option>
              <option value="processing">Processing in Atelier</option>
              <option value="shipped">Dispatched / In Transit</option>
              <option value="delivered">Delivered to Patron</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <Input
            label="Courier Tracking Number"
            name="trackingNumber"
            placeholder="TRK-98320491USA"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              Audit Note
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Dispatched via armored courier..."
              value={statusNote}
              onChange={(e) => setStatusNote(e.target.value)}
              className="w-full text-xs p-2.5 rounded border border-slate-200 bg-white focus:outline-none focus:border-navy-900"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <Button variant="secondary" size="md" onClick={() => setSelectedOrder(null)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md" isLoading={isUpdating}>
              Update Status
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Orders;
