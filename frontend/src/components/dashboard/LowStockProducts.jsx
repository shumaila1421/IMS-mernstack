export default function LowStockProducts({ products, limit }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-lg font-bold text-slate-900">Low Stock Alert</h2>

        <p className="mt-1 text-sm text-slate-500">
          Products with {limit} or fewer items left.
        </p>
      </div>

      {products.length === 0 ? (
        <p className="p-6 text-sm text-slate-500">
          All products are well stocked.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-3 font-medium">Product</th>
                <th className="px-6 py-3 font-medium">SKU</th>
                <th className="px-6 py-3 font-medium">Stock</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-900">
                    {product.name}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                    {product.sku}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        product.quantity === 0
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {product.quantity === 0
                        ? "Out of stock"
                        : `${product.quantity} left`}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
