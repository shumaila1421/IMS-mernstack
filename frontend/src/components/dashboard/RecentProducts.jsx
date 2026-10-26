export default function RecentProducts({ products }) {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-lg font-bold text-slate-900">Recent Products</h2>

        <p className="mt-1 text-sm text-slate-500">
          Your latest added products.
        </p>
      </div>

      {products.length === 0 ? (
        <p className="p-6 text-sm text-slate-500">No products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-3 font-medium">Product</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Quantity</th>
                <th className="px-6 py-3 font-medium">Stock Value</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-900">
                    {product.name}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                    PKR {Number(product.price).toLocaleString("en-PK")}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                    {product.quantity}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-900">
                    PKR{" "}
                    {(
                      Number(product.price) * Number(product.quantity)
                    ).toLocaleString("en-PK")}
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
