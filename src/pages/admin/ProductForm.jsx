import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import productService from "../../services/productService.js";
import categoryService from "../../services/categoryService.js";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import Loader from "../../components/common/Loader.jsx";

export function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    compareAtPrice: "",
    category: "",
    stock: 10,
    sku: "",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80"],
    tags: "",
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    isActive: true,
  });

  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const catRes = await categoryService.getCategories();
        if (catRes?.data) {
          setCategories(catRes.data);
          if (!isEditing && catRes.data.length > 0) {
            setFormData((prev) => ({ ...prev, category: catRes.data[0]._id }));
          }
        }

        if (isEditing) {
          const prodRes = await productService.getProductById(id);
          if (prodRes?.data) {
            const p = prodRes.data;
            setFormData({
              name: p.name || "",
              slug: p.slug || "",
              description: p.description || "",
              price: p.price || "",
              compareAtPrice: p.compareAtPrice || "",
              category: typeof p.category === "object" ? p.category._id : p.category,
              stock: p.stock !== undefined ? p.stock : 10,
              sku: p.sku || "",
              images: p.images?.length > 0 ? p.images : [""],
              tags: p.tags?.join(", ") || "",
              isFeatured: !!p.isFeatured,
              isBestSeller: !!p.isBestSeller,
              isNewArrival: !!p.isNewArrival,
              isActive: p.isActive !== undefined ? p.isActive : true,
            });
          }
        }
      } catch (err) {
        setError(err.message || "Failed to load product data");
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [id, isEditing]);

  const handleImageChange = (index, value) => {
    const updated = [...formData.images];
    updated[index] = value;
    setFormData({ ...formData, images: updated });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ""] });
  };

  const removeImageField = (index) => {
    if (formData.images.length <= 1) return;
    const updated = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      const cleanImages = formData.images.filter((img) => img.trim().length > 0);
      if (cleanImages.length === 0) {
        throw new Error("At least one valid image URL is required");
      }

      const payload = {
        name: formData.name,
        slug: formData.slug || undefined,
        description: formData.description,
        price: Number(formData.price),
        compareAtPrice: Number(formData.compareAtPrice) || 0,
        category: formData.category,
        stock: Number(formData.stock),
        sku: formData.sku || undefined,
        images: cleanImages,
        tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : [],
        isFeatured: formData.isFeatured,
        isBestSeller: formData.isBestSeller,
        isNewArrival: formData.isNewArrival,
        isActive: formData.isActive,
      };

      if (isEditing) {
        await productService.updateProduct(id, payload);
      } else {
        await productService.createProduct(payload);
      }

      navigate("/admin/products");
    } catch (err) {
      setError(err.message || "Failed to save product details");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <Loader fullScreen text="Loading product profile..." />;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link to="/admin/products" className="p-1.5 text-slate-400 hover:text-slate-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="font-editorial text-2xl font-bold text-slate-900">
            {isEditing ? "Edit Creation" : "Commission New Piece"}
          </h2>
          <p className="text-xs text-slate-500">
            Configure product metadata, pricing, imagery, and vault allocations.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 bg-white border border-slate-200 rounded-sm p-6 sm:p-8 shadow-subtle">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="font-editorial text-base font-semibold text-slate-900 border-b border-slate-100 pb-2">
            Basic Particulars
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Product Title"
              name="name"
              placeholder="e.g. Sovereign Chronometer 41mm"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              label="SKU Reference Code"
              name="sku"
              placeholder="LUXE-WTC-001"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1">
              Category Discipline <span className="text-rose-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
              className="w-full text-xs p-2.5 rounded border border-slate-200 bg-white focus:outline-none focus:border-navy-900 cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1">
              Full Description & Provenance Notes <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={4}
              required
              placeholder="Describe materials, movement complications, finish..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full text-xs p-3 rounded border border-slate-200 bg-white focus:outline-none focus:border-navy-900"
            />
          </div>
        </div>

        {/* Pricing & Inventory */}
        <div className="space-y-4">
          <h3 className="font-editorial text-base font-semibold text-slate-900 border-b border-slate-100 pb-2">
            Pricing & Inventory
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Retail Price (USD)"
              name="price"
              type="number"
              min="0"
              step="any"
              placeholder="3450"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
            <Input
              label="Compare At Price (USD)"
              name="compareAtPrice"
              type="number"
              min="0"
              step="any"
              placeholder="3800"
              value={formData.compareAtPrice}
              onChange={(e) => setFormData({ ...formData, compareAtPrice: e.target.value })}
            />
            <Input
              label="Vault Stock Count"
              name="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Images */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-editorial text-base font-semibold text-slate-900">
              Imagery URLs
            </h3>
            <button
              type="button"
              onClick={addImageField}
              className="text-xs text-blue-600 hover:text-navy-950 font-semibold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add URL</span>
            </button>
          </div>

          <div className="space-y-3">
            {formData.images.map((img, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={img}
                  onChange={(e) => handleImageChange(idx, e.target.value)}
                  className="flex-1 text-xs p-2.5 rounded border border-slate-200 bg-white focus:outline-none focus:border-navy-900"
                  required={idx === 0}
                />
                {formData.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageField(idx)}
                    className="p-2 text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Badges & Flags */}
        <div className="space-y-4">
          <h3 className="font-editorial text-base font-semibold text-slate-900 border-b border-slate-100 pb-2">
            Editorial Visibility & Badges
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="rounded text-navy-900"
              />
              <span className="font-medium text-slate-700">Featured Piece</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isBestSeller}
                onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                className="rounded text-navy-900"
              />
              <span className="font-medium text-slate-700">Best Seller</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isNewArrival}
                onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                className="rounded text-navy-900"
              />
              <span className="font-medium text-slate-700">New Release</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="rounded text-navy-900"
              />
              <span className="font-medium text-slate-700">Catalogue Active</span>
            </label>
          </div>

          <Input
            label="Search Keywords / Tags (Comma separated)"
            name="tags"
            placeholder="watch, automatic, sapphire, swiss"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <Link to="/admin/products">
            <Button variant="secondary" size="md">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSaving}
            icon={Save}
          >
            {isEditing ? "Save Modifications" : "Publish Creation"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
