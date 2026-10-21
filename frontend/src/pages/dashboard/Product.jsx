import { useEffect, useState } from "react";
import { getProducts } from "../../services/product.service";
import ProductsTable from "../../components/products/ProductsTable";
import { useNavigate } from "react-router-dom";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-6">
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
        <ProductsTable products={products} />
      </div>
    </div>
  );
}
