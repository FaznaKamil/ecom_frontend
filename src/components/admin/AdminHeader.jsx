import { Menu, ExternalLink, LogOut, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export function AdminHeader({ onOpenSidebar, title = "Admin Management" }) {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900"
          aria-label="Toggle admin sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="font-editorial text-lg sm:text-xl font-medium text-slate-900 truncate">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <Link
          to="/"
          target="_blank"
          className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-navy-950 transition-colors"
        >
          <span>Live Store</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-blue-700 text-amber-400 flex items-center justify-center text-xs font-bold">
            <Shield className="w-4 h-4" />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-slate-900 leading-tight">
              {user?.name || "Administrator"}
            </p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">
              Super Admin
            </p>
          </div>
          <button
            onClick={logout}
            className="p-1.5 text-slate-400 hover:text-rose-600 rounded transition-colors"
            title="Sign Out"
            aria-label="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
