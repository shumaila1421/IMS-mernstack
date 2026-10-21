export default function ProductsTable({ products }) {
  return (
    <table className="w-full text-left text-sm">
      <thead className="bg-gray-100 text-gray-600">
        <tr>
          <th className="px-6 py-4 font-medium">Product Name</th>
          <th className="px-6 py-4 font-medium">SKU</th>
          <th className="px-6 py-4 font-medium">Price</th>
          <th className="px-6 py-4 font-medium">Quantity</th>
        </tr>
      </thead>

      <tbody>
        {products.length === 0 ? (
          <tr>
            <td colSpan="4" className="px-6 py-6 text-center text-gray-500">
              No products available.
            </td>
          </tr>
        ) : (
          products.map((product) => (
            <tr
              key={product._id}
              className="border-t border-gray-200 hover:bg-gray-50"
            >
              <td className="px-6 py-4 font-medium text-gray-800">
                {product.name}
              </td>
              <td className="px-6 py-4 text-gray-600">{product.sku}</td>
              <td className="px-6 py-4">{product.price}</td>
              <td className="px-6 py-4">{product.quantity}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
