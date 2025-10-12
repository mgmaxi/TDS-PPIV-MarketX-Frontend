"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Package,
  Wrench,
  Shirt,
  Laptop,
  Home,
  Utensils,
} from "lucide-react";

const categories = [
  { icon: Package, name: "Materias Primas", count: "250+ productos" },
  { icon: Wrench, name: "Herramientas", count: "800+ productos" },
  { icon: Shirt, name: "Textil y Moda", count: "900+ productos" },
  { icon: Laptop, name: "Tecnología", count: "1,900+ productos" },
  { icon: Home, name: "Hogar y Oficina", count: "1,400+ productos" },
  { icon: Utensils, name: "Alimentos", count: "300+ productos" },
];

export default function Categories() {
  return (
    <section
      id="categories"
      className="relative py-20 md:py-28 overflow-hidden bg-background"
    >
      {/* Fondo sutil radial decorativo */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.05),transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Categorías principales
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Encuentra exactamente lo que tu negocio necesita entre miles de
            productos.
          </p>
        </div>

        {/* Grid de categorías */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={index}
                tabIndex={0}
                role="button"
                aria-label={`Ver categoría ${category.name}`}
                className="group cursor-pointer border-border transition-all duration-300 hover:border-primary hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold text-card-foreground">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.count}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
