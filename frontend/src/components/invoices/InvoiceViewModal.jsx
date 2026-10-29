import { Printer } from "lucide-react";
import InvoicePrint from "./InvoicePrint";

export default function InvoiceViewModal({
  invoice,
  onClose,
  canManage,
  updating,
  onMarkPaid,
  onCancelInvoice,
}) {
  if (!invoice) return null;

  const customerName = invoice.customer?.name || invoice.customerName || "N/A";

  const statusClass =
    invoice.status === "Paid"
      ? "bg-green-100 text-green-700"
      : invoice.status === "Cancelled"
        ? "bg-red-100 text-red-700"
        : "bg-yellow-100 text-yellow-700";

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
        <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Invoice Details
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="text-2xl text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">Invoice Number</p>
              <p className="font-medium">{invoice.invoiceNumber}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Customer</p>
              <p className="font-medium">{customerName}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p>{invoice.customer?.email || "N/A"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p>{invoice.customer?.phone || "N/A"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p>{new Date(invoice.createdAt).toLocaleDateString()}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass}`}
              >
                {invoice.status}
              </span>
            </div>

            <div>
              <p className="text-sm text-gray-500">Created By</p>
              <p>{invoice.createdBy?.name || "-"}</p>
            </div>
          </div>

          <h3 className="mb-3 text-lg font-semibold">Invoice Items</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-3 py-3">Product</th>
                  <th className="px-3 py-3">Quantity</th>
                  <th className="px-3 py-3">Price</th>
                  <th className="px-3 py-3">Total</th>
                </tr>
              </thead>

              <tbody>
                {invoice.items?.map((item, index) => (
                  <tr key={item._id || index} className="border-t">
                    <td className="px-3 py-3">
                      {item.product?.name || item.name || "N/A"}
                    </td>
                    <td className="px-3 py-3">{item.quantity}</td>
                    <td className="px-3 py-3">
                      Rs. {item.price?.toLocaleString()}
                    </td>
                    <td className="px-3 py-3">
                      Rs. {item.total?.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 flex justify-end border-t pt-4">
            <p className="text-lg font-bold">
              Grand Total: Rs. {invoice.grandTotal?.toLocaleString()}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              <Printer size={18} />
              Print
            </button>

            <div className="flex flex-wrap gap-3">
              {canManage && invoice.status !== "Cancelled" && (
                <button
                  type="button"
                  disabled={updating}
                  onClick={onCancelInvoice}
                  className="rounded-lg border border-red-300 px-4 py-2 text-red-600 hover:bg-red-50 disabled:opacity-60"
                >
                  Cancel Invoice
                </button>
              )}

              {canManage && invoice.status === "Pending" && (
                <button
                  type="button"
                  disabled={updating}
                  onClick={onMarkPaid}
                  className="rounded-lg bg-green-700 px-4 py-2 text-white hover:bg-green-800 disabled:opacity-60"
                >
                  {updating ? "Updating..." : "Mark as Paid"}
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-gray-300 px-5 py-2 text-gray-700 hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <InvoicePrint invoice={invoice} />
    </>
  );
}
