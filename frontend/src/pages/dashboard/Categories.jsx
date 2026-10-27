import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/category.service";
import CategoriesTable from "../../components/categories/CategoriesTable";
import CategoryForm from "../../components/categories/CategoryForm";
import ConfirmModal from "../../components/ui/ConfirmModal";
import BackToDashboard from "../../components/ui/BackToDashboard";

function sortByName(list) {
  return [...list].sort((a, b) => a.name.localeCompare(b.name));
}

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [saving, setSaving] = useState(false);

  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await getCategories();
        setCategories(res.categories);
      } catch (error) {
        setError(error.response?.data?.message || "Categories couldn't load");
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  function openAddForm() {
    setEditingCategory(null);
    setFormOpen(true);
  }

  function openEditForm(category) {
    setEditingCategory(category);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingCategory(null);
  }

  async function handleSave(data) {
    try {
      setSaving(true);

      if (editingCategory) {
        const res = await updateCategory(editingCategory._id, data);

        setCategories((current) =>
          sortByName(
            current.map((category) =>
              category._id === editingCategory._id ? res.category : category,
            ),
          ),
        );

        toast.success("Category updated successfully!");
      } else {
        const res = await createCategory(data);

        setCategories((current) => sortByName([...current, res.category]));

        toast.success("Category added successfully!");
      }

      closeForm();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save category");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!categoryToDelete) {
      return;
    }

    try {
      await deleteCategory(categoryToDelete._id);

      setCategories((current) =>
        current.filter((category) => category._id !== categoryToDelete._id),
      );

      toast.success("Category deleted successfully!");
      setCategoryToDelete(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete category");
    }
  }

  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-6">
      <BackToDashboard />

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Categories</h2>

        <button
          onClick={openAddForm}
          className="rounded-lg bg-green-700 px-4 py-2 text-white hover:bg-green-800"
        >
          Add Category
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <CategoriesTable
          categories={categories}
          onEdit={openEditForm}
          onDelete={(category) => setCategoryToDelete(category)}
        />
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {editingCategory ? "Edit Category" : "Add Category"}
              </h2>

              <button
                type="button"
                onClick={closeForm}
                className="text-2xl text-gray-500 hover:text-gray-800"
              >
                &times;
              </button>
            </div>

            <CategoryForm
              key={editingCategory?._id || "new"}
              initialData={editingCategory}
              isEditing={Boolean(editingCategory)}
              onSubmit={handleSave}
              loading={saving}
              onCancel={closeForm}
            />
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={Boolean(categoryToDelete)}
        title="Delete Category"
        message={`Are you sure you want to delete "${categoryToDelete?.name}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setCategoryToDelete(null)}
        confirmText="Delete"
      />
    </div>
  );
}
