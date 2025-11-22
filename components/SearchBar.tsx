"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // <--- Importar esto

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter(); // <--- Inicializar router

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (query.trim()) {
      // Redirigimos a la nueva página pública de resultados
      // Usamos encodeURIComponent para que si buscan "TV Samsung" la url sea válida
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative flex items-center bg-gray-100 border border-gray-200 rounded-full px-4 py-2 w-64 lg:w-80 transition-all duration-300 focus-within:shadow-md focus-within:bg-white focus-within:border-primary/50"
    >
      <Search className="h-4 w-4 text-gray-500 mr-2" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar productos..."
        className="w-full bg-transparent outline-none text-sm placeholder:text-gray-400 text-gray-700"
      />
    </form>
  );
}