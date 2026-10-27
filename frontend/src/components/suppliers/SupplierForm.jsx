import { useState } from "react";

export default function SupplierForm({
  onSubmit,
  loading,
  onCancel,
  initialData,
  isEditing,
}) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    phone: initialData?.phone || "",
    email: initialData?.email || "",
    address: initialData?.address || "",
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
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      address: formData.address.trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Supplier Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-700"
          placeholder="e.g. Ali Traders"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Phone (Optional)
        </label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-700"
          placeholder="e.g. 03001234567"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Email (Optional)
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-700"
          placeholder="e.g. ali@mail.com"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Address (Optional)
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows="3"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-700"
          placeholder="Enter supplier address"
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
              ? "Update Supplier"
              : "Save Supplier"}
        </button>
      </div>
    </form>
  );
}
