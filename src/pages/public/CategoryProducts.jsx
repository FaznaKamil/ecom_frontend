import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import productService from "../../services/productService.js";
import categoryService from "../../services/categoryService.js";
import ProductGrid from "../../components/products/ProductGrid.jsx";
import PageContainer from "../../components/layout/PageContainer.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import Loader from "../../components/common/Loader.jsx";

export function CategoryProducts() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCategoryAndProducts() {
      setIsLoading(true);
      try {
        const [catRes, prodRes] = await Promise.all([
          categoryService.getCategoryBySlug(slug),
          productService.getProducts({ category: slug, limit: 24 }),
        ]);

        if (catRes?.data) setCategory(catRes.data);
        if (prodRes?.data) setProducts(prodRes.data);
      } catch (err) {
        console.error("Failed to load category products", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadCategoryAndProducts();
  }, [slug]);

  if (isLoading) {
    return <Loader fullScreen text="Entering curated collection..." />;
  }

  return (
    <PageContainer>
      <div className="mb-6">
        <Link
          to="/categories"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-500 hover:text-navy-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Collections</span>
        </Link>
      </div>

      <div className="mb-12 border-b border-slate-200 pb-8">
        <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-2">
          Exclusive Discipline
        </p>
        <h1 className="font-editorial text-3xl sm:text-5xl font-medium text-slate-900">
          {category?.name || "Collection"}
        </h1>
        {category?.description && (
          <p className="text-sm text-slate-600 max-w-2xl mt-3 leading-relaxed">
            {category.description}
          </p>
        )}
      </div>

      {products.length === 0 ? (
        <EmptyState
          title="No Creations in this Collection"
          description="We are currently commissioning new pieces for this discipline."
          actionText="Explore Boutique"
          actionLink="/shop"
        />
      ) : (
        <ProductGrid products={products} />
      )}
    </PageContainer>
  );
}

export default CategoryProducts;
