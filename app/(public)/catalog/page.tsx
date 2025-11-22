"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Loader2, Frown } from "lucide-react";

const categories = [
  { name: "Tecnología", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c" },
  { name: "Textil", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f" },
  { name: "Alimentos", image: "https://images.unsplash.com/photo-1551218808-94e220e084d2" },
  { name: "Herramientas", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e" },
  { name: "Hogar", image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511" },
];

const categoriesWithAll = [
  { name: "Todos", image: "https://images.unsplash.com/photo-1500989145603-8e7ef71d639e?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2076" },
  ...categories,
];

const API_URL = process.env.NEXT_PUBLIC_API_URL ;

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        let url = `${API_URL}/products?activo=true`;
        
        if (selectedCategory !== "Todos") {
          url += `&categoria=${encodeURIComponent(selectedCategory)}`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error("Error al cargar productos");
        
        const data = await res.json();
        setProducts(data.productos || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  // Imagen del hero dinámica
  const heroImage = categoriesWithAll.find((cat) => cat.name === selectedCategory)?.image || categoriesWithAll[0].image;

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      {/* Hero Dinámico */}
      <section
        className="relative bg-cover bg-center py-24 text-center text-white transition-all duration-500 ease-in-out"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" /> {/* Overlay oscuro */}
        
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            key={selectedCategory} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
              {selectedCategory === "Todos" ? "Nuestro Catálogo" : selectedCategory}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-medium drop-shadow-md">
              Explora lo mejor en {selectedCategory === "Todos" ? "todas las categorías" : selectedCategory.toLowerCase()}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filtros de categoría */}
      <section className="sticky top-16 z-30 bg-white/90 backdrop-blur-md border-b shadow-sm py-4">
        <div className="container mx-auto px-6 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-3 min-w-max md:min-w-0">
            {categoriesWithAll.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  selectedCategory === cat.name
                    ? "bg-primary text-white border-primary shadow-md transform scale-105"
                    : "bg-white text-gray-600 border-gray-200 hover:border-primary/50 hover:bg-gray-50"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de productos */}
      <section className="py-12 flex-1 bg-gray-50">
        <div className="container mx-auto px-6">
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 h-64">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-gray-500">Cargando productos...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <Frown className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700">Sin resultados</h3>
                <p className="text-gray-500">No encontramos productos en la categoría "{selectedCategory}".</p>
            </div>
          ) : (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              {products.map((product) => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}