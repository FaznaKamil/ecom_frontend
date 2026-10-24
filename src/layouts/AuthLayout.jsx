import { Outlet, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-500 hover:text-navy-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Boutique</span>
        </Link>
      </div>

      {/* Auth Card */}
      <div className="max-w-md w-full mx-auto my-8">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 text-white flex items-center justify-center font-black text-base shadow-sm">
              <span className="text-white">C</span>
              <span className="text-amber-400 -ml-0.5">L</span>
            </div>
            <div className="text-left">
              <span className="text-2xl font-black tracking-tight text-blue-950">
                Click<span className="text-amber-500">Lanka</span>
              </span>
              <span className="block text-[8px] uppercase tracking-[0.25em] text-slate-400 font-bold -mt-0.5">
                Secure Client Portal
              </span>
            </div>
          </Link>
        </div>

        <div className="bg-white py-8 px-6 sm:px-10 border border-slate-200/80 rounded-sm shadow-card">
          <Outlet />
        </div>
      </div>

      {/* Footer info */}
      <div className="text-center text-xs text-slate-400">
        <p>© {new Date().getFullYear()} ClickLanka (Pvt) Ltd. Encrypted 256-bit SSL Session.</p>
      </div>
    </div>
  );
}

export default AuthLayout;
