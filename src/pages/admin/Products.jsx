import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import productService from "../../services/productService.js";
import { formatCurrency } from "../../utils/formatCurrency.js";
import DataTable from "../../components/admin/DataTable.jsx";
import ConfirmDialog from "../../components/common/ConfirmDialog.jsx";
import Button from "../../components/common/Button.jsx";

export function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });
  const [isLoading, setIsLoading] = useState(true);

  // Deletion modal
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await productService.getProducts({ keyword: search, page, limit: 10 });
      if (res?.data) {
        setProducts(res.data);
        if (res.pagination) setPagination(res.pagination);
      }
    } catch (err) {
      console.error("Failed to load products", err);
    } finally {
      setIsLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await productService.deleteProduct(deleteId);
      setDeleteId(null);
      fetchProducts();
    } catch (err) {
      alert("Failed to delete product: " + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const columns = [
    {
      header: "Piece",
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.images?.[0]}
            alt=""
            className="w-10 h-12 object-cover rounded-xs border border-slate-200"
          />
          <div>
            <p className="font-semibold text-slate-900 line-clamp-1">{row.name}</p>
            <p className="text-[11px] text-slate-400 font-mono">{row.sku || "N/A"}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Category",
      render: (row) => (
        <span className="text-slate-600">
          {typeof row.category === "object" ? row.category?.name : "General"}
        </span>
      ),
    },
    {
      header: "Price",
      render: (row) => (
        <span className="font-semibold text-slate-900">
          {formatCurrency(row.price)}
        </span>
      ),
    },
    {
      header: "Stock",
      render: (row) => (
        <span
          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
            row.stock <= 5
              ? "bg-rose-50 text-rose-700"
              : "bg-emerald-50 text-emerald-700"
          }`}
        >
          {row.stock} in vault
        </span>
      ),
    },
    {
      header: "Badges",
      render: (row) => (
        <div className="flex flex-wrap gap-1">
          {row.isFeatured && (
            <span className="px-1.5 py-0.2 text-[9px] bg-blue-50 text-blue-700 rounded font-semibold">
              Featured
            </span>
          )}
          {row.isBestSeller && (
            <span className="px-1.5 py-0.2 text-[9px] bg-amber-50 text-amber-800 rounded font-semibold">
              Best Seller
            </span>
          )}
          {row.isNewArrival && (
            <span className="px-1.5 py-0.2 text-[9px] bg-purple-50 text-purple-700 rounded font-semibold">
              New
            </span>
          )}
        </div>
      ),
    },
    {
      header: "Actions",
      className: "text-right",
      cellClassName: "text-right",
      render: (row) => (
        <div className="flex items-center justify-end gap-2">
          <Link
            to={`/products/${row._id}`}
            target="_blank"
            className="p-1.5 text-slate-400 hover:text-slate-700"
            title="View Live Store Page"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <Link
            to={`/admin/products/${row._id}/edit`}
            className="p-1.5 text-slate-400 hover:text-blue-600"
            title="Edit Piece"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setDeleteId(row._id)}
            className="p-1.5 text-slate-400 hover:text-rose-600"
            title="Delete Piece"
          >
            <Trash2 className="w-4 h-4" />
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
            Product Catalogue
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage catalogue creations, inventory allocations, and editorial attributes.
          </p>
        </div>

        <Link to="/admin/products/new">
          <Button variant="primary" size="sm" icon={Plus}>
            New Product
          </Button>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={products}
        isLoading={isLoading}
        searchPlaceholder="Search pieces by title, SKU, tags..."
        searchQuery={search}
        onSearch={setSearch}
        totalRecords={pagination.total}
        page={page}
        totalPages={pagination.pages}
        onPageChange={setPage}
      />

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Remove Creation from Catalogue?"
        message="This product will be permanently purged from the boutique catalogue. This action cannot be reversed."
        isLoading={isDeleting}
      />
    </div>
  );
}

export default Products;
