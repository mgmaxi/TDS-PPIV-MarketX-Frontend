"use client";

import CategoryCarousel from "@/components/CategoryCarousel";
import ProductCarousel from "@/components/ProductCarousel";
import RecommendedCarousel from "@/components/RecommendedCarousel";
import Navbar from "@/components/Navbar";
import SectionBanner from "@/components/SectionBanner";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero principal */}
      <section className="bg-gradient-hero py-20 text-center text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Bienvenido a <span className="text-accent">MarketX</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Descubre productos, proveedores y oportunidades para hacer crecer tu negocio.
          </p>
        </div>
      </section>

       {/* Categories */}
      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-6">
          <CategoryCarousel />
        </div>
      </section>

      {/* Banner 1 */}
     <SectionBanner
        image="https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?_gl=1*7u64ar*_ga*MzY0Mzc4ODYwLjE3NDg3OTA0MDM.*_ga_8JE65Q40S6*czE3NjAzMDE5MTUkbzQkZzEkdDE3NjAzMDE5ODkkajYwJGwwJGgw"
        title="Los más vendidos del mes"
        subtitle="Descubrí los productos favoritos de nuestros clientes"
      />

      {/* Carousel */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Destacados</h2>
          <ProductCarousel />
        </div>
      </section>

      <SectionBanner
        image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80"
        title="Recomendado para vos"
        subtitle="Seleccionados según tus intereses y búsquedas recientes"
      />

      {/* Recommended */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <RecommendedCarousel />
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-gradient-hero py-20 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">¿Listo para hacer crecer tu negocio?</h2>
        <p className="text-white/90 mb-6">
          Únete a miles de PYMEs que confían en MarketX.
        </p>
        <button className="btn-primary px-6 py-3 text-lg">Comenzar ahora</button>
      </section>
      
      <Footer />
    </main>
  );
}
