"use client";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  seller?: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition p-4 bg-white">
      <Image
        src={product.image}
        alt={product.name}
        width={400}
        height={300}
        className="w-full h-48 object-cover rounded-md mb-3"
      />
      <div>
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-gray-600 mb-2">${product.price}</p>
        {product.seller && (
          <p className="text-sm text-gray-500">
            Sold by <span className="font-medium">{product.seller}</span>
          </p>
        )}
        <button className="mt-3 w-full bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700 transition">
          Add to Cart
        </button>
      </div>
    </article>
  );
}
