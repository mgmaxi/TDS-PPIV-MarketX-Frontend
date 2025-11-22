"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2, Package, ShoppingCart, Frown } from "lucide-react";
import Link from "next/link";

// URL de tu API
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// Componente de contenido interno (para usar useSearchParams sin errores de build)
function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q"); // Obtenemos lo que escribió el usuario

  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // 1. Consultamos al BACKEND
        // Mapeamos: frontend 'q' -> backend 'nombre'
        // Agregamos 'activo=true' para que no salgan productos borrados/ocultos
        const res = await fetch(`${API_URL}/products?nombre=${query}&activo=true`);
        
        if (!res.ok) throw new Error("Error buscando productos");
        
        const data = await res.json();
        
        // Tu backend devuelve { resultados: N, productos: [...] }
        setProducts(data.productos || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]); // Se ejecuta cada vez que cambia la búsqueda

  return (
    <div className="container mx-auto px-4 py-8 min-h-[60vh]">
      {/* Título de la búsqueda */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
            {query ? `Resultados para "${query}"` : "Buscador de Productos"}
        </h1>
        <p className="text-gray-500 mt-1">
            {isLoading ? "Buscando..." : `Se encontraron ${products.length} productos`}
        </p>
      </div>

      {/* Estado de Carga */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-gray-500">Buscando las mejores ofertas...</p>
        </div>
      ) : products.length > 0 ? (
        // GRID DE PRODUCTOS (Vista Comprador)
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
                key={product._id || product.id} 
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Imagen */}
              <div className="relative aspect-square bg-gray-100 overflow-hidden">
                 <img 
                   src={product.imagen || "/placeholder.png"} 
                   alt={product.nombre} 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                   onError={(e) => e.currentTarget.src = "https://placehold.co/400?text=Sin+Imagen"}
                 />
                 {/* Badge de categoría */}
                 <span className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                    {product.categoria}
                 </span>
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {product.nombre}
                </h3>
                
                <div className="mt-auto pt-3 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500">Precio</span>
                        <span className="text-xl font-bold text-gray-900">
                            ${Number(product.precio).toLocaleString()}
                        </span>
                    </div>
                    
                    {/* Botón "Ver detalle" o "Agregar" */}
                    <Link href={`/products/${product._id || product.id}`}>
                        <button className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                            <ShoppingCart className="h-5 w-5" />
                        </button>
                    </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Estado SIN RESULTADOS
        <div className="flex flex-col items-center justify-center py-16 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
          <Frown className="h-16 w-16 text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No encontramos nada para "{query}"
          </h2>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            Intenta verificar la ortografía o usar términos más generales como "celular" o "remera".
          </p>
          <Link href="/">
            <button className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition">
                Volver al inicio
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

// Layout Principal de la página de búsqueda
export default function SearchPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      {/* Suspense es necesario en Next.js cuando usamos useSearchParams */}
      <Suspense fallback={
          <div className="flex-1 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
      }>
        <SearchResults />
      </Suspense>

      <Footer />
    </main>
  );
}