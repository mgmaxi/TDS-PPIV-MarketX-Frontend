"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface ProductProps {
  _id?: string;
  id?: string;
  nombre: string;
  precio: number | string;
  imagen?: string;
  categoria?: string;
  stock?: number;
  vendedor?: { nombre: string } | string;
}

export default function ProductCard({ product }: { product: ProductProps }) {
  const productId = product._id || product.id;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    toast({
      title: "Agregado al carrito",
      description: `${product.nombre} añadido.`,
      className: "bg-green-600 text-white",
    });
  };

  if (!productId) return null;

  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col relative h-full">
      
      <Link href={`/products/${productId}`} className="relative aspect-square bg-gray-100 overflow-hidden block cursor-pointer">
        <img
          src={product.imagen || "/placeholder.png"}
          alt={product.nombre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
          onError={(e) => (e.currentTarget.src = "https://placehold.co/400?text=Sin+Imagen")}
        />
        {product.categoria && (
          <span className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm z-10">
            {product.categoria}
          </span>
        )}
      </Link>

      {/* Info del Producto */}
      <div className="p-4 flex flex-col flex-1">
        
        <Link href={`/products/${productId}`} className="block">
          <h3
            className="font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:text-primary transition-colors cursor-pointer min-h-[3rem]"
            title={product.nombre}
          >
            {product.nombre}
          </h3>
        </Link>

        <div className="mt-auto pt-3 flex items-center justify-between border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium">Precio</span>
            <span className="text-xl font-bold text-gray-900">
              ${Number(product.precio).toLocaleString()}
            </span>
          </div>

          {/* 3. Agrega al carrito */}
          <button
            onClick={handleQuickAdd}
            disabled={(product.stock ?? 0) < 1}
            className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-20 shadow-sm"
            title="Agregar al carrito"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}