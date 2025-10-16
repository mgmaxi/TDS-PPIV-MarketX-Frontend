"use client";

import ProductCarousel from "../../../components/ProductCarousel"
import RecommendedCarousel from "../../../components/RecommendedCarousel";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    
    <main className="min-h-screen bg-background text-foreground">
          <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-hero py-20 text-center text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Bienvenido a <span className="text-accent">MarketX</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Descubre productos, proveedores y oportunidades para hacer crecer tu negocio.
          </p>
          <button className="btn-primary">Explorar productos</button>
        </div>
      </section>

      {/* Carousel */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Destacados</h2>
          <ProductCarousel />
        </div>
      </section>

      {/* Featured grid */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <RecommendedCarousel />
        </div>
      </section>
    </main>
  );
}
