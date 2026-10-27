import api from "../lib/axios";

export async function getCustomers() {
  const res = await api.get("/customers");
  return res.data;
}

export async function createCustomer(customer) {
  const res = await api.post("/customers", customer);
  return res.data;
}

export async function updateCustomer(id, customer) {
  const res = await api.put(`/customers/${id}`, customer);
  return res.data;
}

export async function deleteCustomer(id) {
  const res = await api.delete(`/customers/${id}`);
  return res.data;
}
