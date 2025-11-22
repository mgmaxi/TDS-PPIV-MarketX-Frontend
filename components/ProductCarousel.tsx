"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight, Loader2, ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL ;

interface CarouselProps {
  title: string;
  query?: string;
  linkHref?: string;
}

const ArrowButton = ({ onClick, direction }: { onClick?: () => void; direction: "left" | "right" }) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg border border-gray-100 rounded-full p-2 text-gray-700 transition-all hover:bg-primary hover:text-white hover:scale-110 flex items-center justify-center ${
      direction === "left" ? "-left-2 md:-left-5" : "-right-2 md:-right-5"
    }`}
    style={{ width: "40px", height: "40px" }}
    aria-label={direction === "left" ? "Anterior" : "Siguiente"}
  >
    {direction === "left" ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
  </button>
);

export default function ProductCarousel({ title, query = "", linkHref }: CarouselProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const cleanQuery = query.startsWith('?') ? query.substring(1) : query;
        const url = `${API_URL}/products?${cleanQuery}&activo=true`;

        const res = await fetch(url);
        const data = await res.json();
        setProducts(data.productos || (Array.isArray(data) ? data : []));
      } catch (error) {
        console.error("Error loading carousel:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  // Configuración de React Slick
  const settings = {
    dots: false,
    infinite: products.length > 4, // Solo infinito si hay suficientes productos
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <ArrowButton direction="right" />,
    prevArrow: <ArrowButton direction="left" />,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, centerMode: false }, 
      },
    ],
  };

  if (loading) {
    return (
      <div className="py-12 flex justify-center w-full">
        <Loader2 className="animate-spin text-primary h-8 w-8" />
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="w-full py-8">
      <div className="flex justify-between items-end mb-6 px-2">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
        {linkHref && (
          <Link 
            href={linkHref} 
            className="text-primary font-medium flex items-center hover:underline text-sm group"
          >
            Ver todos <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>

      <div className="relative px-2 md:px-4">
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product._id || product.id} className="px-3 py-2 h-full">
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}