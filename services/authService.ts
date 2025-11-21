import { api } from "@/lib/api";

export async function login(email: string, password: string) {
  const { data } = await api.post("/users/login", { email, password });

  const user = {
    _id: data._id,
    nombre: data.nombre,
    email: data.email,
    rol: data.rol,
  };

  const token = data.token;

  return { user, token };
}

export async function register(nombre: string, email: string, password: string) {
  const { data } = await api.post("/users/register", {
    nombre,
    email,
    password,
    rol: "cliente",
  });

  const user = {
    _id: data._id,
    nombre: data.nombre,
    email: data.email,
    rol: data.rol,
  };

  const token = data.token;

  return { user, token };
}
