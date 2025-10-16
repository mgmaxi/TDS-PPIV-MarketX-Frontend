import Image from "next/image";

interface SectionBannerProps {
  image: string;
  title: string;
  subtitle?: string;
  height?: string; // permite ajustar alto
}

export default function SectionBanner({
  image,
  title,
  subtitle,
  height = "h-44",
}: SectionBannerProps) {
  return (
<div className={`relative max-w-6xl mx-auto w-full ${height} my-12 rounded-md overflow-hidden shadow-lg`}>

      <Image
        src={image}
        alt={title}
        fill
  className="object-cover object-center md:object-[50%_40%]  transition-transform duration-700 hover:scale-105"
        priority
      />

     
      <div className="absolute inset-0 bg-black/50  flex flex-col items-center justify-center text-center text-white px-4">
        <h3 className="text-2xl md:text-4xl font-bold mb-2 drop-shadow-lg">{title}</h3>
        {subtitle && (
          <p className="text-white/80 text-sm md:text-lg max-w-2xl">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
