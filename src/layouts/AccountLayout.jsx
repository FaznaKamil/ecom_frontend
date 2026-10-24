import { NavLink, Outlet } from "react-router-dom";
import { User, Package, MapPin, Heart, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import PageContainer from "../components/layout/PageContainer.jsx";
import AnnouncementBar from "../components/layout/AnnouncementBar.jsx";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";
import MobileMenu from "../components/layout/MobileMenu.jsx";
import CartDrawer from "../components/cart/CartDrawer.jsx";
import { useState } from "react";

export function AccountLayout() {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Profile Overview", path: "/account", icon: User, end: true },
    { label: "Order History", path: "/account/orders", icon: Package },
    { label: "Saved Addresses", path: "/account/addresses", icon: MapPin },
    { label: "Saved Wishlist", path: "/wishlist", icon: Heart },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <AnnouncementBar />
      <Navbar onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <CartDrawer />

      <main className="flex-1">
        <PageContainer>
          <div className="mb-8 pb-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">
                Client Sanctuary
              </p>
              <h1 className="font-editorial text-2xl sm:text-3xl font-medium text-slate-900">
                Welcome, {user?.name || "Client"}
              </h1>
            </div>
            <p className="text-xs text-slate-500">
              Account Reference: <span className="font-mono text-slate-700">{user?._id?.slice(-8) || "LUXE-CLI"}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Account Sidebar */}
            <aside className="md:col-span-1">
              <div className="bg-white border border-slate-200 rounded-sm p-4 space-y-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.end}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded text-xs uppercase tracking-wider font-semibold transition-colors ${
                        isActive
                          ? "bg-navy-900 text-white shadow-xs"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`
                    }
                  >
                    <link.icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </NavLink>
                ))}

                <button
                  onClick={logout}
                  className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded text-xs uppercase tracking-wider font-semibold text-rose-600 hover:bg-rose-50 transition-colors pt-3 border-t border-slate-100"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </aside>

            {/* Account Main Content */}
            <section className="md:col-span-3">
              <Outlet />
            </section>
          </div>
        </PageContainer>
      </main>

      <Footer />
    </div>
  );
}

export default AccountLayout;
