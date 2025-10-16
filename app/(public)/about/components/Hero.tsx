"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
      {/* Fondo con patrón SVG */}
      <div
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"
        aria-hidden="true"
      ></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge superior */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
            <ShoppingBag className="h-4 w-4 text-white" />
            <span className="text-sm font-medium text-white">
              Marketplace para PYMEs
            </span>
          </div>

          {/* Título principal */}
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
            Conecta tu negocio con{" "}
            <span className="text-accent">miles de oportunidades</span>
          </h1>

          {/* Subtítulo */}
          <p className="mb-8 text-lg text-white/90 md:text-xl lg:text-2xl">
            La plataforma que impulsa el crecimiento de pequeñas y medianas
            empresas. Compra, vende y expande tu red comercial en un solo lugar.
          </p>

          {/* Botones principales */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                variant="ghost"
                className="btn-primary"
              >
                Comenzar ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              >
                Conocer más
              </Button>
            </Link>
          </div>

          {/* Métricas de confianza */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/80">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">100+</div>
              <div className="text-sm">Empresas activas</div>
            </div>

            <div className="hidden h-12 w-px bg-white/20 sm:block"></div>

            <div className="text-center">
              <div className="text-3xl font-bold text-white">5000+</div>
              <div className="text-sm">Productos</div>
            </div>

            <div className="hidden h-12 w-px bg-white/20 sm:block"></div>

            <div className="text-center">
              <div className="text-3xl font-bold text-white">98%</div>
              <div className="text-sm">Satisfacción</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
