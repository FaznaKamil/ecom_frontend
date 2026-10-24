import { useState, useEffect, useCallback } from "react";
import { Plus, Minus, AlertCircle } from "lucide-react";
import productService from "../../services/productService.js";
import { formatCurrency } from "../../utils/formatCurrency.js";
import DataTable from "../../components/admin/DataTable.jsx";

export function Inventory() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchInventory = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await productService.getProducts({ keyword: search, limit: 50 });
      if (res?.data) setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  const handleAdjustStock = async (product, delta) => {
    const newStock = Math.max(0, product.stock + delta);
    setUpdatingId(product._id);
    try {
      await productService.updateProduct(product._id, { stock: newStock });
      setProducts((prev) =>
        prev.map((p) => (p._id === product._id ? { ...p, stock: newStock } : p))
      );
    } catch (err) {
      alert("Failed to adjust stock: " + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const columns = [
    {
      header: "Creation",
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.images?.[0]}
            alt=""
            className="w-10 h-12 object-cover rounded border border-slate-200"
          />
          <div>
            <p className="font-semibold text-slate-900">{row.name}</p>
            <p className="text-[11px] text-slate-400 font-mono">{row.sku || "N/A"}</p>
          </div>
        </div>
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
      header: "Vault Status",
      render: (row) => (
        <span
          className={`px-2.5 py-1 rounded text-[10px] uppercase font-bold tracking-wider inline-flex items-center gap-1.5 ${
            row.stock <= 5
              ? "bg-rose-50 text-rose-700 border border-rose-200"
              : "bg-emerald-50 text-emerald-800 border border-emerald-200"
          }`}
        >
          {row.stock <= 5 && <AlertCircle className="w-3 h-3" />}
          <span>{row.stock <= 5 ? "Critical Low" : "Adequate"}</span>
        </span>
      ),
    },
    {
      header: "Stock Level & Quick Adjustment",
      className: "text-right",
      cellClassName: "text-right",
      render: (row) => (
        <div className="flex items-center justify-end gap-3">
          <span className="font-mono text-sm font-bold text-slate-900 w-12 text-center">
            {row.stock}
          </span>
          <div className="flex items-center border border-slate-200 rounded">
            <button
              onClick={() => handleAdjustStock(row, -1)}
              disabled={row.stock <= 0 || updatingId === row._id}
              className="p-1 text-slate-500 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30"
              title="Deduct 1 unit"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleAdjustStock(row, 5)}
              disabled={updatingId === row._id}
              className="px-2 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 border-x border-slate-200"
              title="Add 5 units batch"
            >
              +5
            </button>
            <button
              onClick={() => handleAdjustStock(row, 1)}
              disabled={updatingId === row._id}
              className="p-1 text-slate-500 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30"
              title="Add 1 unit"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-editorial text-2xl font-bold text-slate-900">
          Vault & Inventory Control
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Monitor physical vault allocations, re-stock units, and prevent inventory depletion.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={products}
        isLoading={isLoading}
        searchPlaceholder="Filter inventory by title or SKU..."
        searchQuery={search}
        onSearch={setSearch}
        totalRecords={products.length}
      />
    </div>
  );
}

export default Inventory;
