import { Pencil, Trash2 } from "lucide-react";

export default function CustomersTable({
  customers,
  onEdit,
  onDelete,
  canManage,
}) {
  return (
    <table className="w-full text-left text-sm">
      <thead className="bg-gray-100 text-gray-600">
        <tr>
          <th className="px-6 py-4 font-medium">Customer Name</th>
          <th className="px-6 py-4 font-medium">Email</th>
          <th className="px-6 py-4 font-medium">Phone</th>
          <th className="px-6 py-4 font-medium">Address</th>
          {canManage && <th className="px-6 py-4 font-medium">Actions</th>}
        </tr>
      </thead>

      <tbody>
        {customers.length === 0 ? (
          <tr>
            <td
              colSpan={canManage ? 5 : 4}
              className="px-6 py-6 text-center text-gray-500"
            >
              No customers available.
            </td>
          </tr>
        ) : (
          customers.map((customer) => (
            <tr
              key={customer._id}
              className="border-t border-gray-200 hover:bg-gray-50"
            >
              <td className="px-6 py-4 font-medium text-gray-800">
                {customer.name}
              </td>

              <td className="px-6 py-4 text-gray-600">
                {customer.email || "-"}
              </td>

              <td className="px-6 py-4 text-gray-600">
                {customer.phone || "-"}
              </td>

              <td className="px-6 py-4 text-gray-600">
                {customer.address || "-"}
              </td>

              {canManage && (
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      title="Edit customer"
                      onClick={() => onEdit(customer)}
                      className="text-gray-800 hover:text-blue-900"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      type="button"
                      title="Delete customer"
                      onClick={() => onDelete(customer._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
