// pages/checkout.tsx
"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CheckoutForm from "./components/CheckoutForm";
import CartSummary from "./components/CartSummary";
import ModalConfirm from "./components/ModalConfirm";
import { CartItem, initialCart } from "@/types/cartItems";
import { FormState, initialFormState } from "@/types/formCheckout";
import { toast } from "@/components/ui/use-toast";
import { generarComprobante } from "@/lib/generatePDF";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [form, setForm] = useState<FormState>(initialFormState);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCartItems(JSON.parse(stored));
    } else {
      setCartItems(initialCart);
    }
  }, []);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.address || !form.city || !form.zip) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos.",
        variant: "destructive",
      });
      return;
    }

    setIsModalOpen(true);
  };

  const confirmPurchase = () => {
    setIsLoading(true);

    setTimeout(() => {
      toast({
        title: "Compra realizada",
        description: "¡Gracias por tu compra!",
        variant: "success",
      });

      generarComprobante(form, cartItems, total);

      localStorage.removeItem("cart");
      setCartItems([]);
      setForm(initialFormState);
      setIsLoading(false);

      setIsModalOpen(false);
    }, 2000);
  };

  const cancelPurchase = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="bg-gradient-hero py-16 text-center text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Checkout</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Completa tus datos para finalizar la compra
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <CheckoutForm form={form} handleChange={handleChange} handleSubmit={handleSubmit} />
          <CartSummary cartItems={cartItems} total={total} />
        </div>
      </section>

      <ModalConfirm
        isOpen={isModalOpen}
        total={total}
        confirmPurchase={confirmPurchase}
        cancelPurchase={cancelPurchase}
      />

      <Footer />
    </main>
  );
}
