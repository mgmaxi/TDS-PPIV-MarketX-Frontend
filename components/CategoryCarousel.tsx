"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";

export const categories = [
  { name: "Tecnología", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c" },
  { name: "Textil", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f" },
  { name: "Alimentos", image: "https://images.unsplash.com/photo-1551218808-94e220e084d2" },
  { name: "Herramientas", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e" },
  { name: "Hogar", image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511" },
];

export default function CategoryCarousel() {
  return (
    <div className="py-12">
      <Swiper
        modules={[FreeMode]}
        freeMode
        grabCursor
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        className="px-4 "
      >
        {categories.map((cat, index) => (
          <SwiperSlide key={index} className=" category-carousel-container">
            <div
              className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105 cursor-pointer "
              style={{ backgroundImage: `url(${cat.image})`, backgroundSize: "cover", backgroundPosition: "center", height: "200px" }}
            >
              <div className="bg-black/40 h-full flex items-center justify-center text-white font-semibold text-lg">
                {cat.name}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
