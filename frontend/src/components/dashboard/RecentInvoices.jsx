export default function RecentInvoices({ invoices }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-lg font-bold text-slate-900">Recent Invoices</h2>

        <p className="mt-1 text-sm text-slate-500">Your latest sales.</p>
      </div>

      {invoices.length === 0 ? (
        <p className="p-6 text-sm text-slate-500">No invoices yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-3 font-medium">Invoice</th>
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Total</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {invoices.map((invoice) => (
                <tr key={invoice._id} className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-900">
                    {invoice.invoiceNumber}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                    {invoice.customer?.name || invoice.customerName || "-"}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-900">
                    PKR {Number(invoice.grandTotal).toLocaleString("en-PK")}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
