"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Menu, LogOut } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 max-w-full">
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
                {/* Botón Mi Cuenta - Solo visible en pantallas grandes */}
                <div className="relative md:block hidden">
                  <Button
                    variant="ghost"
                    className="btn-primary text-sm font-medium flex items-center gap-2"
                    onClick={toggleMenu}
                  >
                    <span>Mi cuenta</span>
                  </Button>

                  {menuOpen && (
                    <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md p-4 border min-w-[300px] w-auto">
                      {/* Menú de Cliente */}
                      <div className="flex flex-col gap-2">
                        <h2 className="text-lg font-semibold text-primary mb-2">Menú Cliente</h2>
                        <Link href="/profile" className="text-base font-medium text-foreground hover:bg-primary/10 rounded-md p-2 transition-all border-l-4 border border-primary/70 bg-gray-50">
                          Perfil
                        </Link>
                        <Link href="/cart" className="text-base font-medium text-foreground hover:bg-primary/10 rounded-md p-2 transition-all border-l-4 border border-primary/70 bg-gray-50">
                          Mi carrito
                        </Link>
                        <Link href="/orders" className="text-base font-medium text-foreground hover:bg-primary/10 rounded-md p-2 transition-all border-l-4 border border-primary/70 bg-gray-50">
                          Mis pedidos
                        </Link>
                        <Link href="/checkout" className="text-base font-medium text-foreground hover:bg-primary/10 rounded-md p-2 transition-all border-l-4 border border-primary/70 bg-gray-50">
                          Checkout
                        </Link>
                      </div>

                      {/* Menú de Vendedor */}
                      <div className="flex flex-col gap-2 mt-4">
                        <h2 className="text-lg font-semibold text-primary mb-2">Menú Vendedor</h2>
                        <Link href="/dashboard" className="text-base font-medium text-foreground hover:bg-primary/10 rounded-md p-2 transition-all border-l-4 border border-primary/70 bg-gray-50">
                          Dashboard
                        </Link>
                        <Link href="/products" className="text-base font-medium text-foreground hover:bg-primary/10 rounded-md p-2 transition-all border-l-4 border border-primary/70 bg-gray-50">
                          Productos
                        </Link>
                        <Link href="/reports" className="text-base font-medium text-foreground hover:bg-primary/10 rounded-md p-2 transition-all border-l-4 border border-primary/70 bg-gray-50">
                          Reportes
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Logout - Solo visible en pantallas grandes */}
                <Button
                  variant="ghost"
                  className="text-sm font-medium flex items-center gap-2 hidden md:flex px-4"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  Cerrar sesión
                </Button>
              </>
            )}

            {/* Menú móvil */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-background/100 shadow-lg p-4 flex flex-col gap-2 md:hidden z-40 transition-transform transform duration-300 ease-in-out rounded-b-lg max-h-screen overflow-y-auto"
          style={{ height: 'calc(100vh - 4rem)' }}>
          
          {/* Menú público */}
          <div className="flex flex-col gap-2 bg-white">
            <Link href="/catalog" className="text-base font-medium text-foreground hover:bg-primary/10 rounded-md p-2 transition-all border-l-4 border border-primary/70 bg-gray-50">
              Categorías
            </Link>
            <Link href="/sale" className="text-base font-medium text-foreground hover:bg-primary/10 rounded-md p-2 transition-all border-l-4 border border-primary/70 bg-gray-50">
              Ofertas
            </Link>
            <Link href="/technologie" className="text-base font-medium text-foreground hover:bg-primary/10 rounded-md p-2 transition-all border-l-4 border border-primary/70 bg-gray-50">
              Tecnología
            </Link>
            <Link href="/about" className="text-base font-medium text-foreground hover:bg-primary/10 rounded-md p-2 transition-all border-l-4 border border-primary/70 bg-gray-50">
              Sobre nosotros
            </Link>
          </div>
          
          {/* Menú de cliente */}
          {isAuthenticated && (
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-primary mt-4 mb-2">Menú Cliente</h2>
              <Link href="/profile" className="text-base font-medium text-foreground hover:bg-primary/10 rounded-md p-2 transition-all border-l-4 border border-primary/70 bg-gray-50">
                Perfil
              </Link>
              <Link href="/cart" className="text-base font-medium text-foreground hover:bg-primary/10 rounded-md p-2 transition-all border-l-4 border border-primary/70 bg-gray-50">
                Mi carrito
              </Link>
              <Link href="/orders" className="text-base font-medium text-foreground hover:bg-primary/10 rounded-md p-2 transition-all border-l-4 border border-primary/70 bg-gray-50">
                Mis pedidos
              </Link>
              <Link href="/checkout" className="text-base font-medium text-foreground hover:bg-primary/10 rounded-md p-2 transition-all border-l-4 border border-primary/70 bg-gray-50">
                Checkout
              </Link>
            </div>
          )}

          {/* Menú de vendedor */}
          {isAuthenticated && (
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-primary mt-4 mb-2">Menú Vendedor</h2>
              <Link href="/dashboard" className="text-base font-medium text-foreground hover:bg-primary/10 rounded-md p-2 transition-all border-l-4 border border-primary/70 bg-gray-50">
                Dashboard
              </Link>
              <Link href="/products" className="text-base font-medium text-foreground hover:bg-primary/10 rounded-md p-2 transition-all border-l-4 border border-primary/70 bg-gray-50">
                Productos
              </Link>
              <Link href="/reports" className="text-base font-medium text-foreground hover:bg-primary/10 rounded-md p-2 transition-all border-l-4 border border-primary/70 bg-gray-50">
                Reportes
              </Link>
            </div>
          )}

          {/* Logout - Solo visible en el menú móvil */}
          {isAuthenticated && (
            <Button
              variant="ghost"
              className="text-base font-medium flex items-center gap-2 border-2 mt-8 w-full rounded-md p-2 border-red-200 bg-red-50 transition-all"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              Cerrar sesión
            </Button>
          )}
        </div>
      )}
    </nav>
  );
}
