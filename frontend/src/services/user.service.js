import api from "../lib/axios";

export async function userLogin(user) {
  const res = await api.post("/auth/login", user);
  return res.data;
}

export async function userRegister(user) {
  const res = await api.post("/auth/register", user);
  return res.data;
}

export async function getMe() {
  const res = await api.get("/auth/me");
  return res.data;
}

export async function getUsers() {
  const res = await api.get("/auth/users");
  return res.data;
}

export async function updateUserRole(id, role) {
  const res = await api.patch(`/auth/users/${id}/role`, { role });
  return res.data;
}
