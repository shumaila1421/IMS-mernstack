export default function InvoiceTable({ invoices, onView, showCreatedBy }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="px-6 py-4 font-medium">Invoice Number</th>
            <th className="px-6 py-4 font-medium">Customer</th>
            <th className="px-6 py-4 font-medium">Items</th>
            <th className="px-6 py-4 font-medium">Grand Total</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium">Date</th>
            {showCreatedBy && (
              <th className="px-6 py-4 font-medium">Created By</th>
            )}
            <th className="px-6 py-4 font-medium">Actions</th>
          </tr>
        </thead>

        <tbody>
          {invoices.length === 0 ? (
            <tr>
              <td
                colSpan={showCreatedBy ? 8 : 7}
                className="px-6 py-6 text-center text-gray-500"
              >
                No invoices available.
              </td>
            </tr>
          ) : (
            invoices.map((invoice) => (
              <tr
                key={invoice._id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {invoice.invoiceNumber}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {invoice.customer?.name || invoice.customerName || "-"}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {invoice.items?.reduce(
                    (total, item) => total + item.quantity,
                    0,
                  ) || 0}
                </td>

                <td className="px-6 py-4">
                  Rs. {invoice.grandTotal?.toLocaleString() ?? 0}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      invoice.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : invoice.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {invoice.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {new Date(invoice.createdAt).toLocaleDateString()}
                </td>

                {showCreatedBy && (
                  <td className="px-6 py-4 text-gray-600">
                    {invoice.createdBy?.name || "-"}
                  </td>
                )}

                <td className="px-6 py-4">
                  <button
                    type="button"
                    onClick={() => onView(invoice)}
                    className="font-medium text-emerald-700 hover:text-emerald-900"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
