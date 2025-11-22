"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, Menu, LogOut, User, Package, LayoutDashboard, 
  FileText, ShoppingCart, CreditCard, ChevronDown, X, 
  Sparkles, Laptop, Armchair, Info, LayoutGrid, 
  Plus
} from "lucide-react";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/cartContext"; 
import Catalog from "@/app/(seller)/products/page";
import CatalogPage from "@/app/(public)/catalog/page";

const NAV_LINKS = [
  { name: "Categorías", href: "/search", icon: LayoutGrid },
  { name: "Novedades", href: "/search?sort=-createdAt&activo=true", icon: Sparkles },
  { name: "Tecnología", href: "/search?categoria=Tecnología&activo=true", icon: Laptop },
  { name: "Hogar", href: "/search?categoria=Hogar&activo=true", icon: Armchair },
  { name: "Sobre nosotros", href: "/about", icon: Info },
];

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { count } = useCart(); 
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const role = user?.rol;
  const isSeller = role === "vendedor" || role === "admin";
  const userInitial = user?.nombre ? user.nombre.charAt(0).toUpperCase() : "U";

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          
          {/* 1. Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="bg-primary/10 p-2 rounded-full">
                <ShoppingBag className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">MarketX</span>
          </Link>

          {/* 2. Buscador */}
          <div className="hidden md:block flex-1 max-w-md mx-6">
             <SearchBar />
          </div>

          {/* 3. Links Desktop */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className="hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* 4. Acciones Usuario */}
          <div className="flex items-center gap-3">
            
            {/* --- BOTÓN CARRITO (Solo si está logueado) --- */}
            {isAuthenticated && (
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative text-gray-600 hover:text-primary hover:bg-primary/5 mr-1">
                  <ShoppingCart className="h-6 w-6" />
                  
                  {/* Badge Rojo */}
                  {count > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-sm animate-in zoom-in duration-300">
                      {count}
                    </span>
                  )}
                </Button>
              </Link>
            )}
            {/* --------------------------------------------- */}

            {!isAuthenticated ? (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/signin">
                  <Button variant="ghost" className="text-gray-600 hover:text-primary hover:bg-primary/5">
                    Ingresar
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-5">
                    Registrarse
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 p-1 pl-3 pr-2 rounded-full border border-gray-200 hover:shadow-md transition-all bg-white"
                >
                  <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
                    {user?.nombre || "Usuario"}
                  </span>
                  <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm select-none">
                    {userInitial}
                  </div>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`} />
                </button>

                {menuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 z-50 py-2 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                      
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">Hola, {user?.nombre}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>

                      <div className="py-2">
                        <DropdownLink href="/profile" icon={User} onClick={() => setMenuOpen(false)}>Mi Perfil</DropdownLink>
                        <DropdownLink href="/cart" icon={ShoppingCart} onClick={() => setMenuOpen(false)}>Mi Carrito</DropdownLink>
                        <DropdownLink href="/orders" icon={Package} onClick={() => setMenuOpen(false)}>Mis Pedidos</DropdownLink>
                      </div>

                      {isSeller && (
                        <>
                          <div className="border-t border-gray-100 my-1 mx-4" />
                          <div className="px-4 py-1">
                            <p className="text-xs font-semibold text-primary/80 uppercase tracking-wider mt-2 mb-1">Panel Vendedor</p>
                          </div>
                          <DropdownLink href="/dashboard" icon={LayoutDashboard} onClick={() => setMenuOpen(false)}>Dashboard</DropdownLink>
                          <DropdownLink href="/products" icon={Package} onClick={() => setMenuOpen(false)}>Mis Productos</DropdownLink>
                          <DropdownLink href="/products/new" icon={Plus} onClick={() => setMenuOpen(false)}>Publicar Producto</DropdownLink>
                        </>
                      )}

                      <div className="border-t border-gray-100 my-1" />
                      <button
                        onClick={() => { logout(); setMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                      >
                        <LogOut className="h-4 w-4" /> Cerrar sesión
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Menú Móvil */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-4 border-b">
                <span className="text-lg font-bold flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-primary" /> MarketX
                </span>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                    <X className="h-6 w-6" />
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
                <div className="w-full">
                    <SearchBar />
                </div>

                <div className="flex flex-col gap-1">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Navegación</p>
                    {NAV_LINKS.map(link => (
                        <MobileLink key={link.name} href={link.href} icon={link.icon} onClick={() => setMobileMenuOpen(false)}>
                            {link.name}
                        </MobileLink>
                    ))}
                </div>

                {isAuthenticated ? (
                    <>
                        <div className="flex flex-col gap-1">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Mi Cuenta</p>
                            
                            {/* En móvil sí dejamos el link de carrito en la lista */}
                            <MobileLink href="/cart" icon={ShoppingCart} onClick={() => setMobileMenuOpen(false)}>
                                Mi Carrito {count > 0 && <span className="ml-auto bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs font-bold">{count}</span>}
                            </MobileLink>
                            
                            <MobileLink href="/profile" icon={User} onClick={() => setMobileMenuOpen(false)}>Perfil</MobileLink>
                            <MobileLink href="/orders" icon={Package} onClick={() => setMobileMenuOpen(false)}>Pedidos</MobileLink>
                        </div>

                        {isSeller && (
                            <div className="flex flex-col gap-1">
                                <p className="text-xs font-semibold text-primary/80 uppercase tracking-wider mb-2">Vendedor</p>
                                <MobileLink href="/catalog" icon={LayoutDashboard} onClick={() => setMobileMenuOpen(false)}>Gestionar Catálogo</MobileLink>
                                <MobileLink href="/products/new" icon={Package} onClick={() => setMobileMenuOpen(false)}>Publicar</MobileLink>
                            </div>
                        )}

                        <Button variant="destructive" className="mt-4 w-full gap-2" onClick={() => { logout(); setMobileMenuOpen(false); }}>
                            <LogOut className="h-4 w-4" /> Cerrar Sesión
                        </Button>
                    </>
                ) : (
                    <div className="flex flex-col gap-3 mt-auto">
                        <Link href="/signin" onClick={() => setMobileMenuOpen(false)}>
                            <Button variant="outline" className="w-full">Iniciar Sesión</Button>
                        </Link>
                        <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                            <Button className="w-full bg-primary text-white">Crear Cuenta</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
      )}
    </>
  );
}

function DropdownLink({ href, icon: Icon, children, onClick }: any) {
    return (
        <Link href={href} onClick={onClick} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 transition-colors">
            {Icon && <Icon className="h-4 w-4" />}
            {children}
        </Link>
    )
}

function MobileLink({ href, icon: Icon, children, onClick }: any) {
    return (
        <Link href={href} onClick={onClick} className="flex items-center gap-3 p-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors">
            {Icon && <Icon className="h-5 w-5 text-gray-500" />}
            {children}
        </Link>
    )
}