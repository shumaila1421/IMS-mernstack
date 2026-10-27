import { useEffect, useState } from "react";
import { getCategories } from "../../services/category.service";
import { getSuppliers } from "../../services/supplier.service";

export default function ProductForm({
  onSubmit,
  loading,
  onCancel,
  initialData,
  isEditing,
}) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    sku: initialData?.sku || "",
    description: initialData?.description || "",
    price: initialData?.price ?? "",
    quantity: initialData?.quantity ?? "",
    category: initialData?.category?._id || "",
    supplier: initialData?.supplier?._id || "",
  });

  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [optionsLoading, setOptionsLoading] = useState(true);

  useEffect(() => {
    async function fetchOptions() {
      try {
        const [categoriesRes, suppliersRes] = await Promise.all([
          getCategories(),
          getSuppliers(),
        ]);

        setCategories(categoriesRes.categories);
        setSuppliers(suppliersRes.suppliers);
      } catch (error) {
        console.log(error);
      } finally {
        setOptionsLoading(false);
      }
    }

    fetchOptions();
  }, []);

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

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-700";

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
          className={inputClass}
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
          className={inputClass}
          placeholder="Enter SKU"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          disabled={optionsLoading}
          className={inputClass}
        >
          <option value="">
            {optionsLoading ? "Loading..." : "Select category"}
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        {!optionsLoading && categories.length === 0 && (
          <p className="mt-1 text-xs text-red-600">
            No categories found. Please add a category first.
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Supplier</label>
        <select
          name="supplier"
          value={formData.supplier}
          onChange={handleChange}
          required
          disabled={optionsLoading}
          className={inputClass}
        >
          <option value="">
            {optionsLoading ? "Loading..." : "Select supplier"}
          </option>
          {suppliers.map((supplier) => (
            <option key={supplier._id} value={supplier._id}>
              {supplier.name}
            </option>
          ))}
        </select>
        {!optionsLoading && suppliers.length === 0 && (
          <p className="mt-1 text-xs text-red-600">
            No suppliers found. Please add a supplier first.
          </p>
        )}
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
          className={inputClass}
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
          className={inputClass}
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
          className={inputClass}
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
          {loading
            ? isEditing
              ? "Updating..."
              : "Saving..."
            : isEditing
              ? "Update Product"
              : "Save Product"}
        </button>
      </div>
    </form>
  );
}
