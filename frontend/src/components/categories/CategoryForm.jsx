import { useState } from "react";

export default function CategoryForm({
  onSubmit,
  loading,
  onCancel,
  initialData,
  isEditing,
}) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      name: formData.name.trim(),
      description: formData.description.trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Category Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-700"
          placeholder="e.g. Mobiles"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Description (Optional)
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-700"
          placeholder="Enter category description"
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-green-700 px-4 py-2 text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? isEditing
              ? "Updating..."
              : "Saving..."
            : isEditing
              ? "Update Category"
              : "Save Category"}
        </button>
      </div>
    </form>
  );
}
