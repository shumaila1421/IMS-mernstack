import { createPortal } from "react-dom";

function money(amount) {
  return "Rs. " + Number(amount || 0).toLocaleString();
}

export default function InvoicePrint({ invoice }) {
  const customerName = invoice.customer?.name || invoice.customerName || "N/A";

  return createPortal(
    <div className="hidden bg-white p-10 text-black print:block">
      <div className="flex items-start justify-between border-b-2 border-black pb-4">
        <div>
          <h1 className="text-3xl font-bold">INVOICE</h1>
          <p className="mt-1 text-sm">Inventory Management System</p>
        </div>

        <div className="text-right text-sm">
          <p className="font-semibold">{invoice.invoiceNumber}</p>
          <p>Date: {new Date(invoice.createdAt).toLocaleDateString()}</p>
          <p>Status: {invoice.status}</p>
        </div>
      </div>

      <div className="mt-6 text-sm">
        <p className="font-semibold">Bill To</p>
        <p>{customerName}</p>
        {invoice.customer?.phone && <p>Phone: {invoice.customer.phone}</p>}
        {invoice.customer?.email && <p>Email: {invoice.customer.email}</p>}
      </div>

      <table className="mt-6 w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-y border-black">
            <th className="py-2">#</th>
            <th className="py-2">Product</th>
            <th className="py-2">Qty</th>
            <th className="py-2">Price</th>
            <th className="py-2 text-right">Total</th>
          </tr>
        </thead>

        <tbody>
          {invoice.items?.map((item, index) => (
            <tr key={item._id || index} className="border-b border-gray-300">
              <td className="py-2">{index + 1}</td>
              <td className="py-2">
                {item.product?.name || item.name || "N/A"}
              </td>
              <td className="py-2">{item.quantity}</td>
              <td className="py-2">{money(item.price)}</td>
              <td className="py-2 text-right">{money(item.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-6 text-right text-xl font-bold">
        Grand Total: {money(invoice.grandTotal)}
      </p>

      <p className="mt-16 text-center text-sm text-gray-600">
        Thank you for your business!
      </p>
    </div>,
    document.body,
  );
}
