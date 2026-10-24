import { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import categoryService from "../../services/categoryService.js";
import DataTable from "../../components/admin/DataTable.jsx";
import Modal from "../../components/common/Modal.jsx";
import ConfirmDialog from "../../components/common/ConfirmDialog.jsx";
import Button from "../../components/common/Button.jsx";
import Input from "../../components/common/Input.jsx";

export function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Create / Edit modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
    displayOrder: 1,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  // Delete modal
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const res = await categoryService.getCategories();
      if (res?.data) setCategories(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreateModal = () => {
    setEditingCategory(null);
    setFormData({
      name: "",
      slug: "",
      description: "",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
      displayOrder: categories.length + 1,
    });
    setError("");
    setIsModalOpen(true);
  };

  const openEditModal = (cat) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name || "",
      slug: cat.slug || "",
      description: cat.description || "",
      image: cat.image || "",
      displayOrder: cat.displayOrder || 1,
    });
    setError("");
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      if (editingCategory) {
        await categoryService.updateCategory(editingCategory._id, formData);
      } else {
        await categoryService.createCategory(formData);
      }
      setIsModalOpen(false);
      fetchCategories();
    } catch (err) {
      setError(err.message || "Failed to save category");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await categoryService.deleteCategory(deleteId);
      setDeleteId(null);
      fetchCategories();
    } catch (err) {
      alert("Failed to delete category: " + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const columns = [
    {
      header: "Discipline",
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.image}
            alt=""
            className="w-12 h-10 object-cover rounded border border-slate-200"
          />
          <div>
            <p className="font-semibold text-slate-900">{row.name}</p>
            <p className="text-[11px] text-slate-400 font-mono">/{row.slug}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Description",
      render: (row) => (
        <p className="text-slate-600 line-clamp-1 max-w-sm">{row.description}</p>
      ),
    },
    {
      header: "Order",
      render: (row) => <span className="font-mono text-slate-700">{row.displayOrder}</span>,
    },
    {
      header: "Actions",
      className: "text-right",
      cellClassName: "text-right",
      render: (row) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => openEditModal(row)}
            className="p-1.5 text-slate-400 hover:text-blue-600"
            title="Edit Category"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeleteId(row._id)}
            className="p-1.5 text-slate-400 hover:text-rose-600"
            title="Delete Category"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-editorial text-2xl font-bold text-slate-900">
            Category Taxonomy
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Organize high-level luxury disciplines, hero images, and sorting priorities.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={openCreateModal} icon={Plus}>
          New Category
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={categories}
        isLoading={isLoading}
        totalRecords={categories.length}
      />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? "Edit Category Discipline" : "Create New Discipline"}
      >
        <form onSubmit={handleSave} className="space-y-4">
          {error && <p className="text-xs text-rose-500">{error}</p>}

          <Input
            label="Category Name"
            name="name"
            placeholder="e.g. Haute Parfumerie"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Input
            label="Slug (Optional, auto-generated if blank)"
            name="slug"
            placeholder="haute-parfumerie"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          />

          <Input
            label="Header / Showcase Image URL"
            name="image"
            placeholder="https://images.unsplash.com/..."
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            required
          />

          <Input
            label="Display Sequence Order"
            name="displayOrder"
            type="number"
            min="1"
            value={formData.displayOrder}
            onChange={(e) => setFormData({ ...formData, displayOrder: Number(e.target.value) })}
            required
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              Brief Description
            </label>
            <textarea
              rows={3}
              placeholder="Curated summary for editorial banners..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full text-xs p-2.5 rounded border border-slate-200 bg-white focus:outline-none focus:border-navy-900"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <Button variant="secondary" size="md" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md" isLoading={isSaving}>
              Save Category
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Remove Discipline?"
        message="Removing this category may affect items assigned to it."
        isLoading={isDeleting}
      />
    </div>
  );
}

export default Categories;
