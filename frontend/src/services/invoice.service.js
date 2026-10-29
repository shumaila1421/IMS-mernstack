import api from "../lib/axios";

export async function createInvoice(invoiceData) {
  const res = await api.post("/invoices", invoiceData);
  return res.data;
}

export async function getInvoices() {
  const res = await api.get("/invoices");
  return res.data;
}

export async function getSingleInvoice(id) {
  const res = await api.get(`/invoices/${id}`);
  return res.data;
}

export async function updateInvoiceStatus(id, status) {
  const res = await api.patch(`/invoices/${id}/status`, { status });
  return res.data;
}
