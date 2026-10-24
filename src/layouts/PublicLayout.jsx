import { useState } from "react";
import { Outlet } from "react-router-dom";
import AnnouncementBar from "../components/layout/AnnouncementBar.jsx";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";
import MobileMenu from "../components/layout/MobileMenu.jsx";
import CartDrawer from "../components/cart/CartDrawer.jsx";

export function PublicLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-navy-900 selection:text-white">
      <AnnouncementBar />
      <Navbar onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <CartDrawer />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default PublicLayout;
