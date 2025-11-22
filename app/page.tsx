"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionBanner from "@/components/SectionBanner";
import CategoryCarousel from "@/components/CategoryCarousel";
import ProductCarousel from "@/components/ProductCarousel"; 
import Link from "next/link";

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
        image="https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        title="Los más vendidos del mes"
        subtitle="Descubrí los productos favoritos de nuestros clientes"
      />

      {/* CAROUSEL 1: DESTACADOS (NOVEDADES) */}
      <div className="bg-white border-b py-4">
        <div className="container mx-auto px-6">
          <ProductCarousel 
            title="Novedades" 
            query="sort=-createdAt&limit=8" 
            linkHref="/search?sort=-createdAt&activo=true"
          />
        </div>
      </div>

      <SectionBanner
        image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80"
        title="Recomendado para vos"
        subtitle="Seleccionados según tus intereses y búsquedas recientes"
      />

      {/* CAROUSEL 2: OPORTUNIDADES (PRECIO BAJO) */}
      <section className="bg-secondary/30 border-b py-4">
        <div className="container mx-auto px-6">
          <ProductCarousel 
            title="Oportunidades" 
            query="sort=precio&limit=8" 
            linkHref="/search?sort=price&activo=true"
          />
        </div>
      </section>

      {/* CAROUSEL 3: ÚLTIMAS UNIDADES */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-6">
          <ProductCarousel 
            title="¡Se están agotando!" 
            query="stockMax=5&limit=8" 
          />
        </div>
      </div>

      {/* CTA final */}
      <section className="bg-gradient-hero py-20 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">¿Listo para hacer crecer tu negocio?</h2>
        <p className="text-white/90 mb-6">
          Únete a miles de PYMEs que confían en MarketX.
        </p>
          <Link href="/signup">
              <button className="relative z-10 btn-primary px-8 py-3 text-lg shadow-lg shadow-black/20 border-white/20 border transition">
                  Comenzar ahora
              </button>
          </Link>
      </section>
      
      <Footer />
    </main>
  );
}