"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { register as registerService } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();
  const { login } = useAuth();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const { user, token } = await registerService(username, email, password);

      login({ user, token });

      alert("¡Registro exitoso!");
      router.push("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.mensaje || "Error al registrarse");
      } else {
        alert("Error inesperado");
      }
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="bg-gradient-hero py-20 text-center text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Regístrate
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Crea tu cuenta y comienza a vender o comprar productos en MarketX.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <form
            onSubmit={handleSignUp}
            className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto border-t-4 border-primary"
          >
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">
                Nombre de usuario
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Elige un nombre de usuario"
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo electrónico"
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Crea una contraseña"
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">
                Confirmar contraseña
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirma tu contraseña"
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                required
              />
            </div>

            <button type="submit" className="btn-primary w-full py-3">
              Registrarse
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm">
              ¿Ya tienes cuenta?
              <Link href="/signin" className="text-blue-600 hover:underline">
                {" "}Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
