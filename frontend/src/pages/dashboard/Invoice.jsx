import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserStore } from "../../context/UserContext";
import {
  getInvoices,
  updateInvoiceStatus,
} from "../../services/invoice.service";
import InvoiceTable from "../../components/invoices/InvoiceTable";
import InvoiceViewModal from "../../components/invoices/InvoiceViewModal";
import BackToDashboard from "../../components/ui/BackToDashboard";
import ConfirmModal from "../../components/ui/ConfirmModal";

export default function Invoice() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoiceToCancel, setInvoiceToCancel] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { user } = useContext(UserStore);
  const canManage = user?.role === "admin" || user?.role === "manager";

  useEffect(() => {
    async function fetchInvoices() {
      try {
        const res = await getInvoices();
        setInvoices(res.invoices || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Invoices couldn't load");
      } finally {
        setLoading(false);
      }
    }

    fetchInvoices();
  }, []);

  async function changeStatus(invoice, status) {
    try {
      setUpdating(true);

      const res = await updateInvoiceStatus(invoice._id, status);

      setInvoices((current) =>
        current.map((item) =>
          item._id === res.invoice._id ? res.invoice : item,
        ),
      );
      setSelectedInvoice(res.invoice);

      toast.success(
        status === "Paid"
          ? "Invoice marked as paid!"
          : "Invoice cancelled. Stock has been returned.",
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update invoice");
    } finally {
      setUpdating(false);
    }
  }

  async function handleConfirmCancel() {
    const invoice = invoiceToCancel;
    setInvoiceToCancel(null);

    if (invoice) {
      await changeStatus(invoice, "Cancelled");
    }
  }

  if (loading) {
    return <p>Loading invoices...</p>;
  }

  return (
    <div className="p-6">
      <BackToDashboard />

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Invoices</h2>

        <button
          type="button"
          onClick={() => navigate("/dashboard/add-invoices")}
          className="rounded-lg bg-green-700 px-4 py-2 text-white hover:bg-green-800"
        >
          Add Invoice
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <InvoiceTable
          invoices={invoices}
          showCreatedBy={canManage}
          onView={(invoice) => setSelectedInvoice(invoice)}
        />
      </div>

      {selectedInvoice && (
        <InvoiceViewModal
          invoice={selectedInvoice}
          canManage={canManage}
          updating={updating}
          onClose={() => setSelectedInvoice(null)}
          onMarkPaid={() => changeStatus(selectedInvoice, "Paid")}
          onCancelInvoice={() => setInvoiceToCancel(selectedInvoice)}
        />
      )}

      <ConfirmModal
        isOpen={Boolean(invoiceToCancel)}
        title="Cancel Invoice"
        message={`Cancel invoice ${invoiceToCancel?.invoiceNumber}? The stock of all its products will be returned. This cannot be undone.`}
        onConfirm={handleConfirmCancel}
        onCancel={() => setInvoiceToCancel(null)}
        confirmText="Cancel Invoice"
      />
    </div>
  );
}
