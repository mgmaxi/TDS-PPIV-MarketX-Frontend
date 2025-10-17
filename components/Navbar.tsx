"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Menu, LogOut } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsAuthenticated(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    router.push("/");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
            {!isAuthenticated ? (
              <>
                <Link href="/signin">
                  <Button variant="ghost" className="text-sm font-medium hover:bg-[#4499FF] transition">
                    Iniciar sesión
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="btn-primary text-sm px-4 py-2 rounded-full">
                    Registrarse
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <div className="relative">
                  <Button
                    variant="ghost"
                    className="btn-primary text-sm font-medium flex items-center gap-2"
                    onClick={toggleMenu}
                  >
                    <span className="hidden md:block">Mi cuenta</span>
                  </Button>

                  {menuOpen && (
                    <div className="absolute right-0 w-40 mt-2 bg-white shadow-lg rounded-md p-2">
                      <Link href="/profile" className="block py-1 text-sm text-foreground hover:bg-gray-100">Perfil</Link>
                      <Link href="/Cart" className="block py-1 text-sm text-foreground hover:bg-gray-100">Mi carrito</Link>
                      <Link href="/Orders" className="block py-1 text-sm text-foreground hover:bg-gray-100">Mis pedidos</Link>
                      <Link href="/Checkout" className="block py-1 text-sm text-foreground hover:bg-gray-100">Checkout</Link>
                    </div>
                  )}
                </div>
                
                <Button
                  variant="ghost"
                  className="text-sm font-medium flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  Cerrar sesión
                </Button>
              </>
            )}

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
