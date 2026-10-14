import api from "../lib/axios";

export async function checkHealth() {
  const data = await api.get("/health");
  return data.data;
}
