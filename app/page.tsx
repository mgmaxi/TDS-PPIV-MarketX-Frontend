"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionBanner from "@/components/SectionBanner";
import CategoryCarousel from "@/components/CategoryCarousel";
import ProductCarousel from "@/components/ProductCarousel"; 
import Link from "next/link";
import { Truck, ShieldCheck, CreditCard, Headphones, Star } from "lucide-react"; // Iconos nuevos

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="bg-gradient-hero py-20 text-center text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Bienvenido a <span className="text-accent">MarketX</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
            El marketplace líder para potenciar tu negocio con los mejores proveedores.
          </p>
          <Link href="/search">
            <button className="relative z-10 btn-primary bg-white text-primary px-8 py-3 text-lg shadow-lg shadow-black/20 border-white/20 border transition hover:bg-gray-100 hover:scale-105 font-bold rounded-full">
                Explorar Catálogo
            </button>
          </Link>
        </div>
      </section>

      {/* --- BARRA DE BENEFICIOS --- */}
      <section className="bg-white border-b py-8 shadow-sm relative z-20 -mt-4 mx-4 rounded-xl md:mx-auto md:max-w-6xl md:-mt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div className="flex flex-col items-center p-2">
                <div className="bg-primary/10 p-3 rounded-full mb-3 text-primary">
                    <Truck className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-gray-900">Envíos a todo el país</h3>
                <p className="text-sm text-gray-500">Rápido y asegurado</p>
            </div>
            <div className="flex flex-col items-center p-2">
                <div className="bg-primary/10 p-3 rounded-full mb-3 text-primary">
                    <CreditCard className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-gray-900">Medios de Pago</h3>
                <p className="text-sm text-gray-500">Hasta 12 cuotas sin interés</p>
            </div>
            <div className="flex flex-col items-center p-2">
                <div className="bg-primary/10 p-3 rounded-full mb-3 text-primary">
                    <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-gray-900">Compra Protegida</h3>
                <p className="text-sm text-gray-500">Seguridad garantizada</p>
            </div>
            <div className="flex flex-col items-center p-2">
                <div className="bg-primary/10 p-3 rounded-full mb-3 text-primary">
                    <Headphones className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-gray-900">Soporte 24/7</h3>
                <p className="text-sm text-gray-500">Atención personalizada</p>
            </div>
        </div>
      </section>

       {/* --- CATEGORÍAS --- */}
      <section className="bg-secondary/30 py-12 border-b pt-16"> 
        <div className="container mx-auto px-6">
          <CategoryCarousel />
        </div>
      </section>

      {/* --- BANNER 1 --- */}
      <SectionBanner
        image="https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        title="Tendencias del Mes"
        subtitle="Descubrí los productos más buscados por nuestros clientes"
      />

      {/* --- CARRUSEL 1: NOVEDADES --- */}
      <section className="bg-white border-b py-10">
        <div className="container mx-auto px-6">
          <ProductCarousel 
            title="Recién llegados" 
            query="sort=-createdAt&limit=10" 
            linkHref="/search?sort=-createdAt&activo=true"
          />
        </div>
      </section>

      {/* --- CARRUSEL 2: AUDIO --- */}
      <section className="bg-secondary/30 border-b py-10">
        <div className="container mx-auto px-6">
          <ProductCarousel 
            title="Audio y sonido" 
            query="categoria=Audio&limit=10" 
            linkHref="/search?categoria=Audio&activo=true"
          />
        </div>
      </section>

      {/* --- NUEVO: MARCAS CONFIABLES (Logo Wall) --- */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-6 text-center">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">Trabajamos con las mejores marcas</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <span className="text-2xl font-black text-gray-800">SAMSUNG</span>
                <span className="text-2xl font-black text-gray-800">SONY</span>
                <span className="text-2xl font-black text-gray-800">APPLE</span>
                <span className="text-2xl font-black text-gray-800">LG</span>
                <span className="text-2xl font-black text-gray-800">PHILIPS</span>
                <span className="text-2xl font-black text-gray-800">XIAOMI</span>
            </div>
        </div>
      </section>

      {/* --- CARRUSEL 3: GAMING --- */}
      <section className="bg-secondary/30 border-b py-10">
        <div className="container mx-auto px-6">
          <ProductCarousel 
            title="Zona Gamer" 
            query="categoria=Consolas&limit=10" 
            linkHref="/search?categoria=Consolas&activo=true"
          />
        </div>
      </section>

      {/* --- BANNER 2 --- */}
      <SectionBanner
        image="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1920&q=80"
        title="Oportunidades Únicas"
        subtitle="Precios mayoristas directos de fábrica"
      />

      {/* --- CARRUSEL 4: OFERTAS --- */}
      <section className="bg-white border-b py-10">
        <div className="container mx-auto px-6">
          <ProductCarousel 
            title="Ofertas imperdibles" 
            query="sort=precio&limit=10" 
            linkHref="/search?sort=price&activo=true"
          />
        </div>
      </section>

      {/* --- CARRUSEL 5: LIQUIDACIÓN --- */}
      <div className="bg-secondary/30 py-12">
        <div className="container mx-auto px-6">
          <ProductCarousel 
            title="¡Últimas unidades!" 
            query="stockMax=5&limit=10" 
          />
        </div>
      </div>

      {/* --- CTA FINAL --- */}
      <section className="bg-gradient-hero py-24 text-center text-white relative overflow-hidden">
        {/* Decoración de fondo (opcional) */}
        <div className="absolute top-0 left-0 w-full h-full bg-pattern opacity-10 pointer-events-none"></div>
        
        <div className="relative z-10 container mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">¿Listo para hacer crecer tu negocio?</h2>
            <p className="text-white/90 mb-8 text-lg max-w-xl mx-auto leading-relaxed">
           Únete a miles de PyMEs que confían en MarketX.
            </p>
            <Link href="/signup">
                <button className="btn-primary bg-white text-primary px-10 py-4 text-lg shadow-2xl border-white/20 border transition hover:bg-gray-50 hover:shadow-white/20 font-bold rounded-xl">
                    Regístrate
                </button>
            </Link>
            <p className="mt-4 text-sm text-white/60">No se requiere tarjeta de crédito para empezar.</p>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}