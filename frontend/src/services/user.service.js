import api from "../lib/axios";

export async function userLogin(user) {
  try {
    let res = await api.post("/auth/login", user);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function userRegister(user) {
  try {
    let res = await api.post("/auth/register", user);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
