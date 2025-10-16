import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

export default function HeroCarousel() {
 const slides = [
  {
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad",
    title: "Conecta tu negocio con miles de oportunidades",
    subtitle: "Compra, vende y crece en el marketplace para PYMEs.",
  },
  {
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216",
    title: "Impulsa tus ventas y alcanza nuevos mercados",
    subtitle: "Todo lo que necesitás para expandir tu negocio.",
  },
  {
    image: "https://images.unsplash.com/photo-1598300056393-4e8db4b6e44f",
    title: "Un ecosistema de empresas, en un solo lugar",
    subtitle: "Confianza, visibilidad y crecimiento para PYMEs.",
  },
];


  return (
    <section className="relative h-[85vh] text-white">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000 }}
        loop
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="absolute inset-0 bg-black/40"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-md">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8">
                {slide.subtitle}
              </p>
              <button className="btn-primary shadow-lg hover:scale-105 transition">
                Explorar productos
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
