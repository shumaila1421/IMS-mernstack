import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getProducts,
  updateProduct,
  deleteProduct,
} from "../../services/product.service";
import ProductsTable from "../../components/products/ProductsTable";
import ProductForm from "../../components/products/ProductForm";
import ConfirmModal from "../../components/ui/ConfirmModal";
import BackToDashboard from "../../components/ui/BackToDashboard";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await getProducts();
        console.log("Products response:", res);
        setProducts(res.products);
      } catch (error) {
        setError(error.response?.data?.message || "Products couldn't load");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  async function handleUpdate(productData) {
    try {
      setSavingEdit(true);

      await updateProduct(editingProduct._id, productData);

      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product._id === editingProduct._id
            ? { ...product, ...productData }
            : product,
        ),
      );

      setEditingProduct(null);
      toast.success("Product updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update product");
    } finally {
      setSavingEdit(false);
    }
  }

  async function handleDelete() {
    if (!productToDelete) {
      return;
    }

    try {
      await deleteProduct(productToDelete._id);

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product._id !== productToDelete._id,
        ),
      );

      toast.success("Product deleted successfully!");
      setProductToDelete(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete product");
    }
  }

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-6">
      <BackToDashboard />
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Products</h2>

        <button
          onClick={() => navigate("/dashboard/add-products")}
          className="rounded-lg bg-green-700 px-4 py-2 text-white hover:bg-green-800"
        >
          Add Product
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <ProductsTable
          products={products}
          onEdit={(product) => setEditingProduct(product)}
          onDelete={(productId) =>
            setProductToDelete(
              products.find((product) => product._id === productId),
            )
          }
        />
      </div>

      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Edit Product</h2>

              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="text-2xl text-gray-500 hover:text-gray-800"
              >
                &times;
              </button>
            </div>

            <ProductForm
              key={editingProduct._id}
              initialData={editingProduct}
              isEditing={true}
              onSubmit={handleUpdate}
              loading={savingEdit}
              onCancel={() => setEditingProduct(null)}
            />
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={Boolean(productToDelete)}
        title="Delete Product"
        message={`Are you sure you want to delete "${productToDelete?.name}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setProductToDelete(null)}
        confirmText="Delete"
      />
    </div>
  );
}
