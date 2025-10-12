import ProductCard from "@/components/cards/ProductCard";
import { mockProducts } from "@/lib/mocks/products";

export default function FeaturedProducts() {
  return (
    <section id="featured" className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-800 text-center">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
