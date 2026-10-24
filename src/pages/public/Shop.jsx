import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, X, ChevronLeft, ChevronRight } from "lucide-react";
import productService from "../../services/productService.js";
import categoryService from "../../services/categoryService.js";
import ProductGrid from "../../components/products/ProductGrid.jsx";
import ProductFilters from "../../components/products/ProductFilters.jsx";
import ProductSort from "../../components/products/ProductSort.jsx";
import PageContainer from "../../components/layout/PageContainer.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";
import Button from "../../components/common/Button.jsx";

export function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 12, pages: 1 });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Read filter params
  const categoryParam = searchParams.get("category") || "";
  const keywordParam = searchParams.get("keyword") || "";
  const minPriceParam = searchParams.get("minPrice") || "";
  const maxPriceParam = searchParams.get("maxPrice") || "";
  const sortByParam = searchParams.get("sortBy") || "createdAt";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const featuredParam = searchParams.get("featured") || "";
  const newArrivalParam = searchParams.get("newArrival") || "";

  // Price range state
  const [priceRange, setPriceRange] = useState({ min: minPriceParam, max: maxPriceParam });

  // Load Categories once
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await categoryService.getCategories();
        if (res?.data) setCategories(res.data);
      } catch (e) {
        console.error("Failed to load categories", e);
      }
    }
    fetchCategories();
  }, []);

  // Fetch Products whenever query params change
  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const queryParams = {
          category: categoryParam,
          keyword: keywordParam,
          minPrice: minPriceParam,
          maxPrice: maxPriceParam,
          sortBy: sortByParam,
          page: pageParam,
          limit: 12,
          featured: featuredParam,
          newArrival: newArrivalParam,
        };

        const res = await productService.getProducts(queryParams);
        if (res?.data) {
          setProducts(res.data);
          if (res.pagination) setPagination(res.pagination);
        }
      } catch (err) {
        setErrorMessage(err.message || "Failed to load products");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [
    categoryParam,
    keywordParam,
    minPriceParam,
    maxPriceParam,
    sortByParam,
    pageParam,
    featuredParam,
    newArrivalParam,
  ]);

  const updateParam = (key, value) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value) {
      nextParams.set(key, value);
    } else {
      nextParams.delete(key);
    }
    nextParams.set("page", "1"); // Reset page on filter change
    setSearchParams(nextParams);
  };

  const handlePriceChange = (field, val) => {
    setPriceRange((prev) => ({ ...prev, [field]: val }));
    // Debounce or apply to url
    const nextParams = new URLSearchParams(searchParams);
    if (val) nextParams.set(field === "min" ? "minPrice" : "maxPrice", val);
    else nextParams.delete(field === "min" ? "minPrice" : "maxPrice");
    nextParams.set("page", "1");
    setSearchParams(nextParams);
  };

  const handleResetFilters = () => {
    setPriceRange({ min: "", max: "" });
    setSearchParams(new URLSearchParams());
  };

  const hasActiveFilters = !!(
    categoryParam ||
    keywordParam ||
    minPriceParam ||
    maxPriceParam ||
    featuredParam ||
    newArrivalParam
  );

  return (
    <PageContainer>
      {/* Page Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-2">
          The Full Atelier Portfolio
        </p>
        <h1 className="font-editorial text-3xl sm:text-4xl font-medium text-slate-900">
          The Boutique Collection
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          Discover hand-finished horology, Tuscan bridle leather, and rare niche fragrances.
        </p>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between pb-4 border-b border-slate-200">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMobileFiltersOpen(true)}
            icon={Filter}
          >
            Filters {hasActiveFilters && "(Active)"}
          </Button>

          <span className="text-xs text-slate-500">
            {pagination.total} Creations Found
          </span>
        </div>

        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block lg:col-span-1">
          <ProductFilters
            categories={categories}
            selectedCategory={categoryParam}
            onSelectCategory={(slug) => updateParam("category", slug)}
            priceRange={priceRange}
            onPriceChange={handlePriceChange}
            onResetFilters={handleResetFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        {/* Mobile Sidebar Filters Drawer */}
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-navy-950/60 backdrop-blur-xs"
              onClick={() => setIsMobileFiltersOpen(false)}
            />
            <div className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-white p-6 shadow-elevated overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <h3 className="font-editorial text-lg font-medium text-slate-900">
                  Refine Creations
                </h3>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <ProductFilters
                categories={categories}
                selectedCategory={categoryParam}
                onSelectCategory={(slug) => {
                  updateParam("category", slug);
                  setIsMobileFiltersOpen(false);
                }}
                priceRange={priceRange}
                onPriceChange={handlePriceChange}
                onResetFilters={() => {
                  handleResetFilters();
                  setIsMobileFiltersOpen(false);
                }}
                hasActiveFilters={hasActiveFilters}
              />
            </div>
          </div>
        )}

        {/* Products Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <ProductSort
            value={sortByParam}
            onChange={(val) => updateParam("sortBy", val)}
            totalItems={pagination.total}
          />

          {errorMessage ? (
            <ErrorMessage
              message={errorMessage}
              onRetry={() => updateParam("page", "1")}
            />
          ) : !isLoading && products.length === 0 ? (
            <EmptyState
              title="No Creations Found"
              description="No luxury items match your chosen filters. Please refine or clear your parameters."
              actionText="Reset Filters"
              actionOnClick={handleResetFilters}
            />
          ) : (
            <ProductGrid products={products} isLoading={isLoading} />
          )}

          {/* Pagination Controls */}
          {pagination.pages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-200 pt-8 mt-12 text-xs">
              <p className="text-slate-500">
                Page <span className="font-semibold text-slate-900">{pagination.page}</span> of{" "}
                <span className="font-semibold text-slate-900">{pagination.pages}</span>
              </p>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page <= 1}
                  onClick={() => updateParam("page", String(pagination.page - 1))}
                  icon={ChevronLeft}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page >= pagination.pages}
                  onClick={() => updateParam("page", String(pagination.page + 1))}
                  icon={ChevronRight}
                  iconPosition="right"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}

export default Shop;
