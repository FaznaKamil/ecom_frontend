import { X, User, Heart, ShoppingBag, ShieldAlert, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCart } from "../../context/CartContext.jsx";

export function MobileMenu({ isOpen, onClose }) {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { totalItems, wishlist, setIsDrawerOpen } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-950/60 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-elevated flex flex-col z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <Link to="/" onClick={onClose} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-blue-600 text-white flex items-center justify-center font-black text-sm">
              <span className="text-white">C</span>
              <span className="text-amber-400 -ml-0.5">L</span>
            </div>
            <span className="text-xl font-black tracking-tight text-blue-950">
              Click<span className="text-amber-500">Lanka</span>
            </span>
          </Link>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          <nav className="space-y-4">
            <Link
              to="/shop"
              onClick={onClose}
              className="block text-sm uppercase tracking-widest font-semibold text-slate-800 hover:text-navy-950"
            >
              Shop All Creations
            </Link>
            <Link
              to="/categories"
              onClick={onClose}
              className="block text-sm uppercase tracking-widest font-semibold text-slate-800 hover:text-navy-950"
            >
              Categories
            </Link>
            <Link
              to="/about"
              onClick={onClose}
              className="block text-sm uppercase tracking-widest font-semibold text-slate-800 hover:text-navy-950"
            >
              The Maison
            </Link>
            <Link
              to="/contact"
              onClick={onClose}
              className="block text-sm uppercase tracking-widest font-semibold text-slate-800 hover:text-navy-950"
            >
              Concierge Desk
            </Link>
          </nav>

          <div className="pt-6 border-t border-slate-100 space-y-4">
            <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold">
              Account & Selection
            </p>

            <Link
              to="/wishlist"
              onClick={onClose}
              className="flex items-center justify-between text-sm text-slate-700 hover:text-slate-900"
            >
              <span className="flex items-center gap-3">
                <Heart className="w-4 h-4" />
                <span>Wishlist</span>
              </span>
              {wishlist.length > 0 && (
                <span className="px-2 py-0.5 text-xs bg-rose-50 text-rose-600 font-semibold rounded-full">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => {
                onClose();
                setIsDrawerOpen(true);
              }}
              className="flex items-center justify-between w-full text-sm text-slate-700 hover:text-slate-900"
            >
              <span className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                <span>Shopping Bag</span>
              </span>
              {totalItems > 0 && (
                <span className="px-2 py-0.5 text-xs bg-navy-900 text-white font-semibold rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          <div className="pt-6 border-t border-slate-100">
            {isAuthenticated ? (
              <div className="space-y-3">
                <div className="pb-2">
                  <p className="text-xs text-slate-400">Signed in as</p>
                  <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                </div>

                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={onClose}
                    className="flex items-center gap-2.5 text-sm font-semibold text-blue-600"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    <span>Admin Dashboard</span>
                  </Link>
                )}

                <Link
                  to="/account"
                  onClick={onClose}
                  className="flex items-center gap-2.5 text-sm text-slate-700"
                >
                  <User className="w-4 h-4" />
                  <span>My Account</span>
                </Link>

                <button
                  onClick={() => {
                    onClose();
                    logout();
                  }}
                  className="flex items-center gap-2.5 text-sm text-rose-600 pt-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  onClick={onClose}
                  className="w-full py-2.5 text-center text-xs uppercase tracking-wider font-semibold border border-navy-900 text-navy-900 rounded-sm"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={onClose}
                  className="w-full py-2.5 text-center text-xs uppercase tracking-wider font-semibold bg-navy-900 text-white rounded-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
