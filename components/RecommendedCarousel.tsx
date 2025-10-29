"use client";

import Slider from "react-slick";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { Product } from "@/types/products";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Datos de productos
export const products: Product[] = [
  {
    id: 101,
    name: "Notebook Apple MacBook Air M3",
    price: 1450,
    image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800",
    seller: "TechWorld",
    category: "Tecnología",
    active: true,
  },
  {
    id: 102,
    name: "Smart TV LG OLED 55” 4K UHD",
    price: 980,
    image: "https://images.pexels.com/photos/845434/pexels-photo-845434.jpeg?auto=compress&cs=tinysrgb&w=800",
    seller: "VisionTech",
    category: "Tecnología",
    active: true,
  },
  {
    id: 103,
    name: "Auriculares inalámbricos Bose QuietComfort",
    price: 380,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800",
    seller: "SoundPro",
    category: "Tecnología",
    active: true,
  },
  {
    id: 104,
    name: "Zapatillas Adidas Ultraboost 22",
    price: 175,
    image: "https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?auto=compress&cs=tinysrgb&w=800",
    seller: "UrbanStyle",
    category: "Textil",
    active: true,
  },
  {
    id: 105,
    name: "Cámara mirrorless Sony Alpha 7 IV",
    price: 2100,
    image: "https://images.pexels.com/photos/20128900/pexels-photo-20128900.jpeg?auto=compress&cs=tinysrgb&w=800",
    seller: "FotoPro",
    category: "Tecnología",
    active: true,
  },
  {
    id: 106,
    name: "Smartwatch Garmin Fenix 7",
    price: 690,
    image: "https://images.pexels.com/photos/277394/pexels-photo-277394.jpeg?auto=compress&cs=tinysrgb&w=800",
    seller: "TimeStore",
    category: "Tecnología",
    active: true,
  },
  {
    id: 107,
    name: "Sillón reclinable de cuero Premium",
    price: 890,
    image: "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=800",
    seller: "HomeDeco",
    category: "Hogar",
    active: true,
  },
  {
    id: 108,
    name: "Bicicleta de montaña Trek Marlin 7",
    price: 1250,
    image: "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=800",
    seller: "RideOn",
    category: "Deportes",
    active: true,
  },
  {
    id: 109,
    name: "Perfume Dior Sauvage 100ml",
    price: 150,
    image: "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=800",
    seller: "BeautyShop",
    category: "Belleza",
    active: true,
  },
  {
    id: 110,
    name: "Consola PlayStation 5",
    price: 780,
    image: "https://images.pexels.com/photos/7915353/pexels-photo-7915353.jpeg?auto=compress&cs=tinysrgb&w=800",
    seller: "GameZone",
    category: "Tecnología",
    active: true,
  },
];

// 🔹 Componentes de flecha personalizados
const ArrowButton = ({
  onClick,
  direction,
}: {
  onClick?: () => void;
  direction: "left" | "right";
}) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:scale-105 transition-all ${
      direction === "left" ? "left-2" : "right-2"
    }`}
    aria-label={direction === "left" ? "Anterior" : "Siguiente"}
  >
    {direction === "left" ? (
      <ChevronLeft className="w-5 h-5 text-gray-800" />
    ) : (
      <ChevronRight className="w-5 h-5 text-gray-800" />
    )}
  </button>
);

export default function RecommendedCarousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <ArrowButton direction="right" />,
    prevArrow: <ArrowButton direction="left" />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full my-10 relative"
    >
      <h2 className="text-2xl font-bold mb-6 text-foreground">
        Recomendados
      </h2>

      <div className="relative">
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id} className="px-3">
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      </div>
    </motion.section>
  );
}
