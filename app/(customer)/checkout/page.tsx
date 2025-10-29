"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartItem, initialCart } from "@/types/cartItems";
import { FormState, initialFormState } from "@/types/formCheckout";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [form, setForm] = useState<FormState>(initialFormState);

  // Cargar carrito desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCartItems(JSON.parse(stored));
    } else {
      setCartItems(initialCart);
    }
  }, []);

  // Calcular total
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Manejar formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address || !form.city || !form.zip) {
      alert("Por favor completa todos los campos.");
      return;
    }
    alert("¡Compra realizada con éxito!");
    localStorage.removeItem("cart");
    setCartItems([]);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-hero py-16 text-center text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Checkout</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Completa tus datos para finalizar la compra
          </p>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario */}
          <form
            className="lg:col-span-2 max-w-2xl mx-auto space-y-6 bg-white p-8 rounded-lg shadow-lg border-t-4 border-primary"
            onSubmit={handleSubmit}
          >
            {/* Datos personales */}
            <input
              type="text"
              name="name"
              placeholder="Nombre completo"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              required
            />

            <input
              type="text"
              name="address"
              placeholder="Dirección completa (calle, número, etc.)"
              value={form.address}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              required
            />

            <input
              type="text"
              name="city"
              placeholder="Ciudad"
              value={form.city}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              required
            />

            <input
              type="text"
              name="zip"
              placeholder="Código postal"
              value={form.zip}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              required
            />

            {/* Método de pago */}
            <div className="space-y-4">
              <select
                name="payment"
                value={form.payment}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                required
              >
                <option value="">Selecciona un método de pago</option>
                <option value="credito">Tarjeta de crédito</option>
                <option value="debito">Tarjeta de débito</option>
                <option value="efectivo">Efectivo</option>
                <option value="transferencia">Transferencia bancaria</option>
              </select>

              {(form.payment === "credito" || form.payment === "debito") && (
                <>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Número de tarjeta"
                    value={form.cardNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    required
                  />
                  <div className="flex gap-4">
                    <input
                      type="text"
                      name="expiry"
                      placeholder="Fecha de vencimiento (MM/AA)"
                      value={form.expiry}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      required
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="Código de seguridad (CVV)"
                      value={form.cvv}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      required
                    />
                  </div>
                </>
              )}

              {form.payment === "efectivo" && (
                <p className="text-gray-600">
                  Pagarás en efectivo al recibir tu pedido.
                </p>
              )}

              {form.payment === "transferencia" && (
                <p className="text-gray-600">
                  Te enviaremos los datos bancarios por correo para completar la
                  transferencia.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn-primary w-full py-3 mt-4 text-lg font-semibold rounded-lg"
            >
              Confirmar compra
            </button>
          </form>

          {/* Resumen */}
          <div className="bg-white p-6 rounded-lg shadow-lg h-fit border-t-4 border-primary">
            <h2 className="text-xl font-bold mb-4">Resumen de compra</h2>
            <div className="space-y-2 text-sm text-gray-700">
              {cartItems.length === 0 ? (
                <p>Tu carrito está vacío</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))
              )}
              <div className="border-t pt-2 font-semibold flex justify-between">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
