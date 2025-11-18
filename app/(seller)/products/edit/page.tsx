"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Plus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function EditProduct() {
  const router = useRouter();
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [form, setForm] = useState({
    id: 1, // Asumiendo que el producto tiene un ID
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    image: null as File | null,
    active: true,
  });
  const [showModal, setShowModal] = useState(false);

  const categories = ["Tecnología", "Hogar", "Ropa", "Deportes", "Juguetes"];

  // Manejar de cambio de imagen
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "price" || name === "stock" ? Number(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };


  const confirmUpdate = async () => {
    try {
       toast({
        title: "Producto actualizado con éxito",
        variant: "success",
      });

      setShowModal(false);
      router.push("/products");
    } catch (error) {
      toast({
        title: "Error al actualizar el producto",
        variant: "warning",
      });
    }
  };

  // Cancelar el proceso de edición
  const handleCancel = () => {
    router.back();
  };

  return (
    <main className="flex flex-col min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-12 md:py-16">
        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <h1 className="mb-3 text-3xl md:text-4xl font-extrabold tracking-tight">
            Editar Producto
          </h1>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-white/90">
            Modifica los detalles del producto para actualizarlo en tu inventario.
          </p>
        </div>
      </section>

      {/* Formulario */}
      <section className="container mx-auto px-6 py-12 flex-1 mt-8 mb-12">
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl max-w-3xl mx-auto p-6 lg:p-8 border-t-4 border-primary shadow-md shadow-xl shadow-black/10 relative overflow-hidden"
          >

            {/* Imagen */}
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-shrink-0 w-full lg:w-1/3">
                <label className="block w-full aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-pointer border-2 border-dashed border-gray-400 transition-smooth">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                      <Plus className="h-10 w-10 mb-2 text-gray-400" />
                      <span className="text-gray-500 font-medium">Subir imagen</span>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              </div>

              {/* Campos */}
              <div className="flex-1 flex flex-col gap-9">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Nombre del producto"
                  className="w-full px-4 py-3 border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-400 transition-smooth"
                />

                <div className="flex gap-4 flex-col sm:flex-row">
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Precio"
                    className="flex-1 px-4 py-3 border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-400 transition-smooth"
                  />
                  <input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    placeholder="Stock"
                    className="flex-1 px-4 py-3 border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-400 transition-smooth"
                  />
                </div>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-400 transition-smooth"
                >
                  <option value="">Selecciona categoría</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                {/* Toggle activo/inactivo */}
                <div className="flex items-center gap-3 mt-2">
                  <input
                    type="checkbox"
                    id="active"
                    checked={form.active}
                    onChange={(e) => setForm({ ...form, active: e.target.checked })}
                    className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded transition-smooth"
                  />
                  <label htmlFor="active" className="text-gray-700 font-medium">
                    {form.active ? "Activo" : "Inactivo"}
                  </label>
                </div>
              </div>
            </div>

            {/* Separador */}
            <div className="linea-div my-4"></div>

            {/* Descripción */}
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Descripción del producto"
              className="w-full px-4 py-3 border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-primary resize-none h-40 placeholder-gray-400 transition-smooth"
            />

            {/* Botones */}
            <div className="flex gap-4 mt-6 justify-end">
              <button type="submit" className="btn-primary">
                Guardar cambios
              </button>
              <button type="button" onClick={handleCancel} className="btn-outline">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full border-t-4 border-primary">
            <h2 className="text-xl font-semibold mb-4">¿Estás seguro?</h2>
            <p className="mb-4">Estás a punto de actualizar los datos del producto. ¿Deseas continuar?</p>
            <div className="flex justify-end gap-4">
              <button onClick={confirmUpdate} className="btn-primary">
                Confirmar
              </button>
              <button onClick={closeModal} className="btn-outline">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
