import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createCustomer } from "../../services/customer.service";
import CustomerForm from "./CustomerForm";

export default function AddCustomerModal() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function handleClose() {
    navigate("/dashboard/customers");
  }

  async function handleSubmit(customer) {
    try {
      setLoading(true);

      await createCustomer(customer);

      toast.success("Customer added successfully!");
      navigate("/dashboard/customers");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add customer");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Add Customer</h2>

          <button
            type="button"
            onClick={handleClose}
            className="text-2xl text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>
        </div>

        <CustomerForm
          onSubmit={handleSubmit}
          loading={loading}
          onCancel={handleClose}
        />
      </div>
    </div>
  );
}
