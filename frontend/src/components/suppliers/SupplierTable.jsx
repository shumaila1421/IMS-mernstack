import { Pencil, Trash2 } from "lucide-react";

export default function SuppliersTable({ suppliers, onEdit, onDelete }) {
  return (
    <table className="w-full text-left text-sm">
      <thead className="bg-gray-100 text-gray-600">
        <tr>
          <th className="px-6 py-4 font-medium">Supplier Name</th>
          <th className="px-6 py-4 font-medium">Phone</th>
          <th className="px-6 py-4 font-medium">Email</th>
          <th className="px-6 py-4 font-medium">Address</th>
          <th className="px-6 py-4 font-medium">Actions</th>
        </tr>
      </thead>

      <tbody>
        {suppliers.length === 0 ? (
          <tr>
            <td colSpan="5" className="px-6 py-6 text-center text-gray-500">
              No suppliers available.
            </td>
          </tr>
        ) : (
          suppliers.map((supplier) => (
            <tr
              key={supplier._id}
              className="border-t border-gray-200 hover:bg-gray-50"
            >
              <td className="px-6 py-4 font-medium text-gray-800">
                {supplier.name}
              </td>

              <td className="px-6 py-4 text-gray-600">
                {supplier.phone || "-"}
              </td>

              <td className="px-6 py-4 text-gray-600">
                {supplier.email || "-"}
              </td>

              <td className="px-6 py-4 text-gray-600">
                {supplier.address || "-"}
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    title="Edit supplier"
                    onClick={() => onEdit(supplier)}
                    className="text-gray-800 hover:text-blue-900"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    type="button"
                    title="Delete supplier"
                    onClick={() => onDelete(supplier)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
