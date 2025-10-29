"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, BarChart3, Settings } from "lucide-react";

export default function SellerDashboard() {
  const [stats, setStats] = useState({
    ventasHoy: 0,
    productosActivos: 0,
    stockBajo: 0,
  });

  useEffect(() => {
    // Datos simulados (luego se conectará con backend)
    setStats({
      ventasHoy: 5,
      productosActivos: 12,
      stockBajo: 3,
    });
  }, []);

  const quickActions = [
    {
      icon: Package,
      title: "Gestionar productos",
      description: "Agrega, edita o elimina tus productos.",
      href: "/products",
    },
    {
      icon: BarChart3,
      title: "Ver reportes",
      description: "Consulta tus ventas y estadísticas.",
      href: "/(seller)/reports",
    },
    {
      icon: Settings,
      title: "Configuración",
      description: "Ajusta la información de tu cuenta.",
      href: "/(seller)/dashboard",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-28">
        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <h1 className="mb-4 text-4xl md:text-6xl font-extrabold tracking-tight">
            Panel del Vendedor
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/90">
            Administra tus ventas, gestiona tus productos y visualiza tus métricas en un solo lugar.
          </p>
        </div>
      </section>

      {/* Metricas principales */}
      <section className="relative bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
            Resumen general
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary text-center">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Ventas hoy</h3>
              <p className="text-4xl font-bold text-primary">{stats.ventasHoy}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500 text-center">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Productos activos</h3>
              <p className="text-4xl font-bold text-green-500">{stats.productosActivos}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-red-500 text-center">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Stock bajo</h3>
              <p className="text-4xl font-bold text-red-500">{stats.stockBajo}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Accesos rápidos */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Accesos rápidos
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Gestiona fácilmente tus productos, reportes y ajustes.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {quickActions.map((action, i) => (
              <Link
                key={i}
                href={action.href}
                className="group flex flex-col items-center bg-gradient-to-br from-white to-[#f9fbff] rounded-lg shadow-sm border transition-all hover:shadow-lg hover:scale-[1.02]"
              >
                <div className="mt-8 mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <action.icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-semibold">{action.title}</h3>
                <p className="text-sm text-gray-500 mb-8 max-w-[200px] text-center">
                  {action.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <section className="relative mt-20 rounded-xl overflow-hidden shadow-md">
          {/* Background con gradiente */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-blue-700/90 to-blue-500/80">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1),transparent_60%)]"></div>
          </div>

          <div className="relative z-10 p-10 text-center text-white">
            <h3 className="text-3xl font-bold mb-3">
              ¡Aumenta tus ventas hoy mismo!
            </h3>
            <p className="max-w-2xl mx-auto text-white/90 mb-6">
              Publica nuevos productos, gestiona tu inventario y haz crecer tu negocio en MarketX.
            </p>
            <Link
              href="/(seller)/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-md hover:bg-gray-100 transition"
            >
              Agregar producto
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>

      </section>

      <Footer />
    </main>
  );
}
