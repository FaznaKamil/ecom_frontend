import { useState, useEffect } from "react";
import { Plus, Tag, Trash2 } from "lucide-react";
import cartService from "../../services/cartService.js";
import { formatCurrency } from "../../utils/formatCurrency.js";
import { formatDate } from "../../utils/formatDate.js";
import DataTable from "../../components/admin/DataTable.jsx";
import Modal from "../../components/common/Modal.jsx";
import ConfirmDialog from "../../components/common/ConfirmDialog.jsx";
import Button from "../../components/common/Button.jsx";
import Input from "../../components/common/Input.jsx";

export function Promotions() {
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Create modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage",
    discountAmount: 10,
    minOrderAmount: 200,
    expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90).toISOString().split("T")[0],
    usageLimit: 100,
    isActive: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  // Delete modal
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCoupons = async () => {
    setIsLoading(true);
    try {
      const res = await cartService.getCoupons();
      if (res?.data) setCoupons(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      await cartService.createCoupon({
        ...formData,
        code: formData.code.toUpperCase().trim(),
        discountAmount: Number(formData.discountAmount),
        minOrderAmount: Number(formData.minOrderAmount),
        usageLimit: Number(formData.usageLimit),
      });
      setIsModalOpen(false);
      fetchCoupons();
    } catch (err) {
      setError(err.message || "Failed to create coupon code");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await cartService.deleteCoupon(deleteId);
      setDeleteId(null);
      fetchCoupons();
    } catch (err) {
      alert("Failed to delete coupon: " + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const columns = [
    {
      header: "Promo Code",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-slate-400" />
          <span className="font-mono font-bold text-slate-900">{row.code}</span>
        </div>
      ),
    },
    {
      header: "Discount",
      render: (row) => (
        <span className="font-semibold text-slate-800">
          {row.discountType === "percentage"
            ? `${row.discountAmount}% Off`
            : formatCurrency(row.discountAmount) + " Off"}
        </span>
      ),
    },
    {
      header: "Min Requirement",
      render: (row) => <span>{formatCurrency(row.minOrderAmount)}</span>,
    },
    {
      header: "Usage / Limit",
      render: (row) => (
        <span className="font-mono text-slate-700">
          {row.usedCount} / {row.usageLimit}
        </span>
      ),
    },
    {
      header: "Validity",
      render: (row) => <span>Expires {formatDate(row.expiryDate)}</span>,
    },
    {
      header: "Actions",
      className: "text-right",
      cellClassName: "text-right",
      render: (row) => (
        <button
          onClick={() => setDeleteId(row._id)}
          className="p-1.5 text-slate-400 hover:text-rose-600"
          title="Delete Coupon"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-editorial text-2xl font-bold text-slate-900">
            Promotional Vouchers
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Authorise private promotion codes, percentage discounts, and order thresholds.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          icon={Plus}
        >
          New Coupon
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={coupons}
        isLoading={isLoading}
        totalRecords={coupons.length}
      />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Authorise Promotional Code"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          {error && <p className="text-xs text-rose-500">{error}</p>}

          <Input
            label="Promo Code Identifier"
            name="code"
            placeholder="e.g. VIP25"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1">
                Discount Type
              </label>
              <select
                value={formData.discountType}
                onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                className="w-full text-xs p-2.5 rounded border border-slate-200 bg-white"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Cash ($)</option>
              </select>
            </div>

            <Input
              label="Amount"
              name="discountAmount"
              type="number"
              min="1"
              value={formData.discountAmount}
              onChange={(e) => setFormData({ ...formData, discountAmount: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Min Order Amount ($)"
              name="minOrderAmount"
              type="number"
              min="0"
              value={formData.minOrderAmount}
              onChange={(e) => setFormData({ ...formData, minOrderAmount: e.target.value })}
              required
            />
            <Input
              label="Max Usage Limit"
              name="usageLimit"
              type="number"
              min="1"
              value={formData.usageLimit}
              onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
              required
            />
          </div>

          <Input
            label="Expiration Date"
            name="expiryDate"
            type="date"
            value={formData.expiryDate}
            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
            required
          />

          <div className="pt-2 flex justify-end gap-3">
            <Button variant="secondary" size="md" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md" isLoading={isSaving}>
              Create Coupon
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Revoke Promotional Code?"
        message="This code will immediately become invalid for all patrons at checkout."
        isLoading={isDeleting}
      />
    </div>
  );
}

export default Promotions;
