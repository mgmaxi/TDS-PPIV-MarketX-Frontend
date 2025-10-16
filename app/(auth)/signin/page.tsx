"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = (e: React.FormEvent) => { 
    e.preventDefault();
    
    if (username === "admin" && password === "1234") {
      router.push("/");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-hero py-20 text-center text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Iniciar sesión</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Ingresa para continuar explorando los productos de MarketX.
          </p>
        </div>
      </section>

      {/* Formulario de Sign In */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <form onSubmit={handleSignIn} className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto border-t-4 border-primary">
            <div className="mb-6">
              <label htmlFor="username" className="block text-sm font-semibold text-foreground mb-2">Usuario</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Escribe tu usuario"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-semibold text-foreground mb-2">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Escribe tu contraseña"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full py-3">
              Iniciar sesión
            </button>
          </form>

          {/* Enlace para redirigir al registro */}
          <div className="mt-6 text-center">
            <p className="text-sm">
              ¿No tienes cuenta?{" "}
              <Link href="/signup" className="text-blue-600 hover:underline">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}