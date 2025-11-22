"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2, Frown } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/cards/ProductCard"; 

const API_URL = process.env.NEXT_PUBLIC_API_URL ;

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

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
        const res = await fetch(`${API_URL}/products?nombre=${query}&activo=true`);
        if (!res.ok) throw new Error("Error buscando productos");
        const data = await res.json();
        setProducts(data.productos || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8 min-h-[60vh]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {query ? `Resultados para "${query}"` : "Buscador de Productos"}
        </h1>
        <p className="text-gray-500 mt-1">
          {isLoading ? "Buscando..." : `Se encontraron ${products.length} productos`}
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-gray-500">Buscando las mejores ofertas...</p>
        </div>
      ) : products.length > 0 ? (
        
        // GRID 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>

      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
          <Frown className="h-16 w-16 text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No encontramos nada para {query}
          </h2>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            Intenta términos más generales.
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

export default function SearchPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      <Navbar />
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