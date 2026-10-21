import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createProduct } from "../../services/product.service";
import ProductForm from "./ProductForm";

export default function AddProductModal() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function handleClose() {
    navigate("/dashboard/products");
  }

  async function handleSubmit(product) {
    try {
      setLoading(true);

      await createProduct(product);

      toast.success("Product added successfully!");
      navigate("/dashboard/products");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Add Product</h2>

          <button
            type="button"
            onClick={handleClose}
            className="text-2xl text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>
        </div>

        <ProductForm
          onSubmit={handleSubmit}
          loading={loading}
          onCancel={handleClose}
        />
      </div>
    </div>
  );
}
