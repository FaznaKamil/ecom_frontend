import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Trash2 } from "lucide-react";
import reviewService from "../../services/reviewService.js";
import { formatDate } from "../../utils/formatDate.js";
import DataTable from "../../components/admin/DataTable.jsx";
import ConfirmDialog from "../../components/common/ConfirmDialog.jsx";

export function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const res = await reviewService.getAllReviews();
      if (res?.data) setReviews(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleToggleApproval = async (id) => {
    try {
      await reviewService.toggleApproval(id);
      fetchReviews();
    } catch (err) {
      alert("Failed to update status: " + err.message);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await reviewService.deleteReview(deleteId);
      setDeleteId(null);
      fetchReviews();
    } catch (err) {
      alert("Failed to delete review: " + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const columns = [
    {
      header: "Piece",
      render: (row) => (
        <div>
          <p className="font-semibold text-slate-900 line-clamp-1">
            {typeof row.product === "object" ? row.product?.name : "Creation"}
          </p>
          <span className="text-[11px] text-slate-400">By {row.userName}</span>
        </div>
      ),
    },
    {
      header: "Rating & Headline",
      render: (row) => (
        <div>
          <div className="flex text-amber-400 text-xs">
            {"★".repeat(row.rating)}{"☆".repeat(5 - row.rating)}
          </div>
          <p className="font-semibold text-slate-800 line-clamp-1">{row.title}</p>
          <p className="text-[11px] text-slate-500 line-clamp-1">{row.comment}</p>
        </div>
      ),
    },
    {
      header: "Status",
      render: (row) => (
        <span
          className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
            row.isApproved
              ? "bg-emerald-50 text-emerald-800"
              : "bg-amber-50 text-amber-800"
          }`}
        >
          {row.isApproved ? "Approved" : "Under Review"}
        </span>
      ),
    },
    {
      header: "Date",
      render: (row) => <span className="text-slate-500">{formatDate(row.createdAt)}</span>,
    },
    {
      header: "Moderation",
      className: "text-right",
      cellClassName: "text-right",
      render: (row) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => handleToggleApproval(row._id)}
            className={`p-1.5 rounded transition-colors ${
              row.isApproved
                ? "text-amber-600 hover:bg-amber-50"
                : "text-emerald-600 hover:bg-emerald-50"
            }`}
            title={row.isApproved ? "Unapprove Review" : "Approve Review"}
          >
            {row.isApproved ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setDeleteId(row._id)}
            className="p-1.5 text-slate-400 hover:text-rose-600 rounded"
            title="Delete Review"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-editorial text-2xl font-bold text-slate-900">
          Client Review Moderation
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Review, approve, and moderate patron testimonials across all boutique creations.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={reviews}
        isLoading={isLoading}
        totalRecords={reviews.length}
      />

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Patron Review?"
        message="This review will be permanently deleted and average product ratings recalculated."
        isLoading={isDeleting}
      />
    </div>
  );
}

export default Reviews;
