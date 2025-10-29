"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { AllProducts, Product } from "@/types/products";
import { Plus, Edit, Trash2, Package } from "lucide-react";
import Link from "next/link";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

  const sellerName = "SoundPro";

  useEffect(() => {
    // Filtramos solo los productos del vendedor elegido
    let sellerProducts = AllProducts.filter((p) => p.seller === sellerName);

    // Agregamos un producto inactivo de ejemplo
    sellerProducts = [
      ...sellerProducts,
      {
        id: "inactivo-1",
        name: "Micrófono profesional inactivo",
        price: 250,
        image: "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=600",
        seller: sellerName,
        category: "Tecnología",
        stock: 0,
        active: false,
      },
    ];

    setProducts(sellerProducts);
  }, []);

  const total = 3;
  const activos = 2;
  const bajoStock = 3;

  return (
    <main className="flex flex-col min-h-screen bg-white text-gray-800">
      <Navbar />

      <section className="container mx-auto px-6 py-12 flex-1">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h1 className="text-3xl font-bold">Catálogo de {sellerName}</h1>
          <Link
            href="/(seller)/products/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
          >
            <Plus className="h-5 w-5" /> Agregar Producto
          </Link>
        </div>

        {/* Resumen */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary text-center">
            <h3 className="text-lg font-semibold mb-1">Total productos</h3>
            <p className="text-3xl font-bold text-primary">{total}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500 text-center">
            <h3 className="text-lg font-semibold mb-1">Activos</h3>
            <p className="text-3xl font-bold text-green-500">{activos}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-yellow-500 text-center">
            <h3 className="text-lg font-semibold mb-1">Stock bajo</h3>
            <p className="text-3xl font-bold text-yellow-500">{bajoStock}</p>
          </div>
        </div>

        {/* Tabla de productos */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          {products.length > 0 ? (
            <table className="w-full table-auto border-collapse">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-3 border-b">Producto</th>
                  <th className="px-4 py-3 border-b">Categoría</th>
                  <th className="px-4 py-3 border-b">Precio</th>
                  <th className="px-4 py-3 border-b">Stock</th>
                  <th className="px-4 py-3 border-b">Estado</th>
                  <th className="px-4 py-3 border-b text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className={`hover:bg-gray-50 transition border-b ${
                      product.active === false ? "opacity-50" : ""
                    }`}
                  >
                    <td className="px-4 py-3 flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded object-cover border"
                      />
                      <span>{product.name}</span>
                    </td>
                    <td className="px-4 py-3">{product.category}</td>
                    <td className="px-4 py-3">${product.price.toFixed(2)}</td>
                    <td className="px-4 py-3">{product.stock ?? "-"}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-medium ${
                          product.active === true
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.active ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center flex justify-center gap-3">
                      <button className="text-blue-500 hover:text-blue-700">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-20 flex flex-col items-center justify-center">
              <Package className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No hay productos publicados
              </h3>
              <p className="text-gray-500 mb-6">
                Comienza agregando tu primer producto.
              </p>
              <Link
                href="/(seller)/products/new"
                className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition"
              >
                <Plus className="h-5 w-5" /> Agregar producto
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
