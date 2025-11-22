"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/cartContext";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { items, total, removeFromCart, updateQuantity, count } = useCart();

  if (items.length === 0) {
    return (
      <main className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
          <div className="bg-white p-6 rounded-full shadow-sm mb-4">
            <ShoppingBag className="h-12 w-12 text-gray-300" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Tu carrito está vacío</h1>
          <p className="text-gray-500 mb-6">¡Descubre miles de productos y comienza a comprar!</p>
          <Link href="/search" className="btn-primary px-8 py-3 rounded-full shadow-lg">
            Ir al catálogo
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <section className="container mx-auto px-4 py-10 flex-1">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mi Carrito ({count})</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LISTA DE PRODUCTOS */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-100 text-sm font-medium text-gray-500 bg-gray-50">
              <div className="col-span-6">Producto</div>
              <div className="col-span-2 text-center">Cantidad</div>
              <div className="col-span-2 text-center">Precio</div>
              <div className="col-span-2 text-center">Subtotal</div>
            </div>

            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <div key={item._id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center">
                  
                  {/* Info Producto */}
                  <div className="col-span-6 flex items-center gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={item.producto?.imagen || "/placeholder.png"}
                        alt={item.producto?.nombre}
                        className="w-full h-full object-cover mix-blend-multiply"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 line-clamp-1">{item.producto?.nombre}</h3>
                      <p className="text-sm text-gray-500">{item.producto?.categoria}</p>
                      <button 
                        onClick={() => removeFromCart(item.producto?._id)}
                        className="text-red-500 text-xs hover:underline mt-1 flex items-center gap-1 md:hidden"
                      >
                        <Trash2 className="h-3 w-3" /> Eliminar
                      </button>
                    </div>
                  </div>

                  {/* Cantidad */}
                  <div className="col-span-6 md:col-span-2 flex items-center justify-between md:justify-center">
                    <span className="text-sm text-gray-500 md:hidden">Cantidad:</span>
                    <div className="flex items-center border rounded-lg">
                      <button 
                        className="p-2 hover:bg-gray-100 text-gray-600"
                        onClick={() => updateQuantity(item.producto._id, item.cantidad - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-2 text-sm font-medium w-8 text-center">{item.cantidad}</span>
                      <button 
                        className="p-2 hover:bg-gray-100 text-gray-600"
                        onClick={() => updateQuantity(item.producto._id, item.cantidad + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  {/* Precio Unitario (Oculto en movil para ahorrar espacio o mostrado diferente) */}
                  <div className="hidden md:block col-span-2 text-center text-gray-600">
                    ${Number(item.precio).toLocaleString()}
                  </div>

                  {/* Subtotal y Eliminar Desktop */}
                  <div className="col-span-6 md:col-span-2 flex items-center justify-between md:justify-center gap-4">
                    <span className="text-sm text-gray-500 md:hidden">Subtotal:</span>
                    <span className="font-bold text-gray-900">
                        ${(item.cantidad * item.precio).toLocaleString()}
                    </span>
                    <button 
                        onClick={() => removeFromCart(item.producto?._id)}
                        className="hidden md:block p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition"
                        title="Eliminar"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* RESUMEN DE COMPRA  */}
          <div className="w-full lg:w-96">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Resumen de compra</h2>
              
              <div className="space-y-3 text-sm text-gray-600 mb-6 border-b border-gray-100 pb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Envío</span>
                  <span>Gratis</span>
                </div>
                <div className="flex justify-between">
                  <span>Impuestos</span>
                  <span>-</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-6">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-3xl font-bold text-primary">${total.toLocaleString()}</span>
              </div>

              <Link href="/checkout">
                <button className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:bg-primary-dark transition flex items-center justify-center gap-2">
                    Continuar compra <ArrowRight className="h-5 w-5" />
                </button>
              </Link>
              
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                <ShoppingBag className="h-3 w-3" /> Compra protegida por MarketX
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}