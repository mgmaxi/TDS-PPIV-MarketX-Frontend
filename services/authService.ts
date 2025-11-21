import { api } from "@/lib/api";

export async function login(email: string, password: string) {
  const { data } = await api.post("/users/login", { email, password });
  return data;
}

export async function register(nombre: string, email: string, password: string) {
  const { data } = await api.post("/users/register", {
    nombre,
    email,
    password,
    rol: "cliente",
  });
  return data;
}
