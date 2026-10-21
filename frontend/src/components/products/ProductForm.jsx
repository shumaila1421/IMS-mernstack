import { useState } from "react";

export default function ProductForm({ onSubmit, loading, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    description: "",
    price: "",
    quantity: "",
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
      ...formData,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Product Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-700"
          placeholder="Enter product name"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">SKU</label>
        <input
          type="text"
          name="sku"
          value={formData.sku}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-700"
          placeholder="Enter SKU"
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
          placeholder="Enter product description"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          min="0"
          step="any"
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-700"
          placeholder="Enter price"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          min="0"
          step="1"
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-700"
          placeholder="Enter quantity"
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
          {loading ? "Saving..." : "Save Product"}
        </button>
      </div>
    </form>
  );
}
