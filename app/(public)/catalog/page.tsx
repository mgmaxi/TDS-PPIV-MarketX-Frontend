"use client";

import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { categories } from "@/components/CategoryCarousel";
import { AllProducts } from "@/types/products";
import { useState } from "react";
import { motion } from "framer-motion";


const categoriesWithAll = [
  { name: "Todos", image: "https://images.unsplash.com/photo-1500989145603-8e7ef71d639e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2076" },
  ...categories,
];

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  // Filtramos productos según categoría
  const filteredProducts =
    selectedCategory === "Todos"
      ? AllProducts
      : AllProducts.filter((p) => p.category === selectedCategory);

  // Imagen del hero según categoría
  const heroImage = categoriesWithAll.find((cat) => cat.name === selectedCategory)?.image || categoriesWithAll[0].image;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero */}
      <section
        className="relative bg-cover bg-center py-24 text-center text-white"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="bg-black/40 py-24">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            {selectedCategory === "Todos" ? "Todos los productos" : selectedCategory}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Explora nuestra selección de {selectedCategory === "Todos" ? "productos" : selectedCategory.toLowerCase()}
          </p>
        </div>
      </section>

      {/* Filtros de categoría */}
      <section className="py-8 bg-secondary/20">
        <div className="container mx-auto px-6 flex flex-wrap justify-center gap-4">
          {categoriesWithAll.map((cat) => (
            <motion.button
              key={cat.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded font-medium transition ${
                selectedCategory === cat.name
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => setSelectedCategory(cat.name)}
            >
              {cat.name}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Grid de productos */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-600">No hay productos en esta categoría.</p>
          ) : (
            <motion.div
              layout
              className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
