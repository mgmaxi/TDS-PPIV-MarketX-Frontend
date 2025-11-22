import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
// 1. Importa los proveedores
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/cartContext"; 
// Estilos globales
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MarketX",
  description: "Marketplace B2B/B2C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* 2. AuthProvider envuelve todo */}
        <AuthProvider>
          {/* 3. CartProvider envuelve a children y está DENTRO de Auth */}
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}