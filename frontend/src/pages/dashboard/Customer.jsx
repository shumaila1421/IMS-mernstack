import { useEffect, useState, useContext } from "react";
import { UserStore } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getCustomers,
  updateCustomer,
  deleteCustomer,
} from "../../services/customer.service";
import CustomersTable from "../../components/customers/CustomersTable";
import CustomerForm from "../../components/customers/CustomerForm";
import ConfirmModal from "../../components/ui/ConfirmModal";
import BackToDashboard from "../../components/ui/BackToDashboard";

export default function Customer() {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const navigate = useNavigate();
  const { user } = useContext(UserStore);
  const canManage = user?.role === "admin" || user?.role === "manager";

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const res = await getCustomers();
        console.log("Customers response:", res);
        setCustomers(res.customers);
      } catch (error) {
        setError(error.response?.data?.message || "Customers couldn't load");
      } finally {
        setLoading(false);
      }
    }

    fetchCustomers();
  }, []);

  async function handleUpdate(customerData) {
    try {
      setSavingEdit(true);

      const res = await updateCustomer(editingCustomer._id, customerData);

      setCustomers((currentCustomers) =>
        currentCustomers.map((customer) =>
          customer._id === editingCustomer._id ? res.customer : customer,
        ),
      );

      setEditingCustomer(null);
      toast.success("Customer updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update customer");
    } finally {
      setSavingEdit(false);
    }
  }

  async function handleDelete() {
    if (!customerToDelete) {
      return;
    }

    try {
      await deleteCustomer(customerToDelete._id);

      setCustomers((currentCustomers) =>
        currentCustomers.filter(
          (customer) => customer._id !== customerToDelete._id,
        ),
      );

      toast.success("Customer deleted successfully!");
      setCustomerToDelete(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete customer");
    }
  }

  if (loading) {
    return <p>Loading customers...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-6">
      <BackToDashboard />

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Customers</h2>

        {canManage && (
          <button
            onClick={() => navigate("/dashboard/add-customers")}
            className="rounded-lg bg-green-700 px-4 py-2 text-white hover:bg-green-800"
          >
            Add Customer
          </button>
        )}
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <CustomersTable
          customers={customers}
          canManage={canManage}
          onEdit={(customer) => setEditingCustomer(customer)}
          onDelete={(customerId) =>
            setCustomerToDelete(
              customers.find((customer) => customer._id === customerId),
            )
          }
        />
      </div>

      {editingCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Edit Customer</h2>

              <button
                type="button"
                onClick={() => setEditingCustomer(null)}
                className="text-2xl text-gray-500 hover:text-gray-800"
              >
                &times;
              </button>
            </div>

            <CustomerForm
              key={editingCustomer._id}
              initialData={editingCustomer}
              isEditing={true}
              onSubmit={handleUpdate}
              loading={savingEdit}
              onCancel={() => setEditingCustomer(null)}
            />
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={Boolean(customerToDelete)}
        title="Delete Customer"
        message={`Are you sure you want to delete "${customerToDelete?.name}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setCustomerToDelete(null)}
        confirmText="Delete"
      />
    </div>
  );
}
