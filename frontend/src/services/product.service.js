import api from "../lib/axios";

export async function getProducts() {
  const res = await api.get("/products");
  return res.data;
}

export async function createProduct(product) {
  const res = await api.post("/products", product);
  return res.data;
}

export async function updateProduct(id, product) {
  const res = await api.put(`/products/${id}`, product);
  return res.data;
}

export async function deleteProduct(id) {
  const res = await api.delete(`/products/${id}`);
  return res.data;
}
