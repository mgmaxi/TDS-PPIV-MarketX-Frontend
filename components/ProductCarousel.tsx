"use client";

import Slider from "react-slick";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Íconos de flechas

const mockProducts = [
  {
    id: 1,
    name: "Auriculares Bluetooth Sony WH-1000XM5",
    price: 420,
    image: "https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=600",
    seller: "SoundPro",
  },
  {
    id: 2,
    name: "Smartphone Samsung Galaxy S24",
    price: 1100,
    image: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600",
    seller: "MobileCenter",
  },
  {
    id: 3,
    name: "Zapatillas Nike Air Zoom Pegasus",
    price: 160,
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600",
    seller: "UrbanStyle",
  },
  {
    id: 4,
    name: "Reloj inteligente Apple Watch Series 9",
    price: 530,
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600",
    seller: "TimeStore",
  },
  {
    id: 5,
    name: "Cámara réflex Canon EOS 90D",
    price: 950,
    image: "https://images.pexels.com/photos/212372/pexels-photo-212372.jpeg?auto=compress&cs=tinysrgb&w=600",
    seller: "FotoPro",
  },
  {
    id: 6,
    name: "Cafetera Nespresso Inissia",
    price: 120,
    image: "https://images.pexels.com/photos/585754/pexels-photo-585754.jpeg?auto=compress&cs=tinysrgb&w=600",
    seller: "HomeCafe",
  },
  {
    id: 7,
    name: "Mochila North Face Borealis",
    price: 95,
    image: "https://images.pexels.com/photos/442956/pexels-photo-442956.jpeg?auto=compress&cs=tinysrgb&w=600",
    seller: "AdventureGear",
  },
  {
    id: 8,
    name: "Lámpara de escritorio LED minimalista",
    price: 45,
    image: "https://images.pexels.com/photos/8092352/pexels-photo-8092352.jpeg?auto=compress&cs=tinysrgb&w=600",
    seller: "DecoLight",
  },
  {
    id: 9,
    name: "Teclado mecánico Logitech MX",
    price: 150,
    image: "https://images.pexels.com/photos/3829227/pexels-photo-3829227.jpeg?auto=compress&cs=tinysrgb&w=600",
    seller: "TechZone",
  },
  {
    id: 10,
    name: "Botella térmica de acero inoxidable",
    price: 25,
    image: "https://images.pexels.com/photos/3737696/pexels-photo-3737696.jpeg?auto=compress&cs=tinysrgb&w=600",
    seller: "EcoLife",
  },
];

// 🔹 Flechas personalizadas
const ArrowButton = ({
  onClick,
  direction,
}: {
  onClick?: () => void;
  direction: "left" | "right";
}) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm shadow-md rounded-full p-2 transition-all hover:bg-gray-100 hover:scale-105 ${
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

export default function ProductCarousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <ArrowButton direction="right" />,
    prevArrow: <ArrowButton direction="left" />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="relative my-10">
      <Slider {...settings}>
        {mockProducts.map((product) => (
          <div key={product.id} className="px-3">
            <ProductCard product={product} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
