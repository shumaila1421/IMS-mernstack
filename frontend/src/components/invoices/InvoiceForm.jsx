import { useEffect, useState } from "react";
import { getCustomers } from "../../services/customer.service";
import { getProducts } from "../../services/product.service";

export default function InvoiceForm({ onSubmit, loading, onCancel }) {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [optionsLoading, setOptionsLoading] = useState(true);

  const [customer, setCustomer] = useState("");
  const [items, setItems] = useState([{ product: "", quantity: 1 }]);

  useEffect(() => {
    async function fetchOptions() {
      try {
        const [customersRes, productsRes] = await Promise.all([
          getCustomers(),
          getProducts(),
        ]);

        setCustomers(customersRes.customers || []);
        setProducts(productsRes.products || []);
      } catch (error) {
        console.error(error);
      } finally {
        setOptionsLoading(false);
      }
    }

    fetchOptions();
  }, []);

  function handleItemChange(index, field, value) {
    setItems((currentItems) =>
      currentItems.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    );
  }

  function addItem() {
    setItems((currentItems) => [...currentItems, { product: "", quantity: 1 }]);
  }

  function removeItem(index) {
    setItems((currentItems) => currentItems.filter((_, i) => i !== index));
  }

  const grandTotal = items.reduce((sum, item) => {
    const product = products.find((p) => p._id === item.product);
    return sum + (product ? product.price * Number(item.quantity) : 0);
  }, 0);

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      customer,
      items: items.map((item) => ({
        product: item.product,
        quantity: Number(item.quantity),
      })),
    });
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-700";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-1 block text-sm font-medium">Customer</label>
        <select
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          required
          disabled={optionsLoading}
          className={inputClass}
        >
          <option value="">
            {optionsLoading ? "Loading customers..." : "Select customer"}
          </option>
          {customers.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold">Products</h3>
          <button
            type="button"
            onClick={addItem}
            className="text-sm font-medium text-green-700 hover:text-green-900"
          >
            + Add Product
          </button>
        </div>

        {items.map((item, index) => {
          const selectedProduct = products.find(
            (product) => product._id === item.product,
          );

          return (
            <div
              key={index}
              className="mb-3 grid grid-cols-1 gap-3 rounded-lg border border-gray-200 p-3 sm:grid-cols-2"
            >
              <div>
                <label className="mb-1 block text-sm">Product</label>
                <select
                  value={item.product}
                  onChange={(e) =>
                    handleItemChange(index, "product", e.target.value)
                  }
                  required
                  disabled={optionsLoading}
                  className={inputClass}
                >
                  <option value="">
                    {optionsLoading ? "Loading..." : "Select product"}
                  </option>
                  {products.map((product) => (
                    <option
                      key={product._id}
                      value={product._id}
                      disabled={
                        product.quantity < 1 ||
                        items.some(
                          (other, i) =>
                            i !== index && other.product === product._id,
                        )
                      }
                    >
                      {product.name} — Stock: {product.quantity}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm">Quantity</label>
                <input
                  type="number"
                  min="1"
                  max={selectedProduct?.quantity || 1}
                  step="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                  required
                  className={inputClass}
                />
              </div>

              <div className="sm:col-span-2 flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Subtotal: Rs.{" "}
                  {(
                    (selectedProduct?.price || 0) * Number(item.quantity || 0)
                  ).toLocaleString()}
                </span>

                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-lg bg-gray-50 p-4 text-right">
        <p className="text-lg font-bold">
          Grand Total: Rs. {grandTotal.toLocaleString()}
        </p>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={
            loading ||
            optionsLoading ||
            customers.length === 0 ||
            products.length === 0
          }
          className="rounded-lg bg-green-700 px-4 py-2 text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Invoice"}
        </button>
      </div>
    </form>
  );
}
