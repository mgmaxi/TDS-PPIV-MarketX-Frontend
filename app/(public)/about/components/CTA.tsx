"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section
      id="cta"
      className="relative bg-gradient-hero py-20 md:py-28 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_60%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center text-white">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
            ¿Listo para hacer crecer tu negocio?
          </h2>

          <p className="mb-8 text-lg text-white/90 md:text-xl">
            Únete a miles de PYMEs que ya están expandiendo sus oportunidades
            comerciales con <span className="font-semibold">MarketX</span>.
          </p>

          {/* Botones */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="btn-primary"
                variant="ghost" 
              >
                Crear cuenta gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              >
                Hablar con ventas
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-sm text-white/70">
            Sin tarjeta de crédito • Configuración instantánea • Soporte 24/7
          </p>
        </div>
      </div>
    </section>
  );
}
