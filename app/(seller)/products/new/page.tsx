"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Plus, Loader2, Link as LinkIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function NewProduct() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/signin");
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ 
        ...form, 
        [name]: (name === "precio" || name === "stock") && value !== "" ? Number(value) : value 
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const token = localStorage.getItem("token");
    if (!token) {
        router.push("/signin");
        return;
    }

    setIsSubmitting(true);

    try {
      
        const res = await fetch(`${API_URL}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(form), 
        });

        if (res.status === 401) {
            throw new Error("Sesión expirada.");
        }

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.mensaje || "Error al crear producto");
        }

        toast({
            title: "¡Producto Publicado!",
            description: "Se ha creado con la URL de imagen proporcionada.",
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
        setIsSubmitting(false);
    }
  };

  const handleCancel = () => router.back();

  return (
    <main className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <section className="bg-primary py-12 text-white shadow-md">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold mb-2">Publicar Nuevo Producto</h1>
        </div>
      </section>

      <section className="container mx-auto px-6 py-10 flex-1">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 md:p-8 relative">
             {isSubmitting && (
                <div className="absolute inset-0 bg-white/80 z-20 flex items-center justify-center rounded-xl">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-8">
              
              {/* Input de URL de Imagen */}
              <div className="w-full md:w-1/3 flex flex-col gap-4">
                <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-300 relative flex items-center justify-center">
                  {form.imagen ? (
                    <img src={form.imagen} alt="Preview" className="w-full h-full object-cover" 
                         onError={(e) => e.currentTarget.src = "https://placehold.co/400?text=Error+URL"} />
                  ) : (
                    <div className="flex flex-col items-center text-gray-400 px-4 text-center">
                      <LinkIcon className="h-12 w-12 mb-2" />
                      <span className="text-sm">Pega una URL de imagen válida para ver la vista previa</span>
                    </div>
                  )}
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL de la Imagen</label>
                    <input 
                        type="text" 
                        name="imagen"
                        value={form.imagen}
                        onChange={handleChange}
                        placeholder="https://ejemplo.com/foto.jpg"
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-primary outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">Copia y pega un link de imagen.</p>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-5">
         
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input type="text" name="nombre" value={form.nombre} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-primary outline-none" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Precio ($)</label>
                        <input type="number" name="precio" value={form.precio} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-primary outline-none" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                        <input type="number" name="stock" value={form.stock} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-primary outline-none" required />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                    <select name="categoria" value={form.categoria} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-primary outline-none bg-white" required>
                        <option value="">Seleccionar...</option>
                        {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>

                <div className="flex items-center gap-3 py-2">
                  <input type="checkbox" id="activo" checked={form.activo} onChange={(e) => setForm({ ...form, activo: e.target.checked })} className="w-5 h-5 text-primary rounded" />
                  <label htmlFor="activo" className="text-sm font-medium text-gray-700">Producto Activo</label>
                </div>
              </div>
            </div>

            <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea name="descripcion" value={form.descripcion} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-primary outline-none h-32 resize-none" />
            </div>

            <div className="flex gap-4 mt-8 justify-end pt-6 border-t border-gray-100">
              <button type="button" onClick={handleCancel} className="px-6 py-2 border rounded-lg hover:bg-gray-50">Cancelar</button>
              <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center gap-2">
                <Plus className="h-5 w-5" /> Publicar
              </button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}