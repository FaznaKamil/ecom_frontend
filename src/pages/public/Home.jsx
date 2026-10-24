import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import productService from "../../services/productService.js";
import categoryService from "../../services/categoryService.js";
import ProductGrid from "../../components/products/ProductGrid.jsx";
import Button from "../../components/common/Button.jsx";
import PageContainer from "../../components/layout/PageContainer.jsx";

export function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [featRes, bestRes, newRes, catRes] = await Promise.all([
          productService.getFeaturedProducts(),
          productService.getBestSellers(),
          productService.getNewArrivals(),
          categoryService.getCategories(),
        ]);

        if (featRes?.data) setFeaturedProducts(featRes.data);
        if (bestRes?.data) setBestSellers(bestRes.data);
        if (newRes?.data) setNewArrivals(newRes.data);
        if (catRes?.data) setCategories(catRes.data);
      } catch (err) {
        console.error("Failed to load home page collections", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="space-y-16 md:space-y-28">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white overflow-hidden">
        {/* Background Visual */}
        <div className="absolute inset-0 z-0 opacity-35">
          <img
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=2000&q=80"
            alt="ClickLanka Quality Collection"
            className="w-full h-full object-cover object-center transform scale-105 animate-in fade-in duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-blue-950/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 backdrop-blur-md border border-amber-400/30 text-[11px] uppercase tracking-widest text-slate-200 mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-white">ClickLanka Curated Selections</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-white mb-6 leading-tight">
            Discover Quality & <br />
            <span className="italic font-normal text-amber-400">Timeless Elegance</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            A curated universe of precision Swiss horology, artisan leather, rare Ceylon jewelry, and luxury essentials — delivered with island-wide speed and global authenticity.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/shop">
              <Button
                variant="primary"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-widest text-xs px-8 py-4 shadow-lg hover:shadow-xl transition-all"
              >
                Discover Collection
              </Button>
            </Link>
            <Link to="/categories">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-blue-400 text-blue-200 hover:bg-blue-600/20 uppercase tracking-widest text-xs font-semibold px-8 py-4"
              >
                Browse Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <PageContainer>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-2">
            Curated Disciplines
          </p>
          <h2 className="font-editorial text-3xl font-medium text-slate-900">
            Explore by Category
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.slice(0, 3).map((cat) => (
            <Link
              key={cat._id}
              to={`/categories/${cat.slug}`}
              className="group relative aspect-[16/10] rounded-sm overflow-hidden bg-navy-950 shadow-card"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end text-white">
                <span className="text-[10px] uppercase tracking-widest text-slate-300 font-semibold mb-1">
                  Collection
                </span>
                <h3 className="font-editorial text-xl font-medium group-hover:translate-x-1 transition-transform">
                  {cat.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </PageContainer>

      {/* Featured Products */}
      <section className="bg-white py-16 border-y border-slate-100">
        <PageContainer>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-2">
                Hand-Selected Masterpieces
              </p>
              <h2 className="font-editorial text-3xl font-medium text-slate-900">
                Featured Creations
              </h2>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-slate-900 hover:text-blue-600 transition-colors"
            >
              <span>View All Pieces</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <ProductGrid products={featuredProducts} isLoading={isLoading} />
        </PageContainer>
      </section>

      {/* Promotional Editorial Split Banner */}
      <PageContainer>
        <div className="bg-gradient-to-r from-navy-950 via-blue-950 to-navy-900 border border-blue-900/40 text-white rounded-sm overflow-hidden shadow-elevated grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="p-8 sm:p-14 space-y-6">
            <span className="text-[11px] uppercase tracking-widest font-bold text-amber-400">
              Featured Showcase
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-medium leading-tight text-white">
              Sovereign Automatic <br />
              <span className="italic font-normal text-amber-400">Calibre 41</span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-md">
              Constructed with 288 individually decorated components, a hand-beveled balance bridge, and an enamel dial fired at 800 degrees. Accompanied by a 10-year chronometer certificate.
            </p>
            <div className="pt-2">
              <Link to="/products/661000000000000000000001">
                <Button
                  variant="primary"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-widest text-xs px-6 py-3 shadow-md"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Inspect The Timepiece
                </Button>
              </Link>
            </div>
          </div>
          <div className="aspect-[4/3] lg:aspect-auto lg:h-full relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80"
              alt="Luxury Chronograph"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </PageContainer>

      {/* Best Sellers */}
      <PageContainer>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-2">
            Client Favorites
          </p>
          <h2 className="font-editorial text-3xl font-medium text-slate-900">
            Perennial Best Sellers
          </h2>
        </div>

        <ProductGrid products={bestSellers} isLoading={isLoading} />
      </PageContainer>

      {/* Customer Testimonials */}
      <section className="bg-slate-100 py-20 border-t border-slate-200">
        <PageContainer>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-2">
              Patron Reviews
            </p>
            <h2 className="font-editorial text-3xl font-medium text-slate-900">
              Words from Discerning Collectors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-sm border border-slate-200/80 shadow-subtle space-y-4">
              <div className="flex gap-1 text-amber-400">
                {"★★★★★"}
              </div>
              <p className="font-editorial text-base text-slate-800 italic leading-relaxed">
                "The Sovereign Chronometer arrived via armored courier within 48 hours. The caseback finish is on par with pieces three times the acquisition price."
              </p>
              <div className="pt-2 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-900">Julian Rossi</p>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider">Milano, Italy</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-sm border border-slate-200/80 shadow-subtle space-y-4">
              <div className="flex gap-1 text-amber-400">
                {"★★★★★"}
              </div>
              <p className="font-editorial text-base text-slate-800 italic leading-relaxed">
                "The Tuscan Leather Weekender has traveled with me to Tokyo, London, and Aspen. The patina developing on the bridle leather is nothing short of breathtaking."
              </p>
              <div className="pt-2 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-900">Eleanor Vance</p>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider">Boston, MA</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-sm border border-slate-200/80 shadow-subtle space-y-4">
              <div className="flex gap-1 text-amber-400">
                {"★★★★★"}
              </div>
              <p className="font-editorial text-base text-slate-800 italic leading-relaxed">
                "Oud & Smoked Bergamot is unequivocally the highest concentration extrait I own. A single spray commands admiration throughout an entire evening."
              </p>
              <div className="pt-2 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-900">Lord Marcus Sterling</p>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider">London, UK</p>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* New Arrivals */}
      <PageContainer>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-2">
              Recent Additions
            </p>
            <h2 className="font-editorial text-3xl font-medium text-slate-900">
              New Releases
            </h2>
          </div>
          <Link
            to="/shop?newArrival=true"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-slate-900 hover:text-blue-600 transition-colors"
          >
            <span>Explore New Arrivals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <ProductGrid products={newArrivals} isLoading={isLoading} />
      </PageContainer>
    </div>
  );
}

export default Home;
