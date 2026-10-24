import { Link } from "react-router-dom";
import { ShieldCheck, Truck, RefreshCw, Award, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white pt-16 pb-12 border-t border-navy-900">
      {/* Brand Value Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-navy-900/60">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-navy-900 rounded-sm text-slate-300 shrink-0">
              <Award className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-editorial text-base font-medium text-white mb-1">
                Authenticity Guaranteed
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every creation is meticulously verified and certified by master artisans.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-navy-900 rounded-sm text-slate-300 shrink-0">
              <Truck className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-editorial text-base font-medium text-white mb-1">
                White-Glove Transit
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Insured express delivery directly to your door in bespoke packaging.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-navy-900 rounded-sm text-slate-300 shrink-0">
              <RefreshCw className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-editorial text-base font-medium text-white mb-1">
                Seamless 30-Day Returns
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Complimentary worldwide collection for unworn pieces with seal intact.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-navy-900 rounded-sm text-slate-300 shrink-0">
              <ShieldCheck className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-editorial text-base font-medium text-white mb-1">
                Private Concierge
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dedicated luxury advisors available for commissions and styling advice.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Column 1: Brand Info */}
        <div className="lg:col-span-2 space-y-4">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-md">
              <span className="text-white">C</span>
              <span className="text-amber-400 -ml-0.5">L</span>
            </div>
            <div className="text-left">
              <span className="text-2xl font-black tracking-tight text-white">
                Click<span className="text-amber-400">Lanka</span>
              </span>
              <span className="block text-[8px] uppercase tracking-[0.25em] text-slate-400 font-bold -mt-0.5">
                Colombo • Kandy • Galle • Global
              </span>
            </div>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Sri Lanka&apos;s curated marketplace for premium horology, artisan leather, exquisite Ceylon jewelry, and modern luxury essentials. Built for uncompromising quality and trust.
          </p>
          <div className="pt-2 text-xs text-slate-400">
            <p>HQ: 100 Galle Road, Kollupitiya, Colombo 03, Sri Lanka</p>
            <p className="mt-1">Inquiries: support@clicklanka.com • +94 (11) 234-LUXE</p>
          </div>
        </div>

        {/* Column 2: Collections */}
        <div className="space-y-3">
          <h5 className="text-xs uppercase tracking-widest font-semibold text-slate-200">
            Collections
          </h5>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <Link to="/categories/horology-and-timepieces" className="hover:text-white transition-colors">
                Timepieces
              </Link>
            </li>
            <li>
              <Link to="/categories/artisan-leather-goods" className="hover:text-white transition-colors">
                Leather Goods
              </Link>
            </li>
            <li>
              <Link to="/categories/haute-parfumerie" className="hover:text-white transition-colors">
                Haute Parfumerie
              </Link>
            </li>
            <li>
              <Link to="/categories/optical-and-sunglasses" className="hover:text-white transition-colors">
                Fine Eyewear
              </Link>
            </li>
            <li>
              <Link to="/categories/fine-jewelry-and-precious-metals" className="hover:text-white transition-colors">
                Precious Jewelry
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Client Care */}
        <div className="space-y-3">
          <h5 className="text-xs uppercase tracking-widest font-semibold text-slate-200">
            Client Services
          </h5>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <Link to="/contact" className="hover:text-white transition-colors">
                Contact Concierge
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-white transition-colors">
                Frequently Asked
              </Link>
            </li>
            <li>
              <Link to="/shipping-policy" className="hover:text-white transition-colors">
                Shipping & Transit
              </Link>
            </li>
            <li>
              <Link to="/returns-policy" className="hover:text-white transition-colors">
                Returns & Exchanges
              </Link>
            </li>
            <li>
              <Link to="/account/orders" className="hover:text-white transition-colors">
                Track Consignment
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="space-y-3">
          <h5 className="text-xs uppercase tracking-widest font-semibold text-slate-200">
            Private Gazette
          </h5>
          <p className="text-xs text-slate-400 leading-relaxed">
            Receive private allocations, seasonal release notes, and private event invitations.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); alert("Thank you for subscribing to the ClickLanka Gazette."); }} className="space-y-2">
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                required
                className="w-full bg-navy-900 border border-navy-800 text-xs text-white px-3 py-2 rounded-l-xs focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="bg-amber-500 text-slate-950 font-bold px-3 py-2 rounded-r-xs hover:bg-amber-400 transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-slate-500">
              Unsubscribe anytime. We honour client privacy.
            </p>
          </form>
        </div>
      </div>

      {/* Bottom Legal & Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-navy-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} ClickLanka (Pvt) Ltd. All rights reserved.</p>
        <div className="flex items-center space-x-6 text-[11px]">
          <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-slate-300 transition-colors">
            Terms of Purchase
          </Link>
          <Link to="/admin" className="hover:text-slate-300 transition-colors">
            Admin Portal
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
