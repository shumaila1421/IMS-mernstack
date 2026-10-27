import api from "../lib/axios";

export async function getCategories() {
  const res = await api.get("/categories");
  return res.data;
}

export async function createCategory(category) {
  const res = await api.post("/categories", category);
  return res.data;
}

export async function updateCategory(id, category) {
  const res = await api.put(`/categories/${id}`, category);
  return res.data;
}

export async function deleteCategory(id) {
  const res = await api.delete(`/categories/${id}`);
  return res.data;
}
