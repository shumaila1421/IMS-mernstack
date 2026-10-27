import api from "../lib/axios";

export async function getSuppliers() {
  const res = await api.get("/suppliers");
  return res.data;
}

export async function createSupplier(supplier) {
  const res = await api.post("/suppliers", supplier);
  return res.data;
}

export async function updateSupplier(id, supplier) {
  const res = await api.put(`/suppliers/${id}`, supplier);
  return res.data;
}

export async function deleteSupplier(id) {
  const res = await api.delete(`/suppliers/${id}`);
  return res.data;
}
