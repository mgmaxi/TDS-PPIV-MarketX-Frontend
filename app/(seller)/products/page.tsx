"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Package, Loader2 } from "lucide-react"; 
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Catalog() {
  const router = useRouter();
  
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sellerName, setSellerName] = useState(""); 
  
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // 1. Cargar Usuario y Productos al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      toast({ title: "Acceso denegado", description: "Inicia sesión para ver tu catálogo.", variant: "destructive" });
      router.push("/signin");
      return;
    }

    try {
      const user = JSON.parse(storedUser);
      
      // Seteamos nombre para la UI
      setSellerName(user.nombre || user.username || "Vendedor");

      // Obtenemos el ID (Mongo usa _id)
      const userId = user._id || user.id;

      if (userId) {
        fetchProducts(userId);
      } else {
        console.error("Usuario sin ID válido");
        setIsLoading(false);
      }

    } catch (error) {
      console.error("Error al leer usuario", error);
      router.push("/signin");
    }
  }, [router]);


  // 2. Fetch dinámico con el ID
  const fetchProducts = async (userId: string) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/products?vendedor=${userId}`);
      
      if (!res.ok) throw new Error("Error al cargar productos");
      
      const data = await res.json();
      
      setProducts(data.productos || data || []); 
      
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los productos.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Cálculos basados en los datos recibidos 
  const total = products.length;
  const activos = products.filter((p) => p.activo).length;
  const bajoStock = products.filter((p) => (p.stock ?? 0) < 5).length; 

  const handleDeleteClick = (product: any) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  // 3. Eliminar producto
  const confirmDelete = async () => {
    if (!selectedProduct) return;

    const token = localStorage.getItem("token");

    try {
      const prodId = selectedProduct._id || selectedProduct.id;

      const res = await fetch(`${API_URL}/products/${prodId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}` 
        }
      });

      if (!res.ok) throw new Error("Error al eliminar");

      setProducts(products.filter((p) => (p._id || p.id) !== prodId));
      
      toast({
        title: "Producto eliminado",
        description: selectedProduct.nombre, 
        className: "bg-green-600 text-white", 
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el producto.",
        variant: "destructive",
      });
    } finally {
      setShowDeleteModal(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-white text-gray-800">
      <Navbar />

      <section className="container mx-auto px-6 py-12 flex-1">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h1 className="text-3xl font-bold">Catálogo de {sellerName}</h1>
          <Link
            href="/products/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
          >
            <Plus className="h-5 w-5" /> Agregar Producto
          </Link>
        </div>

        {/* Resumen */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary text-center">
            <h3 className="text-lg font-semibold mb-1">Total productos</h3>
            <p className="text-3xl font-bold text-primary">
                {isLoading ? "..." : total}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500 text-center">
            <h3 className="text-lg font-semibold mb-1">Activos</h3>
            <p className="text-3xl font-bold text-green-500">
                {isLoading ? "..." : activos}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-yellow-500 text-center">
            <h3 className="text-lg font-semibold mb-1">Stock bajo</h3>
            <p className="text-3xl font-bold text-yellow-500">
                {isLoading ? "..." : bajoStock}
            </p>
          </div>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-md min-h-[300px]">
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <Loader2 className="h-10 w-10 animate-spin mb-4 text-primary" />
                <p>Cargando catálogo...</p>
            </div>
          ) : products.length > 0 ? (
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
                    key={product._id || product.id}
                    className={`hover:bg-gray-50 transition border-b ${
                      product.activo === false ? "opacity-50" : ""
                    }`}
                  >
                    <td className="px-4 py-3 flex items-center gap-3">
                      <img
                        src={product.imagen || "/placeholder.png"} 
                        alt={product.nombre}
                        className="w-12 h-12 rounded object-cover border"
                        onError={(e) => e.currentTarget.src = "https://placehold.co/100?text=No+Img"}
                      />
                      <span>{product.nombre}</span>
                    </td>
                    
                    <td className="px-4 py-3">{product.categoria}</td>
                    
                    <td className="px-4 py-3">${Number(product.precio).toFixed(2)}</td>
                    
                    <td className="px-4 py-3">{product.stock ?? "-"}</td>
                    
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-medium ${
                          product.activo
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.activo ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center flex justify-center gap-3">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() =>
                          router.push(`/products/edit?id=${product._id || product.id}`)
                        }
                      >
                        <Edit className="h-5 w-5" />
                      </button>

                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteClick(product)}
                      >
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
                href="/products/new"
                className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition"
              >
                <Plus className="h-5 w-5" /> Agregar producto
              </Link>
            </div>
          )}
        </div>

        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full border-t-4 border-primary">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Confirmar eliminación
              </h2>
              <p className="text-gray-600 mb-6">
                ¿Estás seguro de que deseas eliminar el producto{" "}
                <span className="font-semibold">{selectedProduct?.nombre}</span>?  
                Esta acción no se puede deshacer.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancelar
                </button>

                <button
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={confirmDelete}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}