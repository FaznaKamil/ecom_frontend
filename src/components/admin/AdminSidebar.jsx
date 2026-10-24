import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Users,
  Boxes,
  Tag,
  Star,
  MessageSquare,
  BarChart3,
  Settings,
  ArrowLeft,
  X,
} from "lucide-react";

export function AdminSidebar({ isOpen, onClose }) {
  const navItems = [
    { label: "Dashboard", path: "/admin", icon: LayoutDashboard, end: true },
    { label: "Products", path: "/admin/products", icon: Package },
    { label: "Categories", path: "/admin/categories", icon: Layers },
    { label: "Orders", path: "/admin/orders", icon: ShoppingBag },
    { label: "Customers", path: "/admin/customers", icon: Users },
    { label: "Inventory", path: "/admin/inventory", icon: Boxes },
    { label: "Promotions", path: "/admin/promotions", icon: Tag },
    { label: "Reviews", path: "/admin/reviews", icon: Star },
    { label: "Messages", path: "/admin/messages", icon: MessageSquare },
    { label: "Reports", path: "/admin/reports", icon: BarChart3 },
    { label: "Settings", path: "/admin/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy-950/60 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-navy-950 text-slate-300 flex flex-col border-r border-navy-900 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-navy-900">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-blue-600 text-white flex items-center justify-center font-black text-xs">
              <span className="text-white">C</span>
              <span className="text-amber-400 -ml-0.5">L</span>
            </div>
            <span className="font-bold tracking-tight text-white text-base">
              Click<span className="text-amber-400">Lanka</span>
            </span>
            <span className="px-1.5 py-0.5 text-[9px] uppercase tracking-widest font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded">
              Admin
            </span>
          </Link>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white lg:hidden"
            aria-label="Close admin menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 scrollbar-thin">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => onClose && onClose()}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-sm text-xs uppercase tracking-wider font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white font-semibold shadow-sm"
                    : "text-slate-400 hover:bg-navy-900 hover:text-white"
                }`
              }
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer: Return to Storefront */}
        <div className="p-4 border-t border-navy-900">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 text-xs text-slate-400 hover:text-white hover:bg-navy-900 rounded-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Storefront</span>
          </Link>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
