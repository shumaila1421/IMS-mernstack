import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../../services/supplier.service";
import SuppliersTable from "../../components/suppliers/SupplierTable";
import SupplierForm from "../../components/suppliers/SupplierForm";
import ConfirmModal from "../../components/ui/ConfirmModal";
import BackToDashboard from "../../components/ui/BackToDashboard";

function sortByName(list) {
  return [...list].sort((a, b) => a.name.localeCompare(b.name));
}

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [saving, setSaving] = useState(false);

  const [supplierToDelete, setSupplierToDelete] = useState(null);

  useEffect(() => {
    async function fetchSuppliers() {
      try {
        const res = await getSuppliers();
        setSuppliers(res.suppliers);
      } catch (error) {
        setError(error.response?.data?.message || "Suppliers couldn't load");
      } finally {
        setLoading(false);
      }
    }

    fetchSuppliers();
  }, []);

  function openAddForm() {
    setEditingSupplier(null);
    setFormOpen(true);
  }

  function openEditForm(supplier) {
    setEditingSupplier(supplier);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingSupplier(null);
  }

  async function handleSave(data) {
    try {
      setSaving(true);

      if (editingSupplier) {
        const res = await updateSupplier(editingSupplier._id, data);

        setSuppliers((current) =>
          sortByName(
            current.map((supplier) =>
              supplier._id === editingSupplier._id ? res.supplier : supplier,
            ),
          ),
        );

        toast.success("Supplier updated successfully!");
      } else {
        const res = await createSupplier(data);

        setSuppliers((current) => sortByName([...current, res.supplier]));

        toast.success("Supplier added successfully!");
      }

      closeForm();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save supplier");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!supplierToDelete) {
      return;
    }

    try {
      await deleteSupplier(supplierToDelete._id);

      setSuppliers((current) =>
        current.filter((supplier) => supplier._id !== supplierToDelete._id),
      );

      toast.success("Supplier deleted successfully!");
      setSupplierToDelete(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete supplier");
    }
  }

  if (loading) {
    return <p>Loading suppliers...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-6">
      <BackToDashboard />

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Suppliers</h2>

        <button
          onClick={openAddForm}
          className="rounded-lg bg-green-700 px-4 py-2 text-white hover:bg-green-800"
        >
          Add Supplier
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <SuppliersTable
          suppliers={suppliers}
          onEdit={openEditForm}
          onDelete={(supplier) => setSupplierToDelete(supplier)}
        />
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {editingSupplier ? "Edit Supplier" : "Add Supplier"}
              </h2>

              <button
                type="button"
                onClick={closeForm}
                className="text-2xl text-gray-500 hover:text-gray-800"
              >
                &times;
              </button>
            </div>

            <SupplierForm
              key={editingSupplier?._id || "new"}
              initialData={editingSupplier}
              isEditing={Boolean(editingSupplier)}
              onSubmit={handleSave}
              loading={saving}
              onCancel={closeForm}
            />
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={Boolean(supplierToDelete)}
        title="Delete Supplier"
        message={`Are you sure you want to delete "${supplierToDelete?.name}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setSupplierToDelete(null)}
        confirmText="Delete"
      />
    </div>
  );
}
