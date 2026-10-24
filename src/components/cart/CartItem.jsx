import { Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency.js";

export function CartItem({ item, onUpdateQuantity, onRemove }) {
  const { product, quantity } = item;
  const image = product.images?.[0] || "";

  return (
    <div className="flex gap-4 py-4 border-b border-slate-100 last:border-b-0 items-center">
      {/* Product Thumbnail */}
      <Link
        to={`/products/${product._id}`}
        className="w-20 h-24 bg-slate-50 rounded-xs overflow-hidden border border-slate-100 shrink-0"
      >
        <img
          src={image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
        <div>
          <h4 className="font-editorial text-sm font-medium text-slate-900 truncate hover:text-blue-600">
            <Link to={`/products/${product._id}`}>{product.name}</Link>
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            {formatCurrency(product.price)} each
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border border-slate-200 rounded">
            <button
              onClick={() => onUpdateQuantity(product._id, quantity - 1)}
              className="p-1 text-slate-500 hover:text-slate-900 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-xs font-semibold text-slate-800">
              {quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(product._id, quantity + 1)}
              disabled={product.stock && quantity >= product.stock}
              className="p-1 text-slate-500 hover:text-slate-900 transition-colors disabled:opacity-30"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => onRemove(product._id)}
            className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
            aria-label="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Subtotal */}
      <div className="text-right pl-2">
        <span className="text-sm font-semibold text-slate-900">
          {formatCurrency(product.price * quantity)}
        </span>
      </div>
    </div>
  );
}

export default CartItem;
