export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-20 text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Bienvenido a <span className="text-yellow-300">MarketX</span>
        </h1>
        <p className="text-lg sm:text-xl opacity-90 mb-8">
          Las mejores ofertas de vendedores verificados: compre de forma rápida y segura.
        </p>
        <a
          href="#featured"
          className="bg-orange-400 text-indigo-900 font-semibold px-6 py-3 rounded-lg hover:bg-yellow-300 transition"
        >
          Browse Products
        </a>
      </div>
    </section>
  );
}
