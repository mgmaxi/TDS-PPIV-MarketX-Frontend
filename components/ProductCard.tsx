import Image from "next/image";
import { Product } from "@/types/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card group cursor-pointer overflow-hidden flex flex-col h-[460px] bg-white shadow-sm rounded-xl transition-all duration-300 hover:shadow-md">
      {/* Imagen */}
      <div className="relative w-full h-[220px] flex-shrink-0 bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
        />
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-grow justify-between p-4">
        <div>
          <h3
            className="font-semibold text-lg mb-2 leading-snug text-foreground min-h-[52px]"
            title={product.name}
          >
            {product.name}
          </h3>

          <p className="text-primary font-bold text-base mb-1">
            ${product.price}
          </p>

          {product.seller && (
            <p className="text-sm text-muted-foreground">
              Vendido por{" "}
              <span className="font-medium text-foreground">
                {product.seller}
              </span>
            </p>
          )}
        </div>

        {/* Botón */}
        <button
          className="btn-primary w-full mt-4 py-2 font-semibold rounded-lg transition-transform hover:scale-[1.02] active:scale-95"
          type="button"
          onClick={() =>
            console.log(`Agregado ${product.name} al carrito`)
          }
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}
