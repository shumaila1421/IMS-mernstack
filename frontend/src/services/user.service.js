import api from "../lib/axios";

export async function userLogin(user) {
  const res = await api.post("/auth/login", user);
  return res.data;
}

export async function userRegister(user) {
  const res = await api.post("/auth/register", user);
  return res.data;
}
