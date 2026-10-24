import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import productService from "../../services/productService.js";
import ProductGrid from "../../components/products/ProductGrid.jsx";
import PageContainer from "../../components/layout/PageContainer.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import Loader from "../../components/common/Loader.jsx";

export function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [inputValue, setInputValue] = useState(query);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function search() {
      if (!query.trim()) {
        setProducts([]);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const res = await productService.getProducts({ keyword: query, limit: 20 });
        if (res?.data) setProducts(res.data);
      } catch (e) {
        console.error("Search error", e);
      } finally {
        setIsLoading(false);
      }
    }

    search();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchParams({ q: inputValue.trim() });
    }
  };

  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto mb-12 text-center">
        <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-2">
          Atelier Query Desk
        </p>
        <h1 className="font-editorial text-3xl font-medium text-slate-900 mb-6">
          Search the Catalogue
        </h1>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search timepieces, leather goods, perfumes..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-sm focus:outline-none focus:border-navy-900"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-navy-900 text-white text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-navy-950 transition-colors"
          >
            Search
          </button>
        </form>

        {query && (
          <p className="text-xs text-slate-500 mt-4">
            Showing results for <span className="font-semibold text-slate-900">"{query}"</span>
          </p>
        )}
      </div>

      {isLoading ? (
        <Loader text="Searching atelier catalogue..." />
      ) : query && products.length === 0 ? (
        <EmptyState
          title="No Creations Found"
          description={`We could not locate any pieces matching "${query}". Try searching by category, material, or watch type.`}
          actionText="Browse All Creations"
          actionLink="/shop"
        />
      ) : (
        <ProductGrid products={products} />
      )}
    </PageContainer>
  );
}

export default SearchResults;
