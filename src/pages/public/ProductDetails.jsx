import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Star,
  ChevronRight,
} from "lucide-react";
import productService from "../../services/productService.js";
import reviewService from "../../services/reviewService.js";
import { useCart } from "../../context/CartContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { formatCurrency } from "../../utils/formatCurrency.js";
import { formatDate } from "../../utils/formatDate.js";
import ProductGallery from "../../components/products/ProductGallery.jsx";
import ProductRating from "../../components/products/ProductRating.jsx";
import RelatedProducts from "../../components/products/RelatedProducts.jsx";
import PageContainer from "../../components/layout/PageContainer.jsx";
import Button from "../../components/common/Button.jsx";
import Loader from "../../components/common/Loader.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";

export function ProductDetails() {
  const { id } = useParams();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  // Review Form state
  const [reviewForm, setReviewForm] = useState({ rating: 5, title: "", comment: "" });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewMessage, setReviewMessage] = useState("");
  const [reviewError, setReviewError] = useState("");

  useEffect(() => {
    async function loadProductData() {
      setIsLoading(true);
      setError("");
      try {
        const [prodRes, relRes, revRes] = await Promise.all([
          productService.getProductById(id),
          productService.getRelatedProducts(id),
          reviewService.getProductReviews(id),
        ]);

        if (prodRes?.data) setProduct(prodRes.data);
        if (relRes?.data) setRelatedProducts(relRes.data);
        if (revRes?.data) setReviews(revRes.data);
      } catch (err) {
        setError(err.message || "Failed to load product details");
      } finally {
        setIsLoading(false);
      }
    }

    loadProductData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return;
    setIsSubmittingReview(true);
    setReviewError("");
    setReviewMessage("");

    try {
      await reviewService.createReview(id, reviewForm);
      setReviewMessage("Your review has been successfully submitted!");
      setReviewForm({ rating: 5, title: "", comment: "" });
      // Refresh reviews
      const revRes = await reviewService.getProductReviews(id);
      if (revRes?.data) setReviews(revRes.data);
    } catch (err) {
      setReviewError(err.message || "Failed to submit review");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (isLoading) {
    return <Loader fullScreen text="Presenting creation..." />;
  }

  if (error || !product) {
    return (
      <PageContainer>
        <ErrorMessage message={error || "Product not found"} />
        <div className="text-center mt-6">
          <Link to="/shop">
            <Button variant="primary">Return to Boutique</Button>
          </Link>
        </div>
      </PageContainer>
    );
  }

  const inWishlist = isInWishlist(product._id);
  const isOutOfStock = product.stock <= 0;
  const isSale = product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <PageContainer>
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-400 uppercase tracking-widest mb-8">
        <Link to="/" className="hover:text-slate-800">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/shop" className="hover:text-slate-800">Boutique</Link>
        <ChevronRight className="w-3 h-3" />
        {product.category?.slug && (
          <>
            <Link to={`/categories/${product.category.slug}`} className="hover:text-slate-800">
              {product.category.name}
            </Link>
            <ChevronRight className="w-3 h-3" />
          </>
        )}
        <span className="text-slate-800 truncate">{product.name}</span>
      </nav>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Gallery */}
        <ProductGallery images={product.images} title={product.name} />

        {/* Product Details & Actions */}
        <div className="flex flex-col justify-between space-y-8">
          <div className="space-y-4">
            {/* Category / SKU */}
            <div className="flex items-center justify-between text-xs uppercase tracking-widest text-slate-400">
              <span>{product.category?.name || "Exclusive Collection"}</span>
              {product.sku && <span className="font-mono">{product.sku}</span>}
            </div>

            {/* Title */}
            <h1 className="font-editorial text-3xl sm:text-4xl font-medium text-slate-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating & Review summary */}
            <div className="flex items-center gap-3">
              <ProductRating rating={product.rating || 5} count={product.numReviews} size="md" />
              <span className="text-xs text-slate-400">•</span>
              <a href="#reviews" className="text-xs text-blue-600 hover:underline">
                Read {product.numReviews} Client Impressions
              </a>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="font-editorial text-3xl font-semibold text-slate-900">
                {formatCurrency(product.price)}
              </span>
              {isSale && (
                <span className="text-base text-slate-400 line-through">
                  {formatCurrency(product.compareAtPrice)}
                </span>
              )}
            </div>

            {/* Availability & Stock */}
            <div className="pt-2">
              {isOutOfStock ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider">
                  Out of Stock • Awaiting Atelier Allocation
                </span>
              ) : product.stock <= 5 ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-50 text-amber-800 text-xs font-semibold uppercase tracking-wider">
                  Extremely Limited Allocation: Only {product.stock} Remaining
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                  <Check className="w-4 h-4 text-emerald-600" />
                  In Stock & Ready for Immediate Dispatch
                </span>
              )}
            </div>

            {/* Short Excerpt */}
            <p className="text-sm text-slate-600 leading-relaxed pt-2">
              {product.description}
            </p>
          </div>

          {/* Purchasing Actions */}
          <div className="pt-6 border-t border-slate-200 space-y-4">
            <div className="flex items-center gap-4">
              {/* Quantity */}
              {!isOutOfStock && (
                <div className="flex items-center border border-slate-200 rounded-sm bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-3 text-slate-500 hover:text-slate-900"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-sm font-semibold text-slate-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="px-3 py-3 text-slate-500 hover:text-slate-900"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              )}

              {/* Add to Cart Button */}
              <Button
                variant="primary"
                size="lg"
                disabled={isOutOfStock}
                onClick={() => addToCart(product, quantity)}
                className="flex-1 uppercase tracking-widest text-xs font-semibold py-4"
                icon={ShoppingBag}
              >
                {isOutOfStock ? "Allocation Reserved" : "Add to Shopping Bag"}
              </Button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                aria-label={inWishlist ? "Remove from wishlist" : "Save to wishlist"}
                className={`p-3.5 border rounded-sm transition-colors ${
                  inWishlist
                    ? "border-rose-300 bg-rose-50 text-rose-600"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                }`}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? "fill-rose-600" : ""}`} />
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-2 pt-6 text-[11px] text-slate-500 border-t border-slate-100">
              <div className="flex flex-col items-center text-center p-2 gap-1">
                <Truck className="w-4 h-4 text-slate-800" />
                <span>Complimentary Express Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center p-2 gap-1 border-x border-slate-100">
                <ShieldCheck className="w-4 h-4 text-slate-800" />
                <span>Certified Authenticity</span>
              </div>
              <div className="flex flex-col items-center text-center p-2 gap-1">
                <RotateCcw className="w-4 h-4 text-slate-800" />
                <span>30-Day Atelier Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Description / Specifications / Shipping */}
      <section className="mt-20 pt-10 border-t border-slate-200">
        <div className="flex border-b border-slate-200 gap-8 mb-8 text-xs uppercase tracking-widest font-semibold">
          <button
            onClick={() => setActiveTab("description")}
            className={`pb-3 transition-colors ${
              activeTab === "description"
                ? "border-b-2 border-navy-950 text-navy-950"
                : "text-slate-400 hover:text-slate-800"
            }`}
          >
            Artisanal Story
          </button>
          <button
            onClick={() => setActiveTab("shipping")}
            className={`pb-3 transition-colors ${
              activeTab === "shipping"
                ? "border-b-2 border-navy-950 text-navy-950"
                : "text-slate-400 hover:text-slate-800"
            }`}
          >
            Transit & Packaging
          </button>
        </div>

        {activeTab === "description" ? (
          <div className="max-w-3xl space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>{product.description}</p>
            <p>
              Each item is examined under rigorous quality tolerances prior to sealing in tamper-evident protective chambers. Serial numbers are etched on individual components to ensure traceability throughout the product lifecycle.
            </p>
          </div>
        ) : (
          <div className="max-w-3xl space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              Orders are dispatched via private courier directly from our fulfillment ateliers in New York and Geneva. Each package includes numbered certification cards, bespoke gift boxing, and a prepaid return manifest.
            </p>
          </div>
        )}
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="mt-20 pt-10 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">
              Testimony
            </p>
            <h2 className="font-editorial text-2xl font-medium text-slate-900">
              Client Impressions ({reviews.length})
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-6">
            {reviews.length === 0 ? (
              <p className="text-xs text-slate-400 italic">
                Be the first connoisseur to share an impression of this piece.
              </p>
            ) : (
              reviews.map((rev) => (
                <div key={rev._id} className="p-6 bg-white border border-slate-100 rounded-sm shadow-subtle space-y-2">
                  <div className="flex items-center justify-between">
                    <ProductRating rating={rev.rating} showCount={false} size="sm" />
                    <span className="text-[11px] text-slate-400">{formatDate(rev.createdAt)}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900">{rev.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                  <p className="text-[11px] text-slate-400 uppercase tracking-wider pt-2">
                    — {rev.userName}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Add Review Form */}
          <div className="bg-slate-50 border border-slate-200 rounded-sm p-6 self-start space-y-4">
            <h3 className="font-editorial text-lg font-medium text-slate-900">
              Submit an Impression
            </h3>

            {reviewMessage && (
              <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded border border-emerald-200">
                {reviewMessage}
              </div>
            )}
            {reviewError && (
              <div className="p-3 bg-rose-50 text-rose-800 text-xs rounded border border-rose-200">
                {reviewError}
              </div>
            )}

            {isAuthenticated ? (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-slate-700 block mb-1">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        className="p-1"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= reviewForm.rating
                              ? "text-amber-400 fill-amber-400"
                              : "text-slate-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-slate-700 block mb-1">
                    Impression Headline
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Masterful Execution & Finish"
                    value={reviewForm.title}
                    onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                    className="w-full text-xs p-2.5 rounded border border-slate-200 bg-white focus:outline-none focus:border-navy-900"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-slate-700 block mb-1">
                    Detailed Notes
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe the craftsmanship, tactile finish, and accuracy..."
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    className="w-full text-xs p-2.5 rounded border border-slate-200 bg-white focus:outline-none focus:border-navy-900"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  isLoading={isSubmittingReview}
                  className="w-full uppercase tracking-wider text-xs"
                >
                  Post Review
                </Button>
              </form>
            ) : (
              <div className="text-center py-4 space-y-3">
                <p className="text-xs text-slate-500">
                  Please authenticate with your client profile to register an impression.
                </p>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="w-full">
                    Sign In to Review
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <RelatedProducts products={relatedProducts} />
    </PageContainer>
  );
}

export default ProductDetails;
