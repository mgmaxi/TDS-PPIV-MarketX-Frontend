"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Menu } from "lucide-react";
import SearchBar from "@/components/SearchBar";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 bg-primary/10 text-primary" />
            <span className="text-xl font-bold text-foreground">MarketX</span>
          </div>

          {/* Enlaces principales + Buscador */}
          <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
            <Link href="/catalog" className="text-sm font-medium text-foreground hover:text-primary transition">
              Categorías
            </Link>
            <Link href="/sale" className="text-sm font-medium text-foreground hover:text-primary transition">
              Ofertas
            </Link>
            <Link href="/technologie" className="text-sm font-medium text-foreground hover:text-primary transition">
              Tecnología
            </Link>
            <Link href="/about" className="text-sm font-medium text-foreground hover:text-primary transition">
              Sobre nosotros
            </Link>

            {/* Buscador */}
            <div className="ml-6">
              <SearchBar />
            </div>
          </div>

          {/* Botones */}
          <div className="flex items-center gap-4">
            <Link href="/signin">
              <Button variant="ghost" className="text-sm font-medium hover:text-primary">
                Iniciar sesión
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="btn-primary text-sm px-4 py-2 rounded-full">
                Registrarse
              </Button>
            </Link>

            {/* Menú móvil */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
