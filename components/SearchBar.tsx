"use client";
import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      console.log("Buscar:", query);
      // 🚀 Aquí podrías hacer push(`/search?query=${query}`) o usar React Query.
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative flex items-center bg-muted/30 border border-border rounded-full px-3 py-2 w-64 lg:w-80 transition-all duration-300 focus-within:shadow-md"
    >
      <Search className="h-4 w-4 text-muted-foreground mr-2" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar productos"
        className="w-full bg-transparent outline-none text-sm placeholder:text-muted-foreground"
      />
    </form>
  );
}
