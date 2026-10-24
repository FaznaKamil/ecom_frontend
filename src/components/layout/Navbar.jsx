import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  Menu,
  X,
  ChevronDown,
  ShieldAlert,
  LogOut,
  Package,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCart } from "../../context/CartContext.jsx";

export function Navbar({ onOpenMobileMenu }) {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { totalItems, wishlist, setIsDrawerOpen } = useCart();
  const navigate = useNavigate();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Close user dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Mobile Menu Toggle & Navigation Links */}
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onOpenMobileMenu}
              className="lg:hidden p-2 text-slate-700 hover:text-navy-950 transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                to="/shop"
                className="text-xs uppercase tracking-widest font-semibold text-slate-700 hover:text-navy-950 transition-colors"
              >
                Shop All
              </Link>
              <Link
                to="/categories"
                className="text-xs uppercase tracking-widest font-semibold text-slate-700 hover:text-navy-950 transition-colors"
              >
                Categories
              </Link>
              <Link
                to="/about"
                className="text-xs uppercase tracking-widest font-semibold text-slate-700 hover:text-navy-950 transition-colors"
              >
                Maison
              </Link>
              <Link
                to="/contact"
                className="text-xs uppercase tracking-widest font-semibold text-slate-700 hover:text-navy-950 transition-colors"
              >
                Concierge
              </Link>
            </nav>
          </div>

          {/* Center: Brand Identity */}
          <div className="flex-1 text-center lg:flex-initial">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 text-white flex items-center justify-center font-black text-sm shadow-sm group-hover:scale-105 transition-all">
                <span className="text-white">C</span>
                <span className="text-amber-400 -ml-0.5">L</span>
              </div>
              <div className="text-left">
                <span className="text-2xl font-black tracking-tight text-blue-950 group-hover:text-blue-600 transition-colors">
                  Click<span className="text-amber-500">Lanka</span>
                </span>
                <span className="block text-[8px] uppercase tracking-[0.25em] text-slate-400 font-bold -mt-1">
                  Online Marketplace
                </span>
              </div>
            </Link>
          </div>

          {/* Right: Actions (Search, Wishlist, User, Cart) */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-slate-700 hover:text-navy-950 transition-colors"
              aria-label="Search collection"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="p-2 text-slate-700 hover:text-navy-950 transition-colors relative"
              aria-label="View wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* User Dropdown */}
            <div className="relative" ref={userMenuRef}>
              {isAuthenticated ? (
                <div>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-1.5 p-2 text-slate-700 hover:text-navy-950 transition-colors"
                    aria-label="Account options"
                  >
                    <User className="w-5 h-5" />
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-100 rounded-sm shadow-elevated py-2 z-50 animate-in fade-in zoom-in-95">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                        <p className="text-sm font-semibold text-slate-900 truncate">
                          {user.name}
                        </p>
                      </div>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-blue-600 hover:bg-slate-50 transition-colors"
                        >
                          <ShieldAlert className="w-4 h-4" />
                          <span>Admin Dashboard</span>
                        </Link>
                      )}

                      <Link
                        to="/account"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        <span>My Profile</span>
                      </Link>

                      <Link
                        to="/account/orders"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <Package className="w-4 h-4" />
                        <span>Order History</span>
                      </Link>

                      <div className="border-t border-slate-100 mt-1 pt-1">
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            logout();
                          }}
                          className="flex items-center gap-2.5 w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="p-2 text-slate-700 hover:text-navy-950 transition-colors"
                  aria-label="Sign in"
                >
                  <User className="w-5 h-5" />
                </Link>
              )}
            </div>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-2 text-slate-700 hover:text-navy-950 transition-colors relative"
              aria-label="View shopping cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-slate-950 text-[10px] font-black rounded-full flex items-center justify-center shadow-xs">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Search Modal/Bar */}
      {isSearchOpen && (
        <div className="border-t border-slate-100 bg-slate-50 px-4 py-4 sm:px-6">
          <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search watches, leather goods, high perfumery..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-sm focus:outline-none focus:border-navy-900"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2 bg-navy-900 text-white text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-navy-950"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
    </header>
  );
}

export default Navbar;
