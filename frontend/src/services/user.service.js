import api from "../lib/axios";

export async function register(formData) {
  const response = await api.post("/auth/register", formData);
  return response.data;
}

export async function login(formData) {
  const response = await api.post("/auth/login", formData);
  return response.data;
}
