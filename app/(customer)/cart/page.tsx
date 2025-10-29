"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { initialCart } from "@/types/cartItems";

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState(initialCart);

  // Guardar carrito cuando cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleQuantityChange = (id: number | string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: number | string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    router.push("/checkout");
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="bg-gradient-hero py-16 text-center text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Tu Carrito</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Revisa tus productos antes de finalizar la compra
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500 text-lg">Tu carrito está vacío.</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="card flex flex-col sm:flex-row items-center bg-white rounded-lg shadow-sm p-4 justify-between"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative w-24 h-24 rounded-md overflow-hidden bg-gray-100">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-primary font-bold">${item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-4 sm:mt-0">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="font-medium">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="ml-4 text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))
            )}

            {cartItems.length > 0 && (
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleClearCart}
                  className="text-sm text-red-500 hover:underline"
                >
                  Vaciar carrito
                </button>
              </div>
            )}
          </div>

          {/* Resumen */}
          <div className="bg-white p-6 rounded-lg shadow-lg h-fit border-t-4 border-primary">
            <h2 className="text-xl font-bold mb-4">Resumen de compra</h2>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span>$0</span>
              </div>
              <div className="border-t pt-2 font-semibold flex justify-between">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="btn-primary w-full mt-6 py-3 text-lg font-semibold rounded-lg"
              onClick={handleCheckout}
            >
              Finalizar compra
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
