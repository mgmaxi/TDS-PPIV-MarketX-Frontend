"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Hook vital para leer la carpeta [id]
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShoppingCart, ArrowLeft, Truck, ShieldCheck, Share2, Loader2, CreditCard, Store } from "lucide-react";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";

// URL de tu API
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export default function ProductDetailPage() {
  // 1. Obtenemos el ID de la URL (ej: /products/65abc...)
  const params = useParams();
  const { id } = params; 

  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 2. Fetch del producto al montar el componente
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_URL}/products/${id}`);
        
        if (!res.ok) {
            if (res.status === 404) throw new Error("Producto no encontrado");
            throw new Error("Error del servidor");
        }
        
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  // Lógica simulada de carrito (Hasta que tengamos el Context)
  const handleAddToCart = () => {
    toast({
      title: "¡Agregado al carrito!",
      description: `${product.nombre} se añadió a tu compra.`,
      className: "bg-green-600 text-white",
    });
  };

  // 3. Renderizado Condicional (Carga)
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  // 4. Renderizado Condicional (No encontrado)
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Producto no disponible</h1>
            <p className="text-gray-500 mb-6">El producto que buscas no existe o fue eliminado.</p>
            <Link href="/search" className="btn-primary px-6 py-3 rounded-lg">
                Volver al catálogo
            </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // 5. Vista Principal del Producto
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8 flex-1">
        
        {/* Breadcrumb / Botón Volver */}
        <Link 
            href="/search" 
            className="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-6 transition-colors font-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Volver a la búsqueda
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8">
            
            {/* --- COLUMNA IZQUIERDA: IMAGEN --- */}
            <div className="bg-gray-100/50 aspect-square md:aspect-auto relative flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-gray-100">
              <img 
                src={product.imagen || "/placeholder.png"} 
                alt={product.nombre} 
                className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500"
                onError={(e) => e.currentTarget.src = "https://placehold.co/600x600?text=Sin+Imagen"}
              />
            </div>

            {/* --- COLUMNA DERECHA: INFO --- */}
            <div className="p-6 md:p-10 flex flex-col h-full">
              
              {/* Cabecera */}
              <div className="mb-4">
                <div className="flex justify-between items-start">
                    <span className="text-xs font-bold tracking-wider text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
                    {product.categoria}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600 transition">
                        <Share2 className="h-5 w-5" />
                    </button>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4 mb-2 leading-tight">
                  {product.nombre}
                </h1>
                
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Store className="h-4 w-4" />
                    Vendido por <span className="font-semibold text-gray-700 underline decoration-dotted">
                        {product.vendedor?.nombre || "Vendedor Verificado"}
                    </span>
                </div>
              </div>

              {/* Precio y Cuotas */}
              <div className="my-6 border-t border-b border-gray-100 py-6">
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gray-900">
                    ${Number(product.precio).toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-400 font-medium">precio final</span>
                </div>
                
                <p className="text-sm text-green-600 font-medium mt-2 flex items-center gap-2">
                   <CreditCard className="h-4 w-4"/> Pagá en hasta 6 cuotas sin interés
                </p>
              </div>

              {/* Descripción */}
              <div className="mb-8 flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Lo que tienes que saber de este producto</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm md:text-base">
                  {product.descripcion}
                </p>
              </div>

              {/* Stock y Botones */}
              <div className="mt-auto flex flex-col gap-5">
                
                {/* Indicador de Stock */}
                <div className={`text-sm font-medium ${product.stock > 0 ? "text-green-600" : "text-red-600"} flex items-center gap-2`}>
                    <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? "bg-green-600" : "bg-red-600"}`}></div>
                    {product.stock > 0 ? `Stock disponible (${product.stock})` : "Sin stock disponible"}
                </div>

                <div className="flex gap-4 flex-col sm:flex-row">
                    <button 
                        onClick={handleAddToCart}
                        disabled={!product.activo || product.stock < 1}
                        className="flex-1 bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
                    >
                        <ShoppingCart className="h-5 w-5" />
                        {product.stock > 0 ? "Agregar al carrito" : "Agotado"}
                    </button>
                </div>
                
                {/* Sellos de confianza */}
                <div className="grid grid-cols-2 gap-4 pt-4 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-green-500" />
                        <span>Envío asegurado a todo el país</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-blue-500" />
                        <span>Compra Protegida 100%</span>
                    </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}