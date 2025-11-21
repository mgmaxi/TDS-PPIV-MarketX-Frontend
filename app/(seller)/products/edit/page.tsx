"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2, Link as LinkIcon, Save, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function EditProductContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    stock: "",
    categoria: "",
    descripcion: "",
    imagen: "",
    activo: true,
  });

  const categories = ["Tecnología", "Hogar", "Ropa", "Deportes", "Juguetes"];

  // 1. Cargar datos del producto al iniciar
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      
      try {
        const res = await fetch(`${API_URL}/products/${productId}`); 
        if (!res.ok) throw new Error("No se pudo cargar el producto");
        
        const data = await res.json();

        setForm({
          nombre: data.nombre || "",
          precio: data.precio || "",
          stock: data.stock || "",
          categoria: data.categoria || "",
          descripcion: data.descripcion || "",
          imagen: data.imagen || "",
          activo: data.activo ?? true,
        });
      } catch (error) {
        console.error(error);
        toast({ title: "Error", description: "No se encontró el producto.", variant: "destructive" });
        router.push("/products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ 
        ...form, 
        [name]: (name === "precio" || name === "stock") && value !== "" ? Number(value) : value 
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true); 
  };

  // 2. Lógica de Actualización
  const confirmUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        router.push("/signin");
        return;
    }

    setIsSaving(true);
    setShowModal(false);

    try {
      const res = await fetch(`${API_URL}/products/${productId}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(form), 
      });

      if (res.status === 401 || res.status === 403) {
          throw new Error("No tienes permiso para editar este producto.");
      }

      if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.mensaje || "Error al actualizar");
      }

      toast({
        title: "¡Actualización exitosa!",
        description: "Los cambios se han guardado correctamente.",
        className: "bg-green-600 text-white",
      });

      router.push("/products");
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (isLoading) {
      return (
          <div className="min-h-[60vh] flex flex-col items-center justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-gray-500">Cargando información del producto...</p>
          </div>
      );
  }

  return (
    <>
      {/* Formulario */}
      <section className="container mx-auto px-6 py-12 flex-1 mt-8 mb-12">
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl max-w-3xl mx-auto p-6 lg:p-8 border-t-4 border-primary shadow-xl relative"
          >
             {/* Overlay Guardando */}
             {isSaving && (
                <div className="absolute inset-0 bg-white/80 z-20 flex items-center justify-center rounded-xl">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </div>
            )}

            <div className="flex flex-col lg:flex-row gap-6">
              
              {/* Imagen (URL) */}
              <div className="flex-shrink-0 w-full lg:w-1/3 flex flex-col gap-4">
                <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-300 relative flex items-center justify-center">
                  {form.imagen ? (
                    <img 
                        src={form.imagen} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                        onError={(e) => e.currentTarget.src = "https://placehold.co/400?text=Error+URL"}
                    />
                  ) : (
                    <div className="flex flex-col items-center text-gray-400 px-4 text-center">
                      <LinkIcon className="h-12 w-12 mb-2" />
                      <span className="text-sm">Sin imagen definida</span>
                    </div>
                  )}
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL de Imagen</label>
                    <input 
                        type="text" 
                        name="imagen"
                        value={form.imagen}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-primary outline-none"
                    />
                </div>
              </div>

              {/* Campos */}
              <div className="flex-1 flex flex-col gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
                    />
                </div>

                <div className="flex gap-4 flex-col sm:flex-row">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                    <input
                        type="number"
                        name="precio"
                        value={form.precio}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                    <input
                        type="number"
                        name="stock"
                        value={form.stock}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
                    />
                  </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                    <select
                    name="categoria"
                    value={form.categoria}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white transition-smooth"
                    >
                    <option value="">Selecciona categoría</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                    </select>
                </div>

                {/* Toggle activo/inactivo */}
                <div className="flex items-center gap-3 mt-2 p-3 bg-gray-50 rounded-lg border">
                  <input
                    type="checkbox"
                    id="activo"
                    checked={form.activo}
                    onChange={(e) => setForm({ ...form, activo: e.target.checked })}
                    className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded transition-smooth"
                  />
                  <label htmlFor="activo" className="text-gray-700 font-medium cursor-pointer select-none">
                    {form.activo ? "Producto Visible (Activo)" : "Producto Oculto (Inactivo)"}
                  </label>
                </div>
              </div>
            </div>

            <div className="linea-div my-6"></div>

            {/* Descripción */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none h-32 transition-smooth"
                />
            </div>

            {/* Botones */}
            <div className="flex gap-4 mt-8 justify-end">
              <button type="button" onClick={handleCancel} className="btn-outline px-6">
                Cancelar
              </button>
              <button type="submit" className="btn-primary px-6 flex items-center gap-2">
                <Save className="h-5 w-5" /> Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 shadow-2xl max-w-sm w-full border-t-4 border-primary animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-bold mb-2 text-gray-800">¿Guardar cambios?</h2>
            <p className="mb-6 text-gray-600">
                Esta acción actualizará la información del producto en el catálogo en tiempo real.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition">
                Revisar
              </button>
              <button onClick={confirmUpdate} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition shadow-md">
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Wrapper principal para evitar errores de hidratación con Suspense
export default function EditProductPage() {
  return (
    <main className="flex flex-col min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-10">
        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <h1 className="text-3xl font-extrabold tracking-tight">Editar Producto</h1>
        </div>
      </section>

      <Suspense fallback={
          <div className="flex-1 flex items-center justify-center">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
      }>
          <EditProductContent />
      </Suspense>

      <Footer />
    </main>
  );
}