import { Pencil, Trash2 } from "lucide-react";

export default function CategoriesTable({ categories, onEdit, onDelete }) {
  return (
    <table className="w-full text-left text-sm">
      <thead className="bg-gray-100 text-gray-600">
        <tr>
          <th className="px-6 py-4 font-medium">Category Name</th>
          <th className="px-6 py-4 font-medium">Description</th>
          <th className="px-6 py-4 font-medium">Actions</th>
        </tr>
      </thead>

      <tbody>
        {categories.length === 0 ? (
          <tr>
            <td colSpan="3" className="px-6 py-6 text-center text-gray-500">
              No categories available.
            </td>
          </tr>
        ) : (
          categories.map((category) => (
            <tr
              key={category._id}
              className="border-t border-gray-200 hover:bg-gray-50"
            >
              <td className="px-6 py-4 font-medium text-gray-800">
                {category.name}
              </td>

              <td className="px-6 py-4 text-gray-600">
                {category.description || "-"}
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    title="Edit category"
                    onClick={() => onEdit(category)}
                    className="text-gray-800 hover:text-blue-900"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    type="button"
                    title="Delete category"
                    onClick={() => onDelete(category)}
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
