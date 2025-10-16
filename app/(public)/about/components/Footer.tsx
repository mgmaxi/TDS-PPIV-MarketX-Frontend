"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-card py-12">
      <div className="container mx-auto px-4">
        {/* Secciones principales */}
        <div className="grid gap-8 md:grid-cols-4">
          {/* Marca */}
          <div className="md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">
                MarketX
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              El marketplace que conecta y potencia pequeñas y medianas empresas.
            </p>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="mb-4 font-semibold text-card-foreground">Empresa</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-primary transition-colors">
                  Carreras
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h3 className="mb-4 font-semibold text-card-foreground">Recursos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/help" className="hover:text-primary transition-colors">
                  Centro de ayuda
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-primary transition-colors">
                  Guías
                </Link>
              </li>
              <li>
                <Link href="/api" className="hover:text-primary transition-colors">
                  API
                </Link>
              </li>
              <li>
                <Link href="/status" className="hover:text-primary transition-colors">
                  Estado
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 font-semibold text-card-foreground">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Términos
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-primary transition-colors">
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="/licenses" className="hover:text-primary transition-colors">
                  Licencias
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MarketX. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
